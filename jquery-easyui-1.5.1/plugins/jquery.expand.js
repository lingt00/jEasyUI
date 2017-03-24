/**
 * Created by ling on 2017/3/21.
 */
$.map(['validatebox','textbox','passwordbox','filebox','searchbox',
    'combo','combobox','combogrid','combotree','tagbox',
    'datebox','datetimebox','numberbox',
    'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
    if ($.fn[plugin]){
        $.extend($.fn[plugin].defaults,{err:function(target, message, action){
            var opts = $(target).validatebox('options');
            message = message || opts.prompt;

            var t = $(target);
            if (t.hasClass('textbox-text')){
                t = t.parent();
            }
            var m = t.next('.error-message');
            if (!m.length){
                m = $('<div class="error-message"></div>').insertAfter(t);
            }
            if($(target).hasClass("validatebox-invalid")){
                action = "show";
                m.addClass("error-message-invalid");
            }else{
                m.removeClass("error-message-invalid");
            }
            m.width(opts.width);
            if(action=="show"){
                m.html(message);
            }else{
                m.html(opts.prompt);
            }
        }});
    }
});

$.map(['tagbox'], function(plugin){
    if ($.fn[plugin]){
        $.extend($.fn[plugin].defaults,{val:function(target){
            var t = $(target);
            var p = $(target);
            if (t.hasClass('textbox-text')){
                p =  t.parent() ;
                t = p.prev()[0];
            }
            var tag = $(t);
            var opts = tag.tagbox("options");
            if(opts.multiple){
                var values = [];
                //查询支持多选时，下拉已选中的值
                p.find(".textbox-value").each(function(){
                    values.push($(this).val());
                });
                //在未输入值时,下拉选中值为空 取输入文本框本身的值
                var value = values.join(values.join(opts.separator)) || $(target).val();
                return value;
            }else{
                var value = $(target).val();
                if(p.find(".textbox-value").length){
                    value = p.find(".textbox-value")[0].value;
                }
                if(value==null || value==""){
                    value = $(target).val();
                }
                return value;
            }
        }});
    }
});