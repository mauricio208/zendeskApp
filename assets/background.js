KEY_MODAL_SHOWN = 'modal_shown';
KEY_STATE = 'jatana_state';
KEY_TOKEN= 'jatana_token';


function getJatanaSettings(url,data_obj,method){
  var settings = {
    url: url,
    //headers: {"Authorization": "Bearer "+token},
    cors: true,
    type: method
  };
  if (data_obj != null){
    settings.data = data_obj
  }
  return settings;
}



function setKey(client,key,val){
  return client.metadata().then(function(metadata) {
    return localStorage.setItem(metadata.installationId + ":" + key, val)
  });
}

function getKey(client,key){
  return client.metadata().then(function(metadata) {
    return localStorage.getItem(metadata.installationId + ":" + key)
  });
}


function getModalClient(client, location) {
  return client.get("instances").then(function(data) {
      var instances = data["instances"]
      for(var key in instances) {
          var instance = instances[key]
          if(instance["location"] == location) {
              return client.instance(instance.instanceGuid)
          }
      }
      return null
  })
}

function showAuthModal(client,identifier) {
  getKey(client,KEY_STATE).then(state=>{
    getKey(client,KEY_MODAL_SHOWN).then(modal_shown=>{
      getModalClient(client,'modal').then(modalInstance =>{
        if (!modalInstance && !modal_shown && !['InProgress','Live'].includes(state)){
          setKey(client,KEY_MODAL_SHOWN,true);
          client.invoke("instances.create", {
              location: "modal",
              url: "assets/modal.html#identifier="+identifier
          }).then(modalContext => {
            var modalClient = client.instance(modalContext['instances.create'][0].instanceGuid);
             return modalClient.invoke('resize', { width: '500px', height: '250px' });
          });
          // return client.invoke('resize', { width: "500px", height: "250px" });
        }
      })
    })
  })
}



function registeredEvent(client){
  client.on('app.registered', function(context){
    client.get('currentAccount').then(account => {

      // domain_url = account.currentAccount.subdomain
      //integration_id = metadata.installationId.toString()
      client.get('currentUser').then(currentUser => {
        var userData = currentUser.currentUser
        email = userData.email
        fullName = userData.name
        //subdomain = /(https:\/\/)(.)+\.(zendesk)\.(com)/.exec(domain_url)[0].split("//")[1].split(".")[0]
        identifier = account.currentAccount.subdomain
        role = userData.role
        getKey(client,KEY_TOKEN).then(token=>{
          url = 'https://zendesk.jatana.ai/state?identifier='+encodeURI(identifier)+'&email='+encodeURI(email)+'&name='+encodeURI(fullName)+'&role='+encodeURI(role)
          if (token){
            data = {tkn:token};
          }else{
            data = null
          }

          var state_settings = getJatanaSettings(url,data,"GET");
          client.request(state_settings).then(resp =>{
            setKey(client,KEY_STATE,resp.state);
            if (resp.tkn){
              setKey(client,KEY_TOKEN,resp.tkn);
            }
            showAuthModal(client,identifier)
          });
        })

      });
    });
  });
}

$(function() {
  var client = ZAFClient.init();
  registeredEvent(client);
});
