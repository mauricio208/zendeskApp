$(document).on('click','.nav-link', function(e){
    var state = $(this).attr('data-state');

    var href = $(this).attr('href').substring(1);

    $('.nav-link').each(function (i,v) {
        if($(v).attr('href') != href){
            $(v).attr('data-state', 0);
        }
    });

    $('.tab-pane').each(function (i,v) {
        if($(v).attr('id') != href){
            $(v).removeClass('active');
            $(v).removeClass('show');
        }
    });

    $('.nav-link').removeClass('active');
    $('.nav-link').removeClass('show');


    $(this).addClass('active');
    $(this).addClass('show');
    $('.tab-pane[id="'+ href +'"]').addClass('active');
    $('.tab-pane[id="'+ href +'"]').addClass('show');

    if(state == 0) {
        $(this).attr('data-state',1);
    }

    if(state == 1) {
        $(this).attr('data-state',0);
        $(this).removeClass('active');
        $(this).removeClass('show');
        $('.tab-pane[id="'+ href +'"]').removeClass('active');
        $('.tab-pane[id="'+ href +'"]').removeClass('show');
    }


});

//
// $(document).on('click','.nav-link', function(){
//   var href = $(this).attr('href').substring(1);
//   console.log(this);
//   console.log(href);
//   if ($(this).hasClass('active')){
//     console.log("this");
//     $(this).removeClass('active');
//     $(this).removeClass('show');
//   }else{
//     console.log("here");
//     $(this).addClass('active');
//     $(this).addClass('show');
//   }
//   console.log($('.tab-pane[id="'+ href +'"]'));
//   if ($('.tab-pane[id="'+ href +'"]').hasClass('active')){
//
//     $('.tab-pane[id="'+ href +'"]').removeClass('active');
//     $('.tab-pane[id="'+ href +'"]').removeClass('show');
//   }
//   else{
//     console.log("ok here now");
//     $('.tab-pane[id="'+ href +'"]').addClass('active');
//     $('.tab-pane[id="'+ href +'"]').addClass('show');
//   }
// });

// $(document).on('click','.nav-link:not(.active)', function(){
//   var href = $(this).attr('href').substring(1);
//   $(this).addClass('active');
//   if ($('.tab-pane[id="'+ href +'"]').hasClass('active')){
//     $('.tab-pane[id="'+ href +'"]').removeClass('active');
//   }
//   else{
//     $('.tab-pane[id="'+ href +'"]').addClass('active');
//   }
// });

// $(document).on('click','.btn0',function (){
//     if($(this).hasClass("active")){
//       console.log("activated");
//       $(this).removeClass("active");
//       $(this).removeClass("show");
//     }else{
//       $(this).addClass("active");
//       $(this).addClass("show");
//     }
//
//     if($('#one_0').hasClass('active')){
//       $('#one_0').removeClass('active');
//       $('#one_0').removeClass('show');
//     }else{
//       $('#one_0').addClass('active');
//       $('#one_0').addClass('show');
//     }
// });
//
//
// $(document).on('click','.btn_0',function (){
//     if($(this).hasClass("active"))
//     $(".card0").removeClass("p-bottom");
//     else
//     $(".card0").addClass("p-bottom");
// });
//
// $(document).on('click','.btn1',function (){
//     if($(this).hasClass("active"))
//     $(".card1").removeClass("p-bottom");
//     else
//     $(".card1").addClass("p-bottom");
// });
// $(document).on('click','.btn_1',function (){
//     if($(this).hasClass("active"))
//     $(".card1").removeClass("p-bottom");
//     else
//     $(".card1").addClass("p-bottom");
// });
// $(document).on('click','.btn2',function (){
//     if($(this).hasClass("active"))
//     $(".card2").removeClass("p-bottom");
//     else
//     $(".card2").addClass("p-bottom");
// });
// $(document).on('click','.btn_2',function (){
//     if($(this).hasClass("active"))
//     $(".card2").removeClass("p-bottom");
//     else
//     $(".card2").addClass("p-bottom");
// });
// $(document).on('click','.btn3',function (){
//     if($(this).hasClass("active"))
//     $(".card3").removeClass("p-bottom");
//     else
//     $(".card3").addClass("p-bottom");
// });
// $(document).on('click','.btn_3',function (){
//     if($(this).hasClass("active"))
//     $(".card3").removeClass("p-bottom");
//     else
//     $(".card3").addClass("p-bottom");
// });
// $(document).on('click','.btn4',function (){
//     if($(this).hasClass("active"))
//     $(".card4").removeClass("p-bottom");
//     else
//     $(".card4").addClass("p-bottom");
// });
// $(document).on('click','.btn_4',function (){
//     if($(this).hasClass("active"))
//     $(".card4").removeClass("p-bottom");
//     else
//     $(".card4").addClass("p-bottom");
// });




$(document).on('click',".button0",function(){
  var current0 = $(".cn0").text();
    current0--;
    if (current0>0){
      $(".cn0").text(current0);
      $(".nmbr0").text(current0);
    }
});

$(document).on('click',".button0-",function(){
  var current0 = $(".cn0").text();
    current0++;
    if (current0<100){
      $(".cn0").text(current0);
      $(".nmbr0").text(current0);
    }
});
$(document).on('click',".button1",function(){
  var current0 = $(".cn1").text();
    current0--;
    if (current0>0){
      $(".cn1").text(current0);
      $(".nmbr1").text(current0);
    }
});

$(document).on('click',".button1-",function(){
  var current0 = $(".cn1").text();
    current0++;
    if (current0<100){
      $(".cn1").text(current0);
      $(".nmbr1").text(current0);
    }
});
$(document).on('click',".button2",function(){
  var current0 = $(".cn2").text();
    current0--;
    if (current0>0){
      $(".cn2").text(current0);
      $(".nmbr2").text(current0);
    }
});

$(document).on('click',".button2-",function(){
  var current0 = $(".cn2").text();
    current0++;
    if (current0<100){
      $(".cn2").text(current0);
      $(".nmbr2").text(current0);
    }
});
$(document).on('click',".button3",function(){
  var current0 = $(".cn3").text();
    current0--;
    if (current0>0){
      $(".cn3").text(current0);
      $(".nmbr3").text(current0);
    }
});

$(document).on('click',".button3-",function(){
  var current0 = $(".cn3").text();
    current0++;
    if (current0<100){
      $(".cn3").text(current0);
      $(".nmbr3").text(current0);
    }
});
$(document).on('click',".button4",function(){
  var current0 = $(".cn4").text();
    current0--;
    if (current0>0){
      $(".cn4").text(current0);
      $(".nmbr4").text(current0);
    }
});

$(document).on('click',".button4-",function(){
  var current0 = $(".cn4").text();
    current0++;
    if (current0<100){
      $(".cn4").text(current0);
      $(".nmbr4").text(current0);
    }
});

$(document).on('mouseover',".col-md-5>.card0 .heading",function(){
      $(".col-md-5>.card0").css("background","#7425bee0");
      $(".col-md-5>.card0 .heading .card-title .heading-arrow").css("color","#e9ff00").css("border-color","#e9ff00");
      $(".col-md-5>.card0 .heading .card-title span.title").addClass('fade');
      $(".col-md-5>.card0 .heading .card-title span.apply").show();

});
$(document).on('mouseover',".col-md-5>.card1 .heading",function(){
      $(".col-md-5>.card1").css("background","#7425bee0");
      $(".col-md-5>.card1 .heading .card-title .heading-arrow").css("color","#e9ff00").css("border-color","#e9ff00");
    $(".col-md-5>.card1 .heading .card-title span.title").addClass('fade');
    $(".col-md-5>.card1 .heading .card-title span.apply").show();
});
$(document).on('mouseover',".col-md-5>.card2 .heading",function(){
      $(".col-md-5>.card2").css("background","#7425bee0");
      $(".col-md-5>.card2 .heading .card-title .heading-arrow").css("color","#e9ff00").css("border-color","#e9ff00");
    $(".col-md-5>.card2 .heading .card-title span.title").addClass('fade');
    $(".col-md-5>.card2 .heading .card-title span.apply").show();
});
$(document).on('mouseover',".col-md-5>.card3 .heading",function(){
      $(".col-md-5>.card3").css("background","#7425bee0");
      $(".col-md-5>.card3 .heading .card-title .heading-arrow").css("color","#e9ff00").css("border-color","#e9ff00");
    $(".col-md-5>.card3 .heading .card-title span.title").addClass('fade');
    $(".col-md-5>.card3 .heading .card-title span.apply").show();
});
$(document).on('mouseover',".col-md-5>.card4 .heading",function(){
      $(".col-md-5>.card4").css("background","#7425bee0");
      $(".col-md-5>.card4 .heading .card-title .heading-arrow").css("color","#e9ff00").css("border-color","#e9ff00");
    $(".col-md-5>.card4 .heading .card-title span.title").addClass('fade');
    $(".col-md-5>.card4 .heading .card-title span.apply").show();
});
$(document).on('mouseover',".col-md-5>.card5 .heading",function(){
      $(".col-md-5>.card5").css("background","#7425bee0");
      $(".col-md-5>.card5 .heading .card-title .heading-arrow").css("color","#e9ff00").css("border-color","#e9ff00");
    $(".col-md-5>.card5 .heading .card-title span.title").addClass('fade');
    $(".col-md-5>.card5 .heading .card-title span.apply").show();
});

$(document).on('mouseleave','.col-md-5>.card0 .heading',function(){
    $(".card0").css("background","");
    $(".card0 .heading .card-title .heading-arrow").css("color","").css("border-color","");

    $(".col-md-5>.card0 .heading .card-title span.title").removeClass('fade');
    $(".col-md-5>.card0 .heading .card-title span.apply").hide();

});
$(document).on('mouseleave','.col-md-5>.card1 .heading',function(){
    $(".card1").css("background","");
    $(".card1 .heading .card-title .heading-arrow").css("color","").css("border-color","");

    $(".card1 .heading .card-title span.title").removeClass('fade');
    $(".card1 .heading .card-title span.apply").hide();
});
$(document).on('mouseleave','.col-md-5>.card2 .heading',function(){
    $(".card2").css("background","");
    $(".card2 .heading .card-title .heading-arrow").css("color","").css("border-color","");

    $(".card2 .heading .card-title span.title").removeClass('fade');
    $(".card2 .heading .card-title span.apply").hide();
});
$(document).on('mouseleave','.col-md-5>.card3 .heading',function(){
    $(".card3").css("background","");
    $(".card3 .heading .card-title .heading-arrow").css("color","").css("border-color","");

    $(".card3 .heading .card-title span.title").removeClass('fade');
    $(".card3 .heading .card-title span.apply").hide();
});
$(document).on('mouseleave','.col-md-5>.card4 .heading',function(){
    $(".card4").css("background","");
    $(".card4 .heading .card-title .heading-arrow").css("color","").css("border-color","");

    $(".card4 .heading .card-title span.title").removeClass('fade');
    $(".card4 .heading .card-title span.apply").hide();
});
$(document).on('mouseleave','.col-md-5>.card5 .heading',function(){
    $(".card5").css("background","");
    $(".card5 .heading .card-title .heading-arrow").css("color","").css("border-color","");

    $(".card5 .heading .card-title span.title").removeClass('fade');
    $(".card5 .heading .card-title span.apply").hide();
});



//####################################//

$(document).on('click','.switch0',function(){
    if ($(this).is(':checked'))
        checkedzero();
    else
        uncheckedzero();
});

$(document).on('click','.switch1',function(){
    if ($(this).is(':checked'))
        checkedone();
    else
        uncheckedone();
});

$(document).on('click','.switch2',function(){
    if ($(this).is(':checked'))
        checkedtwo();
    else
        uncheckedtwo();
});

$(document).on('click','.switch3',function(){
    if ($(this).is(':checked'))
        checkedthree();
    else
        uncheckedthree();
});

$(document).on('click','.switch4',function(){
    if ($(this).is(':checked'))
        checkedfour();
    else
        uncheckedfour();
});


$(document).on('load',function(){
  if ($('.switch0').is(':checked'))
      checkedzero();
  else
      uncheckedzero();
});

function checkedzero() {
    $(".act0").text("Active");
    $(".counter0").css("color", "#fff");
    $(".cbc0").css("color", "#fff");
    $(".count0").css("background", "");
    $(".nmbr0").attr("state", "checked");
    $(".onoff0").text('ON');
};
function uncheckedzero() {
    $(".act0").text("Non active");
    $(".counter0").css("color", "#999");
    $(".cbc0").css("color", "#999");
    $(".count0").css("background", "#999");
    $(".nmbr0").attr("state", "unchecked");
    $(".onoff0").text('OFF');
};

function checkedtwo() {
    $(".act2").text("Active");
    $(".counter2").css("color", "#fff");
    $(".cbc2").css("color", "#fff");
    $(".count2").css("background", "");
    $(".nmbr2").attr("state", "checked");
    $(".onoff2").text('ON');
};
function uncheckedtwo() {
    $(".act2").text("Non active");
    $(".counter2").css("color", "#999");
    $(".cbc2").css("color", "#999");
    $(".count2").css("background", "#999");
    $(".nmbr2").attr("state", "unchecked");
    $(".onoff2").text('OFF');
};

function checkedone() {
    $(".act1").text("Active");
    $(".counter1").css("color", "#fff");
    $(".cbc1").css("color", "#fff");
    $(".count1").css("background", "");
    $(".nmbr1").attr("state", "checked");
    $(".onoff1").text('ON');
};
function uncheckedone() {
    $(".act1").text("Non active");
    $(".counter1").css("color", "#999");
    $(".cbc1").css("color", "#999");
    $(".count1").css("background", "#999");
    $(".nmbr1").attr("state", "unchecked");
    $(".onoff1").text('OFF');
};

function checkedthree() {
    $(".act3").text("Active");
    $(".counter3").css("color", "#fff");
    $(".cbc3").css("color", "#fff");
    $(".count3").css("background", "");
    $(".nmbr3").attr("state", "checked");
    $(".onoff3").text('ON');
};
function uncheckedthree() {
    $(".act3").text("Non active");
    $(".counter3").css("color", "#999");
    $(".cbc3").css("color", "#999");
    $(".count3").css("background", "#999");
    $(".nmbr3").attr("state", "unchecked");
    $(".onoff3").text('OFF');
};

function checkedfour() {
    $(".act4").text("Active");
    $(".counter4").css("color", "#fff");
    $(".cbc4").css("color", "#fff");
    $(".count4").css("background", "");
    $(".nmbr4").attr("state", "checked");
    $(".onoff4").text('ON');

};
function uncheckedfour() {
    $(".act4").text("Non active");
    $(".counter4").css("color", "#999");
    $(".cbc4").css("color", "#999");
    $(".count4").css("background", "#999");
    $(".nmbr4").attr("state", "unchecked");
    $(".onoff4").text('OFF');
};


////////////////////////////////////////////////////////////

$(document).on('DOMSubtreeModified', '.nav span.count.count', function() {
  console.log("hahahaha");
  ele = $('span.count.count > span.nmbr')
  var macro_id = $(ele).attr('macro')
  var macro_state = $('span[macro='+macro_id+']').attr('state')
  if (macro_state==='checked'){
    macro_state=true
  }else{
    macro_state=false
  }
  var threshold = $('span[macro='+macro_id+']').text()
  threshold = parseInt(threshold.match(/\d+/),10)
  var identifier = $('span[macro='+macro_id+']').attr('identifier')
  var id_mapping = {360007790033:360007400834, 360007791713:360007400874, 360007791733:360007400914,360008003554:360007222133, 360008004314:360007222333}
  console.log({ state: macro_state, threshold: threshold, macro_id:macro_id,identifier:identifier })
  $.post( "https://zendesk.jatana.ai/macro_update/", { state: macro_state, threshold: threshold, macro:macro_id,identifier:identifier })
});

$(document).on('DOMSubtreeModified', '.ShowActv', function() {
  var macro_id = $(this).attr('macro')
  var identifier = $(this).attr('identifier')
  var macro_state = $('span[macro='+macro_id+']').attr('state')
  if (macro_state==='unchecked'){
    macro_state=true
  }else{
    macro_state=false
  }
  var id_mapping = {360007790033:360007400834, 360007791713:360007400874, 360007791733:360007400914,360008003554:360007222133, 360008004314:360007222333}
  console.log({ state: macro_state, macro_id:macro_id,identifier:identifier })
  $.post( "https://zendesk.jatana.ai/macro_update/", { state: macro_state, macro:macro_id,identifier:identifier })
});
