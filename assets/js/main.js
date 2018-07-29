function createAndShowHTML(data) {
  console.log(data);
  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(data);
  $("#content").html(html);
}


function populateApp(suggested_macros,identifier){
  real_macro_mapping =[]
  for(var i=0; i<suggested_macros.length;i++){
    title = suggested_macros[i]['macro_title'].split("::")
    title = title[title.length-1]
    comment = "Hi Giovanni, \nwe are sorry to hear about your problem and we apologize for any inconvenience this may have caused to you.\n\nTo track your shipment, you just have to follow this simple instructions:\nOpen the email you received upon purchasing the product\nFind the tracking code at the top we are sorry to hear about your problem and we apologize for any inconvenience this may have caused to you. To track your shipment, you just have to follow this simple instructions: Open the email you received upon purchasing the product Find the tracking code at the top"//getMacroComment(client,macro)
    id_mapping = {360007400834: 360007790033, 360007400874: 360007791713, 360007400914: 360007791733,360007222133: 360008003554, 360007222333: 360008004314}
    real_macro_mapping.push({'confidence':suggested_macros[i]['confidence']*100,'title':title,'id':id_mapping[suggested_macros[i]['macro_id']],"comment":"","threshold":50,"status":"unchecked","identifier":identifier,"comment":comment});
    createAndShowHTML(real_macro_mapping);
  }
}


function ticketWorkflow(){

	data = {"macros": [{"macro_title": "SHIPMENT_ISSUE", "confidence": 0.93, "macro_id": 360007400834}, 
	{"macro_title": "WRONG_PRODUCT", "confidence": 0.08, "macro_id": 360007400874}, 
	{"macro_title": "OPENING_HOURS", "confidence": 0.07, "macro_id": 360007400914}, 
	{"macro_title": "PRODUCT_LAUNCHES", "confidence": 0.06, "macro_id": 360007222133}, 
	{"macro_title": "REPAIRS", "confidence": 0.05, "macro_id": 360007222333}], "suggested_routes": [], "client": "jatanademo", "suggested_tags": []}
	populateApp( data.macros,"test-account");
}


$(function() {
    Handlebars.registerHelper('eq', function () {
      const args = Array.prototype.slice.call(arguments, 0, -1);
      return args.every(function (expression) {
          return args[0] === expression;
      });
    });
    ticketWorkflow();
});