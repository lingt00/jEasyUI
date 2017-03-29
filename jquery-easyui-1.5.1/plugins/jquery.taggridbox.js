/**
 * jQuery EasyUI 1.5.1
 * 
 * Copyright (c) 2009-2016 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: http://www.jeasyui.com/license_cfreeware.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
(function($){
function _c1(_c2){
var _c3=$.data(_c2,"taggridbox");
var _c4=_c3.options;
$(_c2).addClass("tagbox-f").combogrid($.extend({},_c4,{cls:"tagbox",reversed:true,onChange:function(_c5,_c6){
_c7();
$(this).combogrid("hidePanel");
_c4.onChange.call(_c2,_c5,_c6);
},onClickRow:function(i,row){
_c7();
_c4.onClickRow(this,i,row);
},onResizing:function(_c8,_c9){
var _ca=$(this).combogrid("textbox");
var tb=$(this).data("textbox").textbox;
tb.css({height:"",paddingLeft:_ca.css("marginLeft"),paddingRight:_ca.css("marginRight")});
_ca.css("margin",0);
tb._size({width:_c4.width},$(this).parent());
_c23(_c2);
_c12(this);
_c4.onResizing.call(_c2,_c8,_c9);
},onLoadSuccess:function(_cb){
_c7();
_c4.onLoadSuccess.call(_c2,_cb);
}}));
_c7();
_c23(_c2);
function _c7(){
$(_c2).next().find(".tagbox-label").remove();
var _cc=$(_c2).taggridbox("textbox");
var opts=$(_c2).taggridbox("options");
$.map($(_c2).taggridbox("getValues"),function(_cd,_ce){
if(_c4.multiple || ($.trim(_cd)!=null && $.trim(_cd)!="")){
var grid = $(_c2).taggridbox("grid");
var _cf = $.easyui.getArrayItem(grid.datagrid("getRows"),opts.idField,_cd);
var _c10=_c4.tagFormatter.call(_c2,_cd,_cf);
var cs={};
var css=_c4.tagStyler.call(_c2,_cd,_cf)||"";
if(typeof css=="string"){
cs={s:css};
}else{
cs={c:css["class"]||"",s:css["style"]||""};
}
var _c11=$("<span class=\"tagbox-label\"></span>").insertBefore(_cc).html(_c10);
_c11.attr("tagbox-index",_ce);
_c11.attr("style",cs.s).addClass(cs.c);
$("<a href=\"javascript:;\" class=\"tagbox-remove\"></a>").appendTo(_c11);
}
});
_c12(_c2);
$(_c2).taggridbox("setText","");
};
};
function _c12(_c13,_c14){
var tbt=$(_c13).taggridbox("textbox");
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
var _c15=$(_c13).next();
var _c16=_c14?$(_c14):_c15.find(".tagbox-label");
if(_c16.length){
var _c17=$(_c13).taggridbox("textbox");
var _c18=$(_c16[0]);
var _c19=_c18.outerHeight(true)-_c18.outerHeight();
var _c1a=_c17.outerHeight()-_c19*2;
_c16.css({height:_c1a+"px",lineHeight:_c1a+"px"});
var _c1b=_c15.find(".textbox-addon").css("height","100%");
_c1b.find(".textbox-icon").css("height","100%");
_c15.find(".textbox-button").linkbutton("resize",{height:"100%"});
}
};
function _c1c(_c1d){
var _c1e=$(_c1d).next();
_c1e.unbind(".tagbox").bind("click.tagbox",function(e){
var _c1f=$(_c1d).taggridbox("options");
if(_c1f.disabled||_c1f.readonly){
return;
}
if($(e.target).hasClass("tagbox-remove")){
var _c20=parseInt($(e.target).parent().attr("tagbox-index"));
var _c21=$(_c1d).taggridbox("getValues");
if(_c1f.onBeforeRemoveTag.call(_c1d,_c21[_c20])==false){
return;
}
_c1f.onRemoveTag.call(_c1d,_c21[_c20]);
_c21.splice(_c20,1);
$(_c1d).taggridbox("setValues",_c21);
if(!_c1f.multiple && !_c1f.editable){
$(_c1d).taggridbox("validate");
}
}else{
var _c22=$(e.target).closest(".tagbox-label");
if(_c22.length){
var _c20=parseInt(_c22.attr("tagbox-index"));
var _c21=$(_c1d).taggridbox("getValues");
_c1f.onClickTag.call(_c1d,_c21[_c20]);
}
}
$(this).find(".textbox-text").focus();
}).bind("keyup.tagbox",function(e){
_c23(_c1d);
}).bind("mouseover.tagbox",function(e){
if($(e.target).closest(".textbox-button,.textbox-addon,.tagbox-label").length){
$(this).triggerHandler("mouseleave");
}else{
$(this).find(".textbox-text").triggerHandler("mouseenter");
}
}).bind("mouseleave.tagbox",function(e){
$(this).find(".textbox-text").triggerHandler("mouseleave");
});
var opts=$(_c1d).taggridbox("options");
if(opts.required && opts.validateOnCreate){
  $(_c1d).taggridbox("validate");
}
};
function _c23(_c24){
var _c25=$(_c24).taggridbox("options");
var _c26=$(_c24).taggridbox("textbox");
var _c27=$(_c24).next();
var tmp=$("<span></span>").appendTo("body");
tmp.attr("style",_c26.attr("style"));
tmp.css({position:"absolute",top:-9999,left:-9999,width:"auto",fontFamily:_c26.css("fontFamily"),fontSize:_c26.css("fontSize"),fontWeight:_c26.css("fontWeight"),whiteSpace:"nowrap"});
var _c28=_c29(_c26.val());
var _c2a=_c29(_c25.prompt||"");
tmp.remove();
var _c2b=Math.min(Math.max(_c28,_c2a)+20,_c27.width());
_c26._outerWidth(_c2b);
_c27.find(".textbox-button").linkbutton("resize",{height:"100%"});
function _c29(val){
var s=val.replace(/&/g,"&amp;").replace(/\s/g," ").replace(/</g,"&lt;").replace(/>/g,"&gt;");
tmp.html(s);
return tmp.outerWidth();
};
};
function _c33(_c34,_c35){
$(_c34).taggridbox("setText","");
_c23(_c34);
$(_c34).combogrid("setValues",_c35);
$(_c34).taggridbox("setText","");
};
function _c46(_c47,_c48){
$(_c47).combo("setText",_c48);
}
$.fn.taggridbox=function(_c36,_c37){
if(typeof _c36=="string"){
var _c38=$.fn.taggridbox.methods[_c36];
if(_c38){
return _c38(this,_c37);
}else{
return this.combogrid(_c36,_c37);
}
}
_c36=_c36||{};
return this.each(function(){
var _c39=$.data(this,"taggridbox");
if(_c39){
$.extend(_c39.options,_c36);
}else{
$.data(this,"taggridbox",{options:$.extend({},$.fn.taggridbox.defaults,$.fn.taggridbox.parseOptions(this),_c36)});
}
_c1(this);
_c1c(this);
});
};
$.fn.taggridbox.methods={options:function(jq){
var _c3a=jq.combogrid("options");
return $.extend($.data(jq[0],"taggridbox").options,{width:_c3a.width,height:_c3a.height,originalValue:_c3a.originalValue,disabled:_c3a.disabled,readonly:_c3a.readonly});
},setValues:function(jq,_c3b){
return jq.each(function(){
_c33(this,_c3b);
});
},setText:function(jq,_c3d){
return jq.each(function(){
_c46(this,_c3d);
});
}};
$.fn.taggridbox.parseOptions=function(_c3c){
return $.extend({},$.fn.combogrid.parseOptions(_c3c),$.parser.parseOptions(_c3c,[]));
};
$.fn.taggridbox.defaults=$.extend({},$.fn.combogrid.defaults,{hasDownArrow:false,multiple:true,reversed:true,selectOnNavigation:false,tipOptions:$.extend({},$.fn.textbox.defaults.tipOptions,{showDelay:200}),tagFormatter:function(_c40,row){
var _c41=$(this).taggridbox("options");
return row?row[_c41.textField]:_c40;
},tagStyler:function(_c42,row){
return "";
},onClickTag:function(_c43){
},onBeforeRemoveTag:function(_c44){
},onRemoveTag:function(_c45){
},inputEvents:$.extend({},$.fn.combo.defaults.inputEvents,{blur:function(e){
var _c58=e.data.target;
var _c59=$(_c58).combogrid("options");
if(_c59.reversed){
 $(_c58).taggridbox("setValues",$(_c58).taggridbox("getValues"));
}
if(_c59.required){
$(_c58).taggridbox("validate");
}
}})});
})(jQuery);

