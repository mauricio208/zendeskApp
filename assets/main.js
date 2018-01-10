//////////////////////////////////
// Jatana API                   //
//////////////////////////////////


function getJatanaSettings(url,data_obj,method){
  var settings = {
    url: url,
    headers: {"Authorization": "Bearer {{setting.token}}"},
    secure: false,
    type: method
  };
  if (data_obj != null){
    settings.data = data_obj
  }
  console.log(setting.token);
  return settings;
}

//////////////////////////////////
// template functions           //
//////////////////////////////////



function applyMacro (id) {
  console.log(id);
  var client = ZAFClient.init();
  client.request('/api/v2/macros/'+id+'.json').then(
  function(macro) {
    console.log(macro);
    var actions = macro.macro.actions
    console.log(actions);
    for(var i=0;i<actions.length;i++){
      checkAndApply(client,actions[i])
    }
  },
  function(response) {
    console.error(response.responseText);
  }
);
}

function checkAndApply(client,action){
  if(action.field==="status"){
    client.set('ticket.status',action.value)
  }
  else if (action.field==="priority") {
    client.set('ticket.priority', action.value)
  }
  else if (action.field==="sharedWith") {
    client.set('ticket.sharedWith', action.value)
  }
  else if (action.field==="set_tags") {
    console.log(action.field);
    console.log(action.value);

    client.set('ticket.tags', action.value.split(" "));
  }
  else if (action.field==="type") {
    client.set('ticket.type', action.value)
  }
  else if (action.field==='brand') {
    client.set('ticket.brand', action.value)
  }
  else if (action.field==='comment_value') {
    console.log(action.value);
    cmnt = ""
    if (action.value.constructor === Array){
      for(var i=0;i<action.value.length;i++){
        if(action.value[i].indexOf("channel:all")== -1){
          cmnt = cmnt.concat("\n"+action.value[i])
        }
        else{
          continue;
        }
      }
      console.log(cmnt);
      cmnt = cmnt.replace("↵","\n")
      console.log(cmnt);
    }
    else{
      cmnt = action.value;
    }
    client.set('comment.text', cmnt)
  }
  else if (action.field==='comment_value_html') {
    client.invoke('comment.appendHtml',action.value)
  }
  else if (action.field==='comment_mode_is_public'&& action.value==true) {
    client.set('comment.type', 'publicReply')
  }
  else if (action.field==="assignee_id"&& action.value !='current_user') {
    client.set('ticket.assignee', { userId: action.value })
  }
  else if (action.field==="group_id"&& action.value !='current_groups') {
    client.set('ticket.assignee', { groupId: action.value })
  }
  else if (action.value === 'subject') {
    client.set('ticket.subject',action.value)
  }
}


//////////////////////////////////
// Init App                     //
//////////////////////////////////

$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '400px' });
  checkaccountstate(client).then(state=>{console.log(state);})

  console.log(state);
  if (state==="New"){
    console.log("here");
    connectJatana('#first-time');
  }
  else if (state==="In Progress") {
    connectJatana('#in-progress');
  }
  else if (state === "Live"){
    client.get('ticket').then(function(data) {
  		var description = data.ticket.description;
      console.log(data.ticket.description);
          fetch('https://nlp.motherbot.co/dev/api/v1.0/jatana?query='+encodeURI(data.ticket.description))
          .then(response => {
            response.json()
            .then(json => {
              console.log(json.macros);
              populateApp(client, json.macros);
            });
          });
    });
  }
});

function checkaccountstate(client){
  client.get('currentAccount')
  .then(account =>{
    console.log(account.currentAccount.subdomain);
    client.metadata().then(data=>{console.log(data);})
    //fetch('http://localhost:8080/state?subdomain='+encodeURI(account.currentAccount.subdomain))
    url = 'https://jatana.motherbot.co/state?subdomain='+encodeURI(account.currentAccount.subdomain)
    var state_settings = getJatanaSettings(url,null,"GET");
    client.request(state_settings)
    .then(resp =>{
        console.log(resp);
        if (resp.state==="New"){
          console.log("here");
          connectJatana('#first-time');
        }
        else if (resp.state==="In Progress") {
          connectJatana('#in-progress');
        }
        else if (resp.state === "Live"){
          client.get('ticket').then(function(data) {
            var description = data.ticket.description;
            console.log(data.ticket.description);
                //fetch('https://nlp.motherbot.co/dev/api/v1.0/jatana?version=2&query='+encodeURI(data.ticket.description))
                url = 'https://nlp.motherbot.co/dev/api/v1.0/jatana?version=2&query='+encodeURI(data.ticket.description)
                var nlp_settings = getJatanaSettings(url,null,"GET");
                client.request(nlp_settings)
                .then(response => {
                  console.log(response);
                    populateApp(client, response);

                });
          });
        }
    })
  })
}

function populateApp(client,suggested_macros){
  // getting all macros and then will parse data only for suggested_macros. Reducing api calls.
  // var settings = {
  //   url: '/api/v2/macros.json',
  //   type:'GET',
  //   dataType: 'json',
  // };
  // client.request(settings).then(
  //   function(data){
  //     console.log(data);
  //     console.log(suggested_macros);
  //     filterMacros(client,data.macros,suggested_macros)
  //   },
  //   function(response) {
  //     showError(response);
  //   }
  // )
  real_macro_mapping =[]
  for(var i=0; i<suggested_macros.length;i++){
    title = suggested_macros[i]['macro_title'].split("::")
    title = title[title.length-1]
    real_macro_mapping.push({'confidence':suggested_macros[i]['confidence']*100,'title':title,'id':suggested_macros[i]['macro_id']});
    console.log(real_macro_mapping);
  }
  console.log(real_macro_mapping);
  createAndShowHTML(real_macro_mapping);
}


function filterMacros(client,macros,suggested_macros){
  macro_data_list = []
  suggested_mapping = {}
  cleaned_data = []
  console.log(suggested_macros);
  console.log(macros);
  //suggested_mapping = {114111411094:"89",114111411194:"80",114111411174:"40", 114111411154:"0"};
  for (var i=0;i<suggested_macros.length;i++){
    suggested_mapping[parseInt(suggested_macros[i]['macro_id'])] = suggested_macros[i]['confidence'];
    console.log(suggested_mapping);
  }

  for(var i=0;i<macros.length;i++){
    console.log(macros[i].id);
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
  console.log(data_list);
  for(var i=0;i<data_list.length;i++){
    di = {"id":data_list[i].id,"title":data_list[i].title,"confidence":suggested_mapping[data_list[i].id]}
    resp.push(di)
  }
  createAndShowHTML(resp)
}

function createAndShowHTML(data) {
  console.log(data);
  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(data);
  $("#content").html(html);
}

function connectJatana(tag){
  console.log(tag);
  var source = $(tag).html();
  var template = Handlebars.compile(source);
  var html = template();
  $('#content').html(html);
}


function showError(response) {
  var error_data = {
    'status': response.status,
    'statusText': response.statusText
  };
  var source = $("#error-template").html();
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
