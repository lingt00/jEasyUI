if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '第';
	$.fn.pagination.defaults.afterPageText = '共{pages}页';
	$.fn.pagination.defaults.displayMsg = '显示{from}到{to},共{total}记录';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '正在处理，请稍待。。。';
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = '确定';
	$.messager.defaults.cancel = '取消';
}
$.map(['validatebox','textbox','passwordbox','filebox','searchbox',
		'combo','combobox','combogrid','combotree',
		'datebox','datetimebox','numberbox',
		'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
	if ($.fn[plugin]){
		$.fn[plugin].defaults.missingMessage = '该输入项为必输项';
	}
});
if ($.fn.validatebox){
	$.fn.validatebox.defaults.rules.email.message = '请输入有效的电子邮件地址';
	$.fn.validatebox.defaults.rules.url.message = '请输入有效的URL地址';
	$.fn.validatebox.defaults.rules.length.message = '输入内容长度必须介于{0}和{1}之间';
	$.fn.validatebox.defaults.rules.remote.message = '请修正该字段';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['日','一','二','三','四','五','六'];
	$.fn.calendar.defaults.months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '今天';
	$.fn.datebox.defaults.closeText = '关闭';
	$.fn.datebox.defaults.okText = '确定';
	$.fn.datebox.defaults.formatter = function(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
	};
	$.fn.datebox.defaults.parser = function(s){
		if (!s) return new Date();
		var ss = s.split('-');
		var y = parseInt(ss[0],10);
		var m = parseInt(ss[1],10);
		var d = parseInt(ss[2],10);
		if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
			return new Date(y,m-1,d);
		} else {
			return new Date();
		}
	};
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText
	});
}
if ($.fn.datetimespinner){
	$.fn.datetimespinner.defaults.selections = [[0,4],[5,7],[8,10],[11,13],[14,16],[17,19]]
}

/*bug 修复自定义*/
$.map(['validatebox','textbox','passwordbox','filebox','searchbox',
	'combo','combobox','combogrid','combotree','tagbox',"taggridbox",
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

$.map(['tagbox',"taggridbox"], function(plugin){
	if ($.fn[plugin]){
		$.extend($.fn[plugin].defaults,{val:function(target){
			var t = $(target);
			var p = $(target);
			if (t.hasClass('textbox-text')){
				p =  t.parent() ;
				t = p.prev()[0];
			}
			var opts = $.data(t,plugin).options;
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