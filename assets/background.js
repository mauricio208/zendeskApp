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
        url = 'https://zendesk.jatana.ai/state?identifier='+encodeURI(identifier)+'&email='+encodeURI(email)+'&name='+encodeURI(fullName)+'&role='+encodeURI(role)
        var state_settings = getJatanaSettings(url,null,"GET");
        client.request(state_settings).then(resp =>{
          setKey(client,KEY_STATE,resp.state);
          showAuthModal(client,identifier)
        });
      });
    });
  });
}

$(function() {
  var client = ZAFClient.init();
  registeredEvent(client);
});
