/**
 * jQuery EasyUI 1.5.1
 * 
 * Copyright (c) 2009-2016 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: http://www.jeasyui.com/license_freeware.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"taggridbox");
var _4=_3.options;
$(_2).addClass("tagbox-f").combogrid($.extend({},_4,{cls:"tagbox",reversed:true,onChange:function(_5,_6){
_7();
$(this).combogrid("hidePanel");
_4.onChange.call(_2,_5,_6);
},onClickRow:function(i,row){
_7();
_4.onClickRow(this,i,row);
},onResizing:function(_8,_9){
var _a=$(this).combogrid("textbox");
var tb=$(this).data("textbox").textbox;
tb.css({height:"",paddingLeft:_a.css("marginLeft"),paddingRight:_a.css("marginRight")});
_a.css("margin",0);
tb._size({width:_4.width},$(this).parent());
_23(_2);
_12(this);
_4.onResizing.call(_2,_8,_9);
},onLoadSuccess:function(_b){
_7();
_4.onLoadSuccess.call(_2,_b);
}}));
_7();
_23(_2);
function _7(){
$(_2).next().find(".tagbox-label").remove();
var _c=$(_2).taggridbox("textbox");
var opts=$(_2).taggridbox("options");
$.map($(_2).taggridbox("getValues"),function(_d,_e){
if(_4.multiple || ($.trim(_d)!=null && $.trim(_d)!="")){
var grid = $(_2).taggridbox("grid");
var _f = $.easyui.getArrayItem(grid.datagrid("getRows"),opts.idField,_d);
var _10=_4.tagFormatter.call(_2,_d,_f);
var cs={};
var css=_4.tagStyler.call(_2,_d,_f)||"";
if(typeof css=="string"){
cs={s:css};
}else{
cs={c:css["class"]||"",s:css["style"]||""};
}
var _11=$("<span class=\"tagbox-label\"></span>").insertBefore(_c).html(_10);
_11.attr("tagbox-index",_e);
_11.attr("style",cs.s).addClass(cs.c);
$("<a href=\"javascript:;\" class=\"tagbox-remove\"></a>").appendTo(_11);
}
});
_12(_2);
$(_2).taggridbox("setText","");
};
};
function _12(_13,_14){
/*reset input-text size start*/
var opts=$(_13).taggridbox("options");
var tbt=$(_13).taggridbox("textbox");
var tb=tbt.closest(".textbox");
var w=0;
tb.find(".tagbox-label").each(function(i,dom){
w+=$(dom).outerWidth(true);
});
if(tb.width()-w>20){
var pw=tbt.outerWidth(true)-tbt.width();
tbt.width(tb.width()-w-pw);
}else{
tbt.width("auto");
}
/*reset input-text size end*/
var _15=$(_13).next();
var _16=_14?$(_14):_15.find(".tagbox-label");
if(_16.length){
var _17=$(_13).taggridbox("textbox");
var _18=$(_16[0]);
var _19=_18.outerHeight(true)-_18.outerHeight();
var _1a=_17.outerHeight()-_19*2;
_16.css({height:_1a+"px",lineHeight:_1a+"px"});
var _1b=_15.find(".textbox-addon").css("height","100%");
_1b.find(".textbox-icon").css("height","100%");
_15.find(".textbox-button").linkbutton("resize",{height:"100%"});
}
};
function _1c(_1d){
var _1e=$(_1d).next();
_1e.unbind(".tagbox").bind("click.tagbox",function(e){
var _1f=$(_1d).taggridbox("options");
if(_1f.disabled||_1f.readonly){
return;
}
if($(e.target).hasClass("tagbox-remove")){
var _20=parseInt($(e.target).parent().attr("tagbox-index"));
var _21=$(_1d).taggridbox("getValues");
if(_1f.onBeforeRemoveTag.call(_1d,_21[_20])==false){
return;
}
_1f.onRemoveTag.call(_1d,_21[_20]);
_21.splice(_20,1);
$(_1d).taggridbox("setValues",_21);
if(!_1f.multiple && !_1f.editable){
$(_1d).taggridbox("validate");
}
}else{
var _22=$(e.target).closest(".tagbox-label");
if(_22.length){
var _20=parseInt(_22.attr("tagbox-index"));
var _21=$(_1d).taggridbox("getValues");
_1f.onClickTag.call(_1d,_21[_20]);
}
}
$(this).find(".textbox-text").focus();
}).bind("keyup.tagbox",function(e){
_23(_1d);
}).bind("mouseover.tagbox",function(e){
if($(e.target).closest(".textbox-button,.textbox-addon,.tagbox-label").length){
$(this).triggerHandler("mouseleave");
}else{
$(this).find(".textbox-text").triggerHandler("mouseenter");
}
}).bind("mouseleave.tagbox",function(e){
$(this).find(".textbox-text").triggerHandler("mouseleave");
});
var opts=$(_1d).taggridbox("options");
if(opts.required && opts.validateOnCreate){
  $(_1d).taggridbox("validate");
}
};
function _23(_24){
var _25=$(_24).taggridbox("options");
var _26=$(_24).taggridbox("textbox");
var _27=$(_24).next();
var tmp=$("<span></span>").appendTo("body");
tmp.attr("style",_26.attr("style"));
tmp.css({position:"absolute",top:-9999,left:-9999,width:"auto",fontFamily:_26.css("fontFamily"),fontSize:_26.css("fontSize"),fontWeight:_26.css("fontWeight"),whiteSpace:"nowrap"});
var _28=_29(_26.val());
var _2a=_29(_25.prompt||"");
tmp.remove();
var _2b=Math.min(Math.max(_28,_2a)+20,_27.width());
_26._outerWidth(_2b);
_27.find(".textbox-button").linkbutton("resize",{height:"100%"});
function _29(val){
var s=val.replace(/&/g,"&amp;").replace(/\s/g," ").replace(/</g,"&lt;").replace(/>/g,"&gt;");
tmp.html(s);
return tmp.outerWidth();
};
};
function _33(_34,_35){
$(_34).taggridbox("setText","");
_23(_34);
$(_34).combogrid("setValues",_35);
$(_34).taggridbox("setText","");
};
function _46(_47,_48){
$(_47).combo("setText",_48);
}
$.fn.taggridbox=function(_36,_37){
if(typeof _36=="string"){
var _38=$.fn.taggridbox.methods[_36];
if(_38){
return _38(this,_37);
}else{
return this.combogrid(_36,_37);
}
}
_36=_36||{};
return this.each(function(){
var _39=$.data(this,"taggridbox");
if(_39){
$.extend(_39.options,_36);
}else{
$.data(this,"taggridbox",{options:$.extend({},$.fn.taggridbox.defaults,$.fn.taggridbox.parseOptions(this),_36)});
}
_1(this);
_1c(this);
});
};
$.fn.taggridbox.methods={options:function(jq){
var _3a=jq.combogrid("options");
return $.extend($.data(jq[0],"taggridbox").options,{width:_3a.width,height:_3a.height,originalValue:_3a.originalValue,disabled:_3a.disabled,readonly:_3a.readonly});
},setValues:function(jq,_3b){
return jq.each(function(){
_33(this,_3b);
});
},setText:function(jq,_3d){
return jq.each(function(){
_46(this,_3d);
});
}};
$.fn.taggridbox.parseOptions=function(_3c){
return $.extend({},$.fn.combogrid.parseOptions(_3c),$.parser.parseOptions(_3c,[]));
};
$.fn.taggridbox.defaults=$.extend({},$.fn.combogrid.defaults,{hasDownArrow:false,multiple:true,reversed:true,selectOnNavigation:false,tipOptions:$.extend({},$.fn.textbox.defaults.tipOptions,{showDelay:200}),tagFormatter:function(_40,row){
var _41=$(this).taggridbox("options");
return row?row[_41.textField]:_40;
},tagStyler:function(_42,row){
return "";
},onClickTag:function(_43){
},onBeforeRemoveTag:function(_44){
},onRemoveTag:function(_45){
},inputEvents:$.extend({},$.fn.combo.defaults.inputEvents,{blur:function(e){
var _58=e.data.target;
var _59=$(_58).combogrid("options");
if(_59.reversed){
 $(_58).taggridbox("setValues",$(_58).taggridbox("getValues"));
}
if(_59.required){
$(_58).taggridbox("validate");
}
}})});
})(jQuery);

