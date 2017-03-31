/**
 * jQuery EasyUI 1.5.1
 * Created by ling on 2017/3/29.
 */
/**
 * doubletextbox - jQuery EasyUI
 *
 * Dependencies:
 * 	 calendar
 *   combo
 *
 */
(function($){
var _1=0;
function _2(_3,separator){
$(_3).addClass("textbox-f").hide();
var jj=[];
jj.push("<span class=\"textbox\">");
jj.push("<input class=\"textbox-text\" autocomplete=\"off\">");
jj.push("<span class=\"textbox-separator\">"+separator+"</span>");
jj.push("<input class=\"textbox-text\" autocomplete=\"off\">");
jj.push("<input type=\"hidden\" class=\"textbox-value\">");
jj.push("<input type=\"hidden\" class=\"textbox-value\">");
jj.push("</span>");
var _4=$(jj.join("")).insertAfter(_3);
_4.find(".textbox-separator").css({margin:"0px 5px",padding:"0px",display:"inline-block",verticalAlign:"middle",position:"relative",width:"auto",height:"100%"});
var _5=$(_3).attr("name");
if(_5){
_4.find("input.textbox-value:eq(0)").attr("name",_5);
$(_3).removeAttr("name").attr("textboxName",_5);
}
var _n2=$(_3).attr("name2");
if(_n2){
_4.find("input.textbox-value:eq(1)").attr("name",_n2);
$(_3).removeAttr("name2").attr("textboxName2",_n2);
}
return _4;
};
function _6(_7){
var _8=$.data(_7,"doubletextbox");
var _9=_8.options;
var tb=_8.doubletextbox;
var _a="_easyui_textbox_input"+(++_1);
var _a2="_easyui_textbox_input"+(++_1);
tb.addClass(_9.cls);
tb.find(".textbox-text").remove();
$("<input id=\""+_a2+"\" type=\""+_9.type+"\" class=\"textbox-text\" autocomplete=\"off\">").prependTo(tb);
tb.find(".textbox-separator").remove();
$("<span class=\"textbox-separator\">"+_9.separator+"</span>").css({margin:"0px 5px",padding:"0px",display:"inline-block",verticalAlign:"middle",position:"relative",width:"auto",height:"100%"}).prependTo(tb);
$("<input id=\""+_a+"\" type=\""+_9.type+"\" class=\"textbox-text\" autocomplete=\"off\">").prependTo(tb);
$("#"+_a).attr("tabindex",$(_7).attr("tabindex")||"").css("text-align",_7.style.textAlign||"");
$("#"+_a2).attr("tabindex",$(_7).attr("tabindex")||"").css("text-align",_7.style.textAlign||"");
tb.find(".textbox-addon").remove();
var bb=_9.icons?$.extend(true,[],_9.icons):[];
if(_9.iconCls){
bb.push({iconCls:_9.iconCls,disabled:true});
}
if(bb.length){
var bc=$("<span class=\"textbox-addon\"></span>").prependTo(tb);
bc.addClass("textbox-addon-"+_9.iconAlign);
for(var i=0;i<bb.length;i++){
bc.append("<a href=\"javascript:;\" class=\"textbox-icon "+bb[i].iconCls+"\" icon-index=\""+i+"\" tabindex=\"-1\"></a>");
}
}
tb.find(".textbox-button").remove();
if(_9.buttonText||_9.buttonIcon){
var _b=$("<a href=\"javascript:;\" class=\"textbox-button\"></a>").prependTo(tb);
_b.addClass("textbox-button-"+_9.buttonAlign).linkbutton({text:_9.buttonText,iconCls:_9.buttonIcon,onClick:function(){
var t=$(this).parent().prev();
t.doubletextbox("options").onClickButton.call(t[0]);
}});
}
if(_9.label){
if(typeof _9.label=="object"){
_8.label=$(_9.label);
_8.label.attr("for",_a);
}else{
$(_8.label).remove();
_8.label=$("<label class=\"textbox-label\"></label>").html(_9.label);
_8.label.css("textAlign",_9.labelAlign).attr("for",_a);
if(_9.labelPosition=="after"){
_8.label.insertAfter(tb);
}else{
_8.label.insertBefore(_7);
}
_8.label.removeClass("textbox-label-left textbox-label-right textbox-label-top");
_8.label.addClass("textbox-label-"+_9.labelPosition);
}
}else{
$(_8.label).remove();
}
_c(_7);
_d(_7,_9.disabled);
_e(_7,_9.readonly);
};
function _f(_10){
var tb=$.data(_10,"doubletextbox").doubletextbox;
tb.find(".textbox-text").validatebox("destroy");
tb.remove();
$(_10).remove();
};
function _11(_12,_13){
var _14=$.data(_12,"doubletextbox");
var _15=_14.options;
var tb=_14.doubletextbox;
var _16=tb.parent();
if(_13){
if(typeof _13=="object"){
$.extend(_15,_13);
}else{
_15.width=_13;
}
}
if(isNaN(parseInt(_15.width))){
var c=$(_12).clone();
c.css("visibility","hidden");
c.insertAfter(_12);
_15.width=c.outerWidth();
c.remove();
}
var _17=tb.is(":visible");
if(!_17){
tb.appendTo("body");
}
var _18=tb.find(".textbox-text");
var btn=tb.find(".textbox-button");
var _19=tb.find(".textbox-addon");
var _1a=_19.find(".textbox-icon");
var separator=tb.find(".textbox-separator");
if(_15.height=="auto"){
_18.css({margin:"",paddingTop:"",paddingBottom:"",height:"",lineHeight:""});
}
tb._size(_15,_16);
if(_15.label&&_15.labelPosition){
if(_15.labelPosition=="top"){
_14.label._size({width:_15.labelWidth=="auto"?tb.outerWidth():_15.labelWidth},tb);
if(_15.height!="auto"){
tb._size("height",tb.outerHeight()-_14.label.outerHeight());
}
}else{
_14.label._size({width:_15.labelWidth,height:tb.outerHeight()},tb);
tb._size("width",tb.outerWidth()-_14.label.outerWidth());
}
}
if(_15.buttonAlign=="left"||_15.buttonAlign=="right"){
btn.linkbutton("resize",{height:tb.height()});
}else{
btn.linkbutton("resize",{width:"100%"});
}
var _1b=tb.width()-_1a.length*_15.iconWidth-_1c("left")-_1c("right")-separator.outerWidth(true);
var _1d=_15.height=="auto"?_18.outerHeight():(tb.height()-_1c("top")-_1c("bottom"));
_19.css(_15.iconAlign,_1c(_15.iconAlign)+"px");
_19.css("top",_1c("top")+"px");
_1a.css({width:_15.iconWidth+"px",height:_1d+"px"});
_18.css({paddingLeft:(_12.style.paddingLeft||""),paddingRight:(_12.style.paddingRight||""),marginLeft:0,marginRight:0,marginTop:_1c("top"),marginBottom:_1c("bottom")});
_18.first().css({marginLeft:_1e("left"),marginRight:0});
_18.last().css({marginLeft:0,marginRight:_1e("right")});
_18.css({paddingTop:0,paddingBottom:0,height:_1d+"px",lineHeight:_1d+"px"});
separator.css({paddingTop:0,paddingBottom:0,height:_1d+"px",lineHeight:_1d+"px"});
_18._outerWidth(_1b/2);
_15.onResizing.call(_12,_15.width,_15.height);
if(!_17){
tb.insertAfter(_12);
}
_15.onResize.call(_12,_15.width,_15.height);
function _1e(_1f){
return (_15.iconAlign==_1f?_19._outerWidth():0)+_1c(_1f);
};
function _1c(_20){
var w=0;
btn.filter(".textbox-button-"+_20).each(function(){
if(_20=="left"||_20=="right"){
w+=$(this).outerWidth();
}else{
w+=$(this).outerHeight();
}
});
return w;
};
};
function _c(_21){
var _22=$(_21).doubletextbox("options");
var _23=$(_21).doubletextbox("doubletextbox");
var _23o=$.extend({},_22,{deltaX:function(_24){
return $(_21).doubletextbox("getTipX",_24);
},deltaY:function(_25){
return $(_21).doubletextbox("getTipY",_25);
},onBeforeValidate:function(){
_22.onBeforeValidate.call(_21);
var box=$(this);
if(!box.is(":focus")){
var i = box.index(".textbox-text");
if(i==1){
if(box.val()!==_22.valueEnd){
_22.oldInputValueEnd=box.val();
box.val(_22.valueEnd);
}
}else{
if(box.val()!==_22.valueBegin){
_22.oldInputValueBegin=box.val();
box.val(_22.valueBegin);
}
}
}
},onValidate:function(_26){
var box=$(this);
var i = box.index(".textbox-text");
if(i==1){
if(_22.oldInputValueEnd!=undefined){
box.val(_22.oldInputValueEnd);
_22.oldInputValueEnd=undefined;
}
}else{
if(_22.oldInputValueBegin!=undefined){
box.val(_22.oldInputValueBegin);
_22.oldInputValueBegin=undefined;
}
}
var tb=box.parent();
if(_26){
tb.removeClass("textbox-invalid");
}else{
tb.addClass("textbox-invalid");
}
console.info("onValidate...");
_22.onValidate.call(_21,_26);
},err:function(target, message, action){},
val:function(t){
return $(t).val();
}});
_23.first().validatebox($.extend({},_23o,{value:$(_21).doubletextbox("getTextBegin")}));
_23.last().validatebox($.extend({},_23o,{value:$(_21).doubletextbox("getTextEnd")}));
};
function _27(_28){
var _29=$.data(_28,"doubletextbox");
var _2a=_29.options;
var tb=_29.doubletextbox;
var _2b=tb.find(".textbox-text");
_2b.first().attr("placeholder",_2a.promptBegin);
_2b.last().attr("placeholder",_2a.promptEnd);
_2b.unbind(".textbox");
$(_29.label).unbind(".textbox");
if(!_2a.disabled&&!_2a.readonly){
if(_29.label){
$(_29.label).bind("click.textbox",function(e){
if(!_2a.hasFocusMe){
_2b.focus();
$(_28).doubletextbox("setSelectionRange",{start:0,end:_2b.val().length});
}
});
}
_2b.bind("blur.textbox",function(e){
if(!tb.hasClass("textbox-focused")){
return;
}
var i = $(e.target).index(".textbox-text");
if(i==1){
_2a.valueEnd=$(this).val();
if(_2a.valueEnd==""){
$(this).val(_2a.promptEnd).addClass("textbox-prompt");
}else{
$(this).removeClass("textbox-prompt");
}
}else{
_2a.valueBegin=$(this).val();
if(_2a.valueBegin==""){
$(this).val(_2a.promptBegin).addClass("textbox-prompt");
}else{
$(this).removeClass("textbox-prompt");
}
}
tb.removeClass("textbox-focused");
console.info("validate-blur");
}).bind("focus.textbox",function(e){
_2a.hasFocusMe=true;
if(tb.hasClass("textbox-focused")){
return;
}
var i = $(e.target).index(".textbox-text");
if(i==1){
_2a.valueEnd=$(this).val();
if(_2a.valueEnd==""){
$(this).val(_2a.promptEnd).addClass("textbox-prompt");
}else{
$(this).removeClass("textbox-prompt");
}
}else{
_2a.valueBegin=$(this).val();
if(_2a.valueBegin==""){
$(this).val(_2a.promptBegin).addClass("textbox-prompt");
}else{
$(this).removeClass("textbox-prompt");
}
}
$(this).removeClass("textbox-prompt");
tb.addClass("textbox-focused");
console.info("validate-focused");
});
for(var _2c in _2a.inputEvents){
_2b.bind(_2c+".textbox",{target:_28},_2a.inputEvents[_2c]);
}
}
var _2d=tb.find(".textbox-addon");
_2d.unbind().bind("click",{target:_28},function(e){
var _2e=$(e.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");
if(_2e.length){
var _2f=parseInt(_2e.attr("icon-index"));
var _30=_2a.icons[_2f];
if(_30&&_30.handler){
_30.handler.call(_2e[0],e);
}
_2a.onClickIcon.call(_28,_2f);
}
});
_2d.find(".textbox-icon").each(function(_31){
var _32=_2a.icons[_31];
var _33=$(this);
if(!_32||_32.disabled||_2a.disabled||_2a.readonly){
_33.addClass("textbox-icon-disabled");
}else{
_33.removeClass("textbox-icon-disabled");
}
});
var btn=tb.find(".textbox-button");
btn.linkbutton((_2a.disabled||_2a.readonly)?"disable":"enable");
tb.unbind(".textbox").bind("_resize.textbox",function(e,_34){
if($(this).hasClass("easyui-fluid")||_34){
_11(_28);
}
return false;
});
};
function _d(_35,_36){
var _37=$.data(_35,"doubletextbox");
var _38=_37.options;
var tb=_37.doubletextbox;
var _39=tb.find(".textbox-text");
var ss=$(_35).add(tb.find(".textbox-value"));
_38.disabled=_36;
if(_38.disabled){
_39.blur();
_39.validatebox("disable");
tb.addClass("textbox-disabled");
ss.attr("disabled","disabled");
$(_37.label).addClass("textbox-label-disabled");
}else{
_39.validatebox("enable");
tb.removeClass("textbox-disabled");
ss.removeAttr("disabled");
$(_37.label).removeClass("textbox-label-disabled");
}
};
function _e(_3a,_3b){
var _3c=$.data(_3a,"doubletextbox");
var _3d=_3c.options;
var tb=_3c.doubletextbox;
var _3e=tb.find(".textbox-text");
_3d.readonly=_3b==undefined?true:_3b;
if(_3d.readonly){
_3e.triggerHandler("blur.textbox");
}
_3e.validatebox("readonly",_3d.readonly);
tb.removeClass("textbox-readonly").addClass(_3d.readonly?"textbox-readonly":"");
};
function _8f(_9a){
var _9b=$.data(_9a,"doubletextbox");
var tb=_9b.doubletextbox;
var _3d=tb.find(".textbox-text:eq(0)");
var _3e=tb.find(".textbox-text:eq(1)");
return _3d.validatebox("validate") && _3e.validatebox("validate");
}
$.fn.doubletextbox=function(_3f,_40){
if(typeof _3f=="string"){
var _41=$.fn.doubletextbox.methods[_3f];
if(_41){
return _41(this,_40);
}else{
return this.each(function(){
var _42=$(this).doubletextbox("doubletextbox");
_42.validatebox(_3f,_40);
});
}
}
_3f=_3f||{};
return this.each(function(){
var _43=$.data(this,"doubletextbox");
if(_43){
$.extend(_43.options,_3f);
if(_43.options.valueBegin!=undefined){
_43.options.originalValueBegin=_43.options.valueBegin;
}
if(_43.options.valueEnd!=undefined){
_43.options.originalValueEnd=_43.options.valueEnd;
}
}else{
var _4h = $.extend({},$.fn.doubletextbox.defaults,$.fn.doubletextbox.parseOptions(this),_3f);
_43=$.data(this,"doubletextbox",{options:_4h,doubletextbox:_2(this,_4h.separator)});
_43.options.originalValue=_43.options.value;
if(_43.options.value){
var _4v=_43.options.value.split(_43.options.separator);
if(_4v.length){
_43.options.originalValueBegin=_4v[0];
_43.options.originalValueEnd=_4v.length>1?_4v[1]:_4v[0];
_43.options.valueBegin=_4v[0];
_43.options.valueEnd=_4v.length>1?_4v[1]:_4v[0];
}
}
}
_6(this);
_27(this);
if(_43.options.doSize){
_11(this);
}
var _44b=_43.options.valueBegin;
var _44e=_43.options.valueEnd;
_43.options.valueBegin="";
_43.options.valueEnd="";
$(this).doubletextbox("initValue",[_44b,_44e]);
});
};
$.fn.doubletextbox.methods={options:function(jq){
return $.data(jq[0],"doubletextbox").options;
},doubletextbox:function(jq){
return $.data(jq[0],"doubletextbox").doubletextbox.find(".textbox-text");
},textboxbegin:function(jq){
return $.data(jq[0],"doubletextbox").doubletextbox.find(".textbox-text:eq(0)");
},textboxend:function(jq){
return $.data(jq[0],"doubletextbox").doubletextbox.find(".textbox-text:eq(1)");
},button:function(jq){
return $.data(jq[0],"doubletextbox").doubletextbox.find(".textbox-button");
},label:function(jq){
return $.data(jq[0],"doubletextbox").label;
},destroy:function(jq){
return jq.each(function(){
_f(this);
});
},resize:function(jq,_4c){
return jq.each(function(){
_11(this,_4c);
});
},disable:function(jq){
return jq.each(function(){
_d(this,true);
_27(this);
});
},enable:function(jq){
return jq.each(function(){
_d(this,false);
_27(this);
});
},readonly:function(jq,_4d){
return jq.each(function(){
_e(this,_4d);
_27(this);
});
},isValid:function(jq){
return jq.doubletextbox("textboxbegin").validatebox("isValid");
},clear:function(jq){
return jq.each(function(){
$(this).doubletextbox("setValue","");
});
},setTextBegin:function(jq,_4e){
return jq.each(function(){
var _4f=$(this).doubletextbox("options");
var _50=$(this).doubletextbox("textboxbegin");
_4e=_4e==undefined?"":String(_4e);
if($(this).doubletextbox("getTextBegin")!=_4e){
_50.val(_4e);
}
_4f.valueBegin=_4e;
if(!_50.is(":focus")){
if(_4e){
_50.removeClass("textbox-prompt");
}else{
_50.val(_4f.promptBegin).addClass("textbox-prompt");
}
}
$(this).doubletextbox("validate");
});
},setTextEnd:function(jq,_7e){
return jq.each(function(){
var _7f=$(this).doubletextbox("options");
var _71=$(this).doubletextbox("textboxend");
_7e=_7e==undefined?"":String(_7e);
if($(this).doubletextbox("getTextEnd")!=_7e){
_71.val(_7e);
}
_7f.valueEnd=_7e;
if(!_71.is(":focus")){
if(_7e){
_71.removeClass("textbox-prompt");
}else{
_71.val(_7f.promptEnd).addClass("textbox-prompt");
}
}
$(this).doubletextbox("validate");
});
},initValue:function(jq,_51){
return jq.each(function(){
var _52=$.data(this,"doubletextbox");
var _51b="";
var _51e="";
if(!$.isArray(_51)){
_51 = _51.split(_52.options.separator);
}
if(_51.length){
_51b=_51[0];
_51e=_51.length>1?_51[1]:_51[0];
}
$(this).doubletextbox("setTextBegin",_51b);
$(this).doubletextbox("setTextEnd",_51e);
_52.doubletextbox.find(".textbox-value:eq(0)").val(_51b);
_52.doubletextbox.find(".textbox-value:eq(1)").val(_51e);
$(this).val(_51b+_52.options.separator+_51e);
});
},setValues:function(jq,_53){
return jq.each(function(){
var _54=$.data(this,"doubletextbox").options;
var _55=$(this).doubletextbox("getValueBegin");
var _55e=$(this).doubletextbox("getValueEnd");
$(this).doubletextbox("initValue",_53);
var _55f=$(this).doubletextbox("getValueBegin");
var _55ef=$(this).doubletextbox("getValueEnd");
if(_55f!=_55 || _55e!=_55ef){
_54.onChange.call(this,_53,[_55,_55e],"begin");
$(this).closest("form").trigger("_change",[this]);
}
});
},setValueBegin:function(jq,_53){
return jq.each(function(){
var _54=$.data(this,"doubletextbox").options;
var _55=$(this).doubletextbox("getValueBegin");
var _55e=$(this).doubletextbox("getValueEnd");
$(this).doubletextbox("initValue",[_53,_55e]);
if(_55!=_53){
_54.onChange.call(this,_53,_55,"begin");
$(this).closest("form").trigger("_change",[this]);
}
});
},setValueEnd:function(jq,_53){
return jq.each(function(){
var _54=$.data(this,"doubletextbox").options;
var _55b=$(this).doubletextbox("getValueBegin");
var _55=$(this).doubletextbox("getValueEnd");
$(this).doubletextbox("initValue",[_55b,_53]);
if(_55!=_53){
_54.onChange.call(this,_53,_55,"end");
$(this).closest("form").trigger("_change",[this]);
}
});
},getTextBegin:function(jq){
var _56=jq.doubletextbox("textboxbegin");
if(_56.is(":focus")){
return _56.val();
}else{
return jq.doubletextbox("options").valueBegin;
}
},getTextEnd:function(jq){
var _56=jq.doubletextbox("textboxend");
if(_56.is(":focus")){
return _56.val();
}else{
return jq.doubletextbox("options").valueEnd;
}
},getValueBegin:function(jq){
return jq.data("doubletextbox").doubletextbox.find(".textbox-value:eq(0)").val();
},getValueEnd:function(jq){
return jq.data("doubletextbox").doubletextbox.find(".textbox-value:eq(1)").val();
},reset:function(jq){
return jq.each(function(){
var _57=$(this).doubletextbox("options");
$(this).doubletextbox("setValueBegin",_57.originalValueBegin);
$(this).doubletextbox("setValueEnd",_57.originalValueEnd);
});
},getIcon:function(jq,_58){
return jq.data("doubletextbox").doubletextbox.find(".textbox-icon:eq("+_58+")");
},getTipX:function(jq,_59){
var _5a=jq.data("doubletextbox");
var _5b=_5a.options;
var tb=_5a.doubletextbox;
var _5c=tb.find(".textbox-text");
var _59=_59||_5b.tipPosition;
var p1=tb.offset();
var p2=_5c.offset();
var w1=tb.outerWidth();
var w2=_5c.outerWidth();
if(_59=="right"){
return w1-w2-p2.left+p1.left;
}else{
if(_59=="left"){
return p1.left-p2.left;
}else{
return (w1-w2-p2.left+p1.left)/2-(p2.left-p1.left)/2;
}
}
},getTipY:function(jq,_5d){
var _5e=jq.data("doubletextbox");
var _5f=_5e.options;
var tb=_5e.doubletextbox;
var _60=tb.find(".textbox-text");
var _5d=_5d||_5f.tipPosition;
var p1=tb.offset();
var p2=_60.offset();
var h1=tb.outerHeight();
var h2=_60.outerHeight();
if(_5d=="left"||_5d=="right"){
return (h1-h2-p2.top+p1.top)/2-(p2.top-p1.top)/2;
}else{
if(_5d=="bottom"){
return (h1-h2-p2.top+p1.top);
}else{
return (p1.top-p2.top);
}
}
},getSelectionStart:function(jq,i){
return jq.doubletextbox("getSelectionRange",i).start;
},getSelectionRange:function(jq,i){
var _61=jq.doubletextbox("doubletextbox")[i==1?1:0];
var _62=0;
var end=0;
if(typeof _61.selectionStart=="number"){
_62=_61.selectionStart;
end=_61.selectionEnd;
}else{
if(_61.createTextRange){
var s=document.selection.createRange();
var _63=_61.createTextRange();
_63.setEndPoint("EndToStart",s);
_62=_63.text.length;
end=_62+s.text.length;
}
}
return {start:_62,end:end};
},setSelectionRange:function(jq,_64,i){
return jq.each(function(){
var _65=$(this).doubletextbox("doubletextbox")[i==1?1:0];
var _66=_64.start;
var end=_64.end;
if(_65.setSelectionRange){
_65.setSelectionRange(_66,end);
}else{
if(_65.createTextRange){
var _67=_65.createTextRange();
_67.collapse();
_67.moveEnd("character",end);
_67.moveStart("character",_66);
_67.select();
}
}
});
},validate:function(jq){
return jq.each(function(){
_8f(this);
});
},isValid:function(jq){
return _8f(jq[0]);
}};
$.fn.doubletextbox.parseOptions=function(_68){
var t=$(_68);
return $.extend({},$.fn.validatebox.parseOptions(_68),$.parser.parseOptions(_68,["valueBegin","valueEnd","originalValueBegin","originalValueEnd","promptBegin","promptEnd","suffix","separator","name2","prompt","iconCls","iconAlign","buttonText","buttonIcon","buttonAlign","label","labelPosition","labelAlign",{multiline:"boolean",iconWidth:"number",labelWidth:"number"}]),{value:(t.val()||undefined),type:(t.attr("type")?t.attr("type"):undefined),name2:(t.attr("name2")?t.attr("name2"):undefined)});
};
$.fn.doubletextbox.defaults=$.extend({},$.fn.validatebox.defaults,{valueBegin:"",valueEnd:"",suffix:"2",separator:"--",name2:"",doSize:true,width:"auto",height:"auto",cls:null,prompt:"",value:"",type:"text",icons:[],iconCls:null,iconAlign:"right",iconWidth:18,buttonText:"",buttonIcon:null,buttonAlign:"right",label:null,labelWidth:"auto",labelPosition:"before",labelAlign:"left",inputEvents:{blur:function(e){
var t=$(e.data.target);
var _69=t.doubletextbox("options");
if(t.doubletextbox("getValueBegin")!=_69.valueBegin){
t.doubletextbox("setValueBegin",_69.valueBegin);
}
if(t.doubletextbox("getValueEnd")!=_69.valueEnd){
t.doubletextbox("setValueEnd",_69.valueEnd);
}
},keydown:function(e){
if(e.keyCode==13){
var t=$(e.data.target);
var _69=t.doubletextbox("options");
if(t.doubletextbox("getValueBegin")!=_69.valueBegin){
t.doubletextbox("setValueBegin",_69.valueBegin);
}
if(t.doubletextbox("getValueEnd")!=_69.valueEnd){
t.doubletextbox("setValueEnd",_69.valueEnd);
}
}
}},onChange:function(_6a,_6b,_6g){
},onResizing:function(_6c,_6d){
},onResize:function(_6e,_6f){
},onClickButton:function(){
},onClickIcon:function(_70){
}},{originalValueBegin:"",originalValueEnd:"",promptBegin:"",promptEnd:"",val:function(_80){
var _8a = $(_80).closest(".textbox").prev();
var _81 = $(_8a).find(".textbox-value:eq(0)").val();
var _82 = $(_8a).find(".textbox-value:eq(1)").val();
if(_81 && _82){
return _81+_82;
}
if(_81){
return _81;
}
if(_82){
return _82;
}
return "";
}});
})(jQuery);