//////////////////////////////////
// Jatana API                   //
//////////////////////////////////

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


//////////////////////////////////
// template functions           //
//////////////////////////////////



function applyMacro (id) {
   console.log(id);
   var client = ZAFClient.init();
   client.set('ticket.comment.text', [""]).then(clean_comment=>{
     client.invoke('macro', id).then(applied=>{
       console.log(applied);
      client.get('currentUser').then(currentUser => {
        client.get('ticket').then(function(tkt) {
          console.log(tkt)
          client.get('currentAccount').then(account =>{
            var macro_analytics_url = "https://zendesk.jatana.ai/macro_applied"
            var user_data = {'email':currentUser.currentUser.email,'name': currentUser.currentUser.name,'role': currentUser.currentUser.role,'timezone':currentUser.currentUser.timeZone.formattedOffset,'macro_id':id,'ticket_id':tkt.ticket.id,"identifier":account.currentAccount.subdomain.trim()}
            var macro_analytics_settings = getJatanaSettings(macro_analytics_url,user_data,'POST')
            client.request(macro_analytics_settings).then(analytics_response =>{
            }).then(
                client.get('ticket.tags').then(tags=>{
                tags['ticket.tags'].push("_jatana_suggested");
                client.set('ticket.tags',tags['ticket.tags'])
              })//,["_jatana_suggested"])
            )
          });
        });
      });
    },
    function(response) {
      console.error(response);
    }
  );
   });

}

function getMacroComment(client,macro){
  var id = macro.id
  return client.request('/api/v2/macros/'+id+'.json').then(response =>{
    var actions = response.macro.actions
    var cmnt = ""
    for(var i=0;i<actions.length;i++){
      if(actions[i].field==='comment_value'){
        if (actions[i].value.constructor === Array){
          for(var i=0;i<actions[i].value.length;i++){
            if(actions[i].value[i].indexOf("channel:all")== -1){
              cmnt = cmnt.concat("\n"+actions[i].value[i])
            }
            else{
              continue;
            }
          }
          cmnt = cmnt.replace("↵","\n")
        }
        else{
          cmnt = actions[i].value;
        }
      }
    }
    macro.comment = cmnt
    return macro
  });
}


//////////////////////////////////
// Init App                     //
//////////////////////////////////

$(function() {
  var client = ZAFClient.init();
  // registeredEvent(client);
  client.invoke('resize', { width: '100%', height: '450px' });
  ticketWorkflow(client);
    Handlebars.registerHelper("inc", function(value, options)
    {
      console.log(value);
        return parseInt(value)*2 +1 ;
    });
    Handlebars.registerHelper('eq', function () {
      const args = Array.prototype.slice.call(arguments, 0, -1);
      return args.every(function (expression) {
          return args[0] === expression;
      });
    });
});


function ticketWorkflow(client){
    client.get('currentUser').then(currentUser => {
      client.get('currentAccount').then(account =>{
        client.metadata().then(metadata => {
            getKey(client,KEY_STATE).then(state =>{
              getKey(client,KEY_TOKEN).then(token =>{
                console.log(state);
                if (state==="installed"){
                  connectJatana('#installed',{'subdomain':account.currentAccount.subdomain.trim(),'email':currentUser.currentUser.email,'name': currentUser.currentUser.name,'role': currentUser.currentUser.role,'timezone':currentUser.currentUser.timeZone.formattedOffset});
                }
                else if (state==="accessgranted") {
                    connectJatana('#accessgranted',{'subdomain':account.currentAccount.subdomain.trim(),'email':currentUser.currentUser.email,'name': currentUser.currentUser.name,'role': currentUser.currentUser.role,'timezone':currentUser.currentUser.timeZone.formattedOffset});
                }
                else if (state==="InProgress") {
                    connectJatana('#in-progress',{'subdomain':account.currentAccount.subdomain.trim(),'email':currentUser.currentUser.email,'name': currentUser.currentUser.name,'role': currentUser.currentUser.role,'timezone':currentUser.currentUser.timeZone.formattedOffset});
                }
                else if (state==="paidsuccess") {
                    connectJatana('#paidsuccess',{'subdomain':account.currentAccount.subdomain.trim(),'email':currentUser.currentUser.email,'name': currentUser.currentUser.name,'role': currentUser.currentUser.role,'timezone':currentUser.currentUser.timeZone.formattedOffset});
                }
                else if (state==="upgraded") {
                    connectJatana('#upgraded',{'subdomain':account.currentAccount.subdomain.trim(),'email':currentUser.currentUser.email,'name': currentUser.currentUser.name,'role': currentUser.currentUser.role,'timezone':currentUser.currentUser.timeZone.formattedOffset});
                } //consumed
                else if (state==="consumed") {
                    connectJatana('#consumed',{'subdomain':account.currentAccount.subdomain.trim(),'email':currentUser.currentUser.email,'name': currentUser.currentUser.name,'role': currentUser.currentUser.role,'timezone':currentUser.currentUser.timeZone.formattedOffset});
                }
                else if (state==="paymentissue") {
                    connectJatana('#consumed',{'subdomain':account.currentAccount.subdomain.trim(),'email':currentUser.currentUser.email,'name': currentUser.currentUser.name,'role': currentUser.currentUser.role,'timezone':currentUser.currentUser.timeZone.formattedOffset});
                }
                else if (state === "Live"){

                  client.get('ticket').then(function(data) {
                    var description = data.ticket.description;
                    url = 'https://zendesk.jatana.ai/api/nlp_suggestion/'
                    data = {'query':data.ticket.description,"identifier":account.currentAccount.subdomain.trim(),'email':currentUser.currentUser.email,'token':token,'id':data.ticket.id}
                    var nlp_settings = getJatanaSettings(url,data,"POST");
                    client.request(nlp_settings)
                    .then(response => {
                      if (response.hasOwnProperty('tkn')){
                        setKey(client,KEY_TOKEN,response.tkn);
                      }
                      if (response.hasOwnProperty('Message')){
                        connectJatana('#error-nlp',data=response)
                      }
                      else if(response.permissionzero == true){
                        connectJatana('#permissionemptyresponse')
                      }
                      else if(response.macros.length == 0){
                        connectJatana('#emptyresponse')
                      }
                      else{
                        populateApp(client, response.macros,account.currentAccount.subdomain.trim(),response.search);
                      }
                    }).catch(
                      function onError(error){
                        console.log(error);
                        connectJatana('#errorloading');
                      })
                  });

                }
              });

            }).catch(
              function onError(error){
                console.log(error);
                connectJatana('#errorloading');
              })
        })

      })
    })
}

function populateApp(client,suggested_macros,identifier,search){
  real_macro_mapping =[]
  has_comment = false;
  for(var i=0; i<suggested_macros.length;i++){
    if (!has_comment && ("comment" in suggested_macros[i])){
      has_comment = true;
    }
    id_mapping = {360007400834: 360007790033, 360007400874: 360007791713, 360007400914: 360007791733,360007222133: 360008003554, 360007222333: 360008004314}
    real_macro_mapping.push({'confidence':suggested_macros[i]['confidence']*100,'title':suggested_macros[i]['macro_title'],'id':suggested_macros[i]['macro_id'],"comment": suggested_macros[i]['comment'],
    "threshold":suggested_macros[i]['threshold'],"state":suggested_macros[i]['state'],"identifier":identifier,"access":suggested_macros[i]["access"]});
  }
   createAndShowHTML(real_macro_mapping,search,identifier,"");

  }


function filterMacros(client,macros,suggested_macros){
  macro_data_list = []
  suggested_mapping = {}
  cleaned_data = []
  //suggested_mapping = {114111411094:"89",114111411194:"80",114111411174:"40", 114111411154:"0"};
  for (var i=0;i<suggested_macros.length;i++){
    suggested_mapping[parseInt(suggested_macros[i]['macro_id'])] = suggested_macros[i]['confidence'];
  }

  for(var i=0;i<macros.length;i++){
    if (macros[i].id in suggested_mapping){
      // if (parseInt(suggested_mapping[macros[i].id])>=90){
      //   applyMacro(macros[i].id);
      //   break;
      // }

      macro_data_list.push(macros[i]);
    }
    else {
      continue
      // ignoring all macros which are not suggested
    }
  }
  showMacrosBasicData(macro_data_list,suggested_mapping);
}


function showMacrosBasicData(data_list,suggested_mapping){
  var resp = []
  for(var i=0;i<data_list.length;i++){
    di = {"id":data_list[i].id,"title":data_list[i].title,"confidence":suggested_mapping[data_list[i].id]}
    resp.push(di)
  }
  createAndShowHTML(resp)
}

function createAndShowHTML(data,search,identifier,search_text) {
  var f_data = {}
  f_data.macros = data;
  f_data.identifier = identifier;
  f_data.search = search
  if(search_text){
    f_data.search_text = search_text;
  }
  else{
    f_data.search_text = "";
  }



  console.log(f_data);
  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(f_data);
  $("#content").html(html);
}

function connectJatana(tag,data=null){
  var source = $(tag).html();
  var template = Handlebars.compile(source);
  var html = template(data);
  $('#content').html(html);
}


function showError(response) {
  var error_data = {
    'status': response.status,
    'statusText': response.statusText
  };
  var source = $("#errortemplate").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#content").html(html);
}



//////////////////////////////////
// Learn Data                   //
//////////////////////////////////

// function sendDatatoBS(data,type){
//   $.post('http://35.188.122.75:8040/consumer',
//     {
//         type:data
//     },
//     function(response, status){
//         console.log(response);
//     });
// }
//
// function learnData(){
//   var client = ZAFClient.init();
//   client.request('/api/v2/macros.json')
//   .then((data)=>{
//     sendDatatoBS(data,"macros");
//   });
  // var page = 1
  // while(true){
  //   page = page+1;
  //   client.request('/api/v2/tickets.json?page='+String(page))
  //   .then(data => {
  //     if(data.tickets.length===0){
  //       break;
  //     }
  //     else{
  //       sendDatatoBS(data,"tickets");
  //     }
  //   })
  // }
//}
