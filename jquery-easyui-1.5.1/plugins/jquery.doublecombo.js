/**
 * jQuery EasyUI 1.5.1
 * Created by ling on 2017/3/29.
 */
/**
 * doublecombo - jQuery EasyUI
 * _cb
 * Dependencies:
 * 	 panel
 *   doublecombo
 *
 */
(function($){
$(function(){
$(document).unbind(".combo").bind("mousedown.combo mousewheel.combo",function(e){
var p=$(e.target).closest("span.combo,div.combo-p,div.menu");
if(p.length){
_1(p);
return;
}
$("body>div.combo-p>div.combo-panel:visible").panel("close");
});
});
function _2(_3){
var _4=$.data(_3,"doublecombo");
var _5=_4.options;
if(!_4.panel){
_4.panel=$("<div class=\"combo-panel\"></div>").appendTo("body");
_4.panel.panel({minWidth:_5.panelMinWidth,maxWidth:_5.panelMaxWidth,minHeight:_5.panelMinHeight,maxHeight:_5.panelMaxHeight,doSize:false,closed:true,cls:"combo-p",style:{position:"absolute",zIndex:10},onOpen:function(){
var _6=$(this).panel("options").comboTarget;
var _7=$.data(_6,"doublecombo");
if(_7){
_7.options.onShowPanel.call(_6);
}
},onBeforeClose:function(){
_1($(this).parent());
},onClose:function(){
var _8=$(this).panel("options").comboTarget;
var _9=$(_8).data("doublecombo");
if(_9){
_9.options.onHidePanel.call(_8);
}
}});
}
var _a=$.extend(true,[],_5.icons);
if(_5.hasDownArrow){
_a.push({iconCls:"combo-arrow",handler:function(e){
_f(e.data.target);
}});
}
$(_3).addClass("combo-f").doubletextbox($.extend({},_5,{icons:_a,onChange:function(){
}}));
$(_3).attr("comboName",$(_3).attr("textboxName"));
_4.doublecombo=$(_3).next();
_4.doublecombo.addClass("combo");
};
function _b(_c){
var _d=$.data(_c,"doublecombo");
var _e=_d.options;
var p=_d.panel;
if(p.is(":visible")){
p.panel("close");
}
if(!_e.cloned){
p.panel("destroy");
}
$(_c).doubletextbox("destroy");
};
function _f(_10){
var _11=$.data(_10,"doublecombo").panel;
if(_11.is(":visible")){
var _12=_11.doublecombo("doublecombo");
_13(_12);
if(_12!=_10){
$(_10).doublecombo("showPanel");
}
}else{
var p=$(_10).closest("div.combo-p").children(".combo-panel");
$("div.combo-panel:visible").not(_11).not(p).panel("close");
$(_10).doublecombo("showPanel");
}
$(_10).doublecombo("textboxbegin").focus();
};
function _1(_14){
$(_14).find(".combo-f").each(function(){
var p=$(this).doublecombo("panel");
if(p.is(":visible")){
p.panel("close");
}
});
};
function _15(e){
var _16=e.data.target;
var _17=$.data(_16,"doublecombo");
var _18=_17.options;
if(!_18.editable){
_f(_16);
}else{
var p=$(_16).closest("div.combo-p").children(".combo-panel");
$("div.combo-panel:visible").not(p).each(function(){
var _19=$(this).doublecombo("doublecombo");
if(_19!=_16){
_13(_19);
}
});
}
};
function _1a(e){
var _1b=e.data.target;
var t=$(_1b);
var _1c=t.data("doublecombo");
var _1d=t.doublecombo("options");
_1c.panel.panel("options").comboTarget=_1b;
switch(e.keyCode){
case 38:
_1d.keyHandler.up.call(_1b,e);
break;
case 40:
_1d.keyHandler.down.call(_1b,e);
break;
case 37:
_1d.keyHandler.left.call(_1b,e);
break;
case 39:
_1d.keyHandler.right.call(_1b,e);
break;
case 13:
e.preventDefault();
_1d.keyHandler.enter.call(_1b,e);
return false;
case 9:
case 27:
_13(_1b);
break;
default:
if(_1d.editable){
if(_1c.timer){
clearTimeout(_1c.timer);
}
_1c.timer=setTimeout(function(){
var q1=t.doublecombo("getTextBegin");
var q2=t.doublecombo("getTextEnd");
var q=undefined;
if(_1c.previousText1!=q1){
_1c.previousText1=q1;
q=q1;
}
if(_1c.previousText2!=q2){
_1c.previousText2=q2;
q=q2;
}
if(q){
t.doublecombo("showPanel");
_1d.keyHandler.query.call(_1b,q,e);
t.doublecombo("validate");
}
},_1d.delay);
}
}
};
function _1e(_1f){
var _20=$.data(_1f,"doublecombo");
var _21=_20.doublecombo;
var _22=_20.panel;
var _23=$(_1f).doublecombo("options");
var _24=_22.panel("options");
_24.comboTarget=_1f;
if(_24.closed){
_22.panel("panel").show().css({zIndex:($.fn.menu?$.fn.menu.defaults.zIndex++:($.fn.window?$.fn.window.defaults.zIndex++:99)),left:-999999});
_22.panel("resize",{width:(_23.panelWidth?_23.panelWidth:_21._outerWidth()),height:_23.panelHeight});
_22.panel("panel").hide();
_22.panel("open");
}
(function(){
if(_24.comboTarget==_1f&&_22.is(":visible")){
_22.panel("move",{left:_25(),top:_26()});
setTimeout(arguments.callee,200);
}
})();
function _25(){
var _27=_21.offset().left;
if(_23.panelAlign=="right"){
_27+=_21._outerWidth()-_22._outerWidth();
}
if(_27+_22._outerWidth()>$(window)._outerWidth()+$(document).scrollLeft()){
_27=$(window)._outerWidth()+$(document).scrollLeft()-_22._outerWidth();
}
if(_27<0){
_27=0;
}
return _27;
};
function _26(){
var top=_21.offset().top+_21._outerHeight();
if(top+_22._outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
top=_21.offset().top-_22._outerHeight();
}
if(top<$(document).scrollTop()){
top=_21.offset().top+_21._outerHeight();
}
return top;
};
};
function _13(_28){
var _29=$.data(_28,"doublecombo").panel;
_29.panel("close");
};
function _2f(_30){
var _31=$.data(_30,"doublecombo");
var _32=_31.options;
var _33=_31.doublecombo;
var _34=[];
_33.find(".textbox-value").each(function(){
_34.push($(this).val());
});
return _34;
};
function _35(_36,_37){
var _38=$.data(_36,"doublecombo");
var _39=_38.options;
var _3a=_38.doublecombo;
if(!$.isArray(_37)){
_37=_37.split(_39.separator);
}
var _3b=_2f(_36);
$(_36).doublecombo("initValue",_37);
var _40=(function(){
if(_3b.length!=_37.length){
return true;
}
for(var i=0;i<_37.length;i++){
if(_37[i]!=_3b[i]){
return true;
}
}
return false;
})();
if(_40){
_39.onChange.call(_36,_37,_3b);
$(_36).closest("form").trigger("_change",[_36]);
}
};
function _47(_48){
var _49=$.data(_48,"doublecombo").options;
var _4a=_49.onChange;
_49.onChange=function(){
};
_35(_48,[_49.valueBegin,_49.valueEnd]);
_49.onChange=_4a;
};
$.fn.doublecombo=function(_4b,_4c){
if(typeof _4b=="string"){
var _4d=$.fn.doublecombo.methods[_4b];
if(_4d){
return _4d(this,_4c);
}else{
return this.doubletextbox(_4b,_4c);
}
}
_4b=_4b||{};
return this.each(function(){
var _4e=$.data(this,"doublecombo");
if(_4e){
$.extend(_4e.options,_4b);
if(_4e.options.valueBegin!=undefined){
_4e.options.originalValueBegin=_4e.options.valueBegin;
}
if(_4e.options.valueEnd!=undefined){
_4e.options.originalValueEnd=_4e.options.valueEnd;
}
}else{
_4e=$.data(this,"doublecombo",{options:$.extend({},$.fn.doublecombo.defaults,$.fn.doublecombo.parseOptions(this),_4b),previousText1:"",previousText2:""});
_4e.options.originalValue=_4e.options.value;
if(_4e.options.value){
var _4v=_4e.options.value.split(_4e.options.separator);
if(_4v.length){
_4e.options.originalValueBegin=_4v[0];
_4e.options.originalValueEnd=_4v.length>1?_4v[1]:_4v[0];
_4e.options.valueBegin=_4v[0];
_4e.options.valueEnd=_4v.length>1?_4v[1]:_4v[0];
}
}
}
_2(this);
_47(this);
});
};
$.fn.doublecombo.methods={options:function(jq){
var _4f=jq.doubletextbox("options");
return $.extend($.data(jq[0],"doublecombo").options,{width:_4f.width,height:_4f.height,disabled:_4f.disabled,readonly:_4f.readonly});
},doublecombo:function(jq){
return jq.closest(".combo-panel").panel("options").comboTarget;
},panel:function(jq){
return $.data(jq[0],"doublecombo").panel;
},destroy:function(jq){
return jq.each(function(){
_b(this);
});
},showPanel:function(jq){
return jq.each(function(){
_1e(this);
});
},hidePanel:function(jq){
return jq.each(function(){
_13(this);
});
},clear:function(jq){
return jq.each(function(){
$(this).doublecombo("setValues",[]);
});
},reset:function(jq){
return jq.each(function(){
var _52=$.data(this,"doublecombo").options;
$(this).doublecombo("setValues",[_52.originalValueBegin,_52.originalValueEnd]);
});
},getValues:function(jq){
return _2f(jq[0]);
},setValues:function(jq,_54){
return jq.each(function(){
_35(this,_54);
});
}};
$.fn.doublecombo.parseOptions=function(_56){
var t=$(_56);
return $.extend({},$.fn.doubletextbox.parseOptions(_56),$.parser.parseOptions(_56,["panelAlign",{panelWidth:"number",hasDownArrow:"boolean",delay:"number",reversed:"boolean",selectOnNavigation:"boolean"},{panelMinWidth:"number",panelMaxWidth:"number",panelMinHeight:"number",panelMaxHeight:"number"}]),{panelHeight:(t.attr("panelHeight")=="auto"?"auto":parseInt(t.attr("panelHeight"))||undefined)});
};
$.fn.doublecombo.defaults=$.extend({},$.fn.doubletextbox.defaults,{inputEvents:{click:_15,keydown:_1a,paste:_1a,drop:_1a,blur:$.fn.doubletextbox.defaults.inputEvents.blur},panelWidth:null,panelHeight:200,panelMinWidth:null,panelMaxWidth:null,panelMinHeight:null,panelMaxHeight:null,panelAlign:"left",reversed:false,selectOnNavigation:true,hasDownArrow:true,delay:200,keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
},query:function(q,e){
}},onShowPanel:function(){
},onHidePanel:function(){
},onChange:function(_57,_58){
}});
})(jQuery);

