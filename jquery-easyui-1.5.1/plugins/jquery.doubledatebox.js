/**
 * jQuery EasyUI 1.5.1
 * Created by ling on 2017/3/29.
 */
/**
 * doubledatebox - jQuery EasyUI
 *
 * Dependencies:
 * 	 calendar
 *   doublecombo
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"doubledatebox");
var _4=_3.options;
$(_2).addClass("datebox-f").doublecombo($.extend({},_4,{onShowPanel:function(){
_5(this);
_6(this);
_7(this);
_18(this,[$(this).doubledatebox("getValueBegin"),$(this).doubledatebox("getValueEnd")],true);
_4.onShowPanel.call(this);
}}));
if(!_3.calendar){
var _8=$(_2).doublecombo("panel").css("overflow","hidden");
_8.panel("options").onBeforeDestroy=function(){
var c=$(this).find(".calendar-shared");
if(c.length){
c.insertBefore(c[0].pholder);
}
};
var cc=$("<div class=\"datebox-calendar-inner datebox-calendar-inner1\"></div>").prependTo(_8);
var cb=$("<div class=\"datebox-calendar-inner datebox-calendar-inner2\"></div>").insertAfter(cc);
if(_4.sharedCalendar){
var c=$(_4.sharedCalendar);
if(!c[0].pholder){
c[0].pholder=$("<div class=\"calendar-pholder\" style=\"display:none\"></div>").insertAfter(c);
}
var b = c.clone();
c.addClass("calendar-shared").appendTo(cc);
b.addClass("calendar-shared").appendTo(cb);
if(!c.hasClass("calendar")){
c.calendar();
}
if(!b.hasClass("calendar")){
b.calendar();
}
_3.calendar1=c;
_3.calendar2=b;
}else{
_3.calendar1=$("<div></div>").appendTo(cc).calendar();
_3.calendar2=$("<div></div>").appendTo(cb).calendar();
}

$.extend(_3.calendar1.calendar("options"),{fit:true,border:false,onSelect:function(_9){
var _a=this.target;
var _52=$(_a).doubledatebox("options");
var _53=$(_a).doubledatebox("panel");
var _54=_53.find(".datebox-button-middle");
var _55=$.data(_a,"doubledatebox").calendar1;
_54.find("td:eq(0)").html(_52.beginText+_52.showFormatter.call(_a,_55.calendar("options").current));
}});
$.extend(_3.calendar2.calendar("options"),{fit:true,border:false,onSelect:function(_9){
var _a=this.target;
var _56=$(_a).doubledatebox("options");
var _57=$(_a).doubledatebox("panel");
var _58=_57.find(".datebox-button-middle");
var _59=$.data(_a,"doubledatebox").calendar2;
_58.find("td:eq(1)").html(_56.endText+_56.showFormatter.call(_a,_59.calendar("options").current));
}});
}
$(_2).doublecombo("doubletextbox").parent().addClass("datebox");
$(_2).doubledatebox("initValue");
function _5(_c){
var _d=$(_c).doubledatebox("options");
var _e=$(_c).doublecombo("panel");
_e.unbind(".datebox").bind("click.datebox",function(e){
if($(e.target).hasClass("datebox-button-a")){
var _f=parseInt($(e.target).attr("datebox-button-index"));
_d.buttons[_f].handler.call(e.target,_c);
}
if($(e.target).hasClass("datebox-button-b")){
var _f=parseInt($(e.target).attr("datebox-button-index"));
_d.topButtons[_f].handler.call(e.target,_c);
}
});
};
function _6(_10){
var _11=$(_10).doublecombo("panel");
var opts=$(_10).doubledatebox("options");
if(!_11.children("div.datebox-button-middle").length){
var _49=$("<div class=\"datebox-button datebox-button-middle\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"width:100%\"><tr><td></td><td></td></tr></table></div>").prependTo(_11);
_49.find("td").css({width:"25%",textAlign:"left"});
_49.find("td:eq(0)").html(opts.beginText);
_49.find("td:eq(1)").html(opts.endText);
}
if(!_11.children("div.datebox-button-bottom").length){
var _12=$("<div class=\"datebox-button datebox-button-bottom\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"width:100%\"><tr></tr></table></div>").appendTo(_11);
var tr=_12.find("tr");
for(var i=0;i<_4.buttons.length;i++){
var td=$("<td></td>").appendTo(tr);
var btn=_4.buttons[i];
var t=$("<a class=\"datebox-button-a\" href=\"javascript:;\"></a>").html($.isFunction(btn.text)?btn.text(_10):btn.text).appendTo(td);
t.attr("datebox-button-index",i);
}
tr.find("td").css("width",(100/_4.buttons.length)+"%");
}
if(!_11.children("div.datebox-button-top").length && _4.topButtons.length){
var _60=$("<div class=\"datebox-button datebox-button-top\"></div>").prependTo(_11);
for(var i=0;i<_4.topButtons.length;i++){
var btn=_4.topButtons[i];
var t=$("<a class=\"datebox-button-b\" href=\"javascript:;\"></a>").html(btn.text).appendTo(_60);
t.attr("datebox-button-index",i);
}
}
};
function _7(_13){
var _14=$(_13).doublecombo("panel");
var cc=_14.children("div.datebox-calendar-inner");
cc.css({display:"inline-block"});
_14.children().not(cc)._outerWidth(_14.width());
cc._outerWidth(_14.width()/2);
_3.calendar1.appendTo(cc[0]);
_3.calendar1[0].target=_13;
_3.calendar2.appendTo(cc[1]);
_3.calendar2[0].target=_13;
if(_4.panelHeight!="auto"){
var _15=_14.height();
_14.children().not(cc).each(function(){
_15-=$(this).outerHeight();
});
cc._outerHeight(_15);
}
_3.calendar1.calendar("resize");
_3.calendar2.calendar("resize");
};
};
function _16(_17,q){
_18(_17,q,true);
};
function _19(_1a){
var _1b=$.data(_1a,"doubledatebox");
var _1c=_1b.options;
var _1d=_1b.calendar1.calendar("options").current;
var _1d2=_1b.calendar2.calendar("options").current;
if(_1d || _1d2){
_18(_1a,[_1c.formatter.call(_1a,_1d),_1c.formatter.call(_1a,_1d)]);
$(_1a).doubletextbox("hidePanel");
}
};
function _18(_1e,_1f,_20){
var _21=$.data(_1e,"doubledatebox");
var _22=_21.options;
var _23=_21.calendar1;
var _33=_21.calendar2;
var _50=$(_1e).doubledatebox("panel");
if(!$.isArray(_1f)){
_1f=_1f.split(_22.separator);
}
if(!_1f.length){
_1f=["",""];
}else if(_1f.length==1){
_1f.push("");
}
_23.calendar("moveTo",_22.parser.call(_1e,_1f[0]));
_33.calendar("moveTo",_22.parser.call(_1e,_1f[1]));
var _51=_50.find(".datebox-button-middle");
_51.find("td:eq(0)").html(_22.beginText+_22.showFormatter.call(_1e,_23.calendar("options").current));
_51.find("td:eq(1)").html(_22.endText+_22.showFormatter.call(_1e,_33.calendar("options").current));
if(_20){
$(_1e).doublecombo("setValues",_1f);
}else{
if(_1f[0]){
_1f[0]=_22.formatter.call(_1e,_23.calendar("options").current);
}
if(_1f[1]){
_1f[1]=_22.formatter.call(_1e,_33.calendar("options").current);
}
$(_1e).doublecombo("setValues",_1f);
}
};
$.fn.doubledatebox=function(_24,_25){
if(typeof _24=="string"){
var _26=$.fn.doubledatebox.methods[_24];
if(_26){
return _26(this,_25);
}else{
return this.doublecombo(_24,_25);
}
}
_24=_24||{};
return this.each(function(){
var _27=$.data(this,"doubledatebox");
if(_27){
$.extend(_27.options,_24);
}else{
$.data(this,"doubledatebox",{options:$.extend({},$.fn.doubledatebox.defaults,$.fn.doubledatebox.parseOptions(this),_24,{editable:false})});
}
_1(this);
});
};
$.fn.doubledatebox.methods={options:function(jq){
var _28=jq.doublecombo("options");
return $.extend($.data(jq[0],"doubledatebox").options,{width:_28.width,height:_28.height,originalValue:_28.originalValue,originalValuebegin:_28.originalValueBegin,originalValueEnd:_28.originalValueEnd,disabled:_28.disabled,readonly:_28.readonly});
},calendar1:function(jq){
return $.data(jq[0],"doubledatebox").calendar1;
},calendar2:function(jq){
return $.data(jq[0],"doubledatebox").calendar2;
},initValue:function(jq,_2a){
return jq.each(function(){
var _2b=$(this).doubledatebox("options");
var _2c=_2b.valueBegin;
if(_2c){
_2c=_2b.formatter.call(this,_2b.parser.call(this,_2c));
}
var _3c=_2b.valueEnd;
if(_3c){
_3c=_2b.formatter.call(this,_2b.parser.call(this,_3c));
}
_18(this,[_2c,_3c],true);
});
},setValues:function(jq,_2d){
return jq.each(function(){
_18(this,_2d);
});
},reset:function(jq){
return jq.each(function(){
var _2e=$(this).doubledatebox("options");
$(this).doubledatebox("setValues",[_2e.originalValueBegin,_2e.originalValueEnd]);
});
}};
$.fn.doubledatebox.parseOptions=function(_2f){
return $.extend({},$.fn.doublecombo.parseOptions(_2f),$.parser.parseOptions(_2f,["sharedCalendar"]));
};
$.fn.doubledatebox.defaults=$.extend({},$.fn.doublecombo.defaults,{panelWidth:400,panelHeight:"auto",sharedCalendar:null,keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
_19(this);
},query:function(q,e){
_16(this,q);
}},currentText:"Today",closeText:"Close",okText:"Ok",buttons:[{text:function(_40){
return $(_40).doubledatebox("options").okText;
},handler:function(_41){
var _4b=$.data(_41,"doubledatebox");
var _42=_4b.options;
var _43=_4b.calendar1.calendar("options").current;
var _44=_4b.calendar2.calendar("options").current;
if(_43 && _44){
var _45 = _42.formatter.call(_41,_43);
var _46 = _42.formatter.call(_41,_44);
_18(_41,[_45,_46],true);
$(_41).doublecombo("hidePanel");
}
}},{text:function(_47){
return $(_47).doubledatebox("options").closeText;
},handler:function(_48){
$(this).closest("div.combo-panel").panel("close");
}}],topButtons:[],formatter:function(_34){
var y=_34.getFullYear();
var m=_34.getMonth()+1;
var d=_34.getDate();
return (m<10?("0"+m):m)+"/"+(d<10?("0"+d):d)+"/"+y;
},parser:function(s){
if(!s){
return new Date();
}
var ss=s.split("/");
var m=parseInt(ss[0],10);
var d=parseInt(ss[1],10);
var y=parseInt(ss[2],10);
if(!isNaN(y)&&!isNaN(m)&&!isNaN(d)){
return new Date(y,m-1,d);
}else{
return new Date();
}
},beginText:"Start Date:",endText:"End Date:",showFormatter:function(_34){
var y=_34.getFullYear();
var m=_34.getMonth()+1;
var d=_34.getDate();
return (m<10?("0"+m):m)+"/"+(d<10?("0"+d):d)+"/"+y;
},onSelect:function(_35){
}});
})(jQuery);