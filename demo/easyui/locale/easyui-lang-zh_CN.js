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
			m.css({position:"absolute",margin:0,padding:0});
			if(opts.labelPosition=="before"){
				var textspan = t.closest(".textbox");
				var textf= t.parent();
				var textLabel = textspan.siblings(".textbox-label");
				var wd = textspan.outerWidth(true)+textLabel.outerWidth(true);
				if(wd<=textf.innerWidth()){
					m.width(textspan.outerWidth(true));
					m.css({"marginLeft":textLabel.outerWidth(true)});
				}
			}else{
				m.width(opts.width);
			}

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

if ($.fn.datebox){
	$.fn.datebox.defaults.buttons = [{text:function(_30){
		return $(_30).datebox("options").okText;
	},handler:function(_31){
		var _1b=$.data(_31,"datebox");
		var _1c=_1b.options;
		var _1d=_1b.calendar.calendar("options").current;
		if(_1d){
			var _1f = _1c.formatter.call(_31,_1d);
			$(_31).combo("setText",_1f).combo("setValue",_1f);
			$(_31).combo("hidePanel");
		}
	}},{text:function(_32){
		return $(_32).datebox("options").closeText;
	},handler:function(_33){
		$(this).closest("div.combo-panel").panel("close");
	}}]
}

if ($.fn.doubledatebox){
	$.fn.doubledatebox.defaults.currentText = '今天';
	$.fn.doubledatebox.defaults.closeText = '取消';
	$.fn.doubledatebox.defaults.okText = '确定';
	$.fn.doubledatebox.defaults.beginText = '开始日期:';
	$.fn.doubledatebox.defaults.endText = '结束日期:';
	$.fn.doubledatebox.defaults.missingMessage = '该输入项为必输项';
	$.fn.doubledatebox.defaults.formatter = function(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
	};
	$.fn.doubledatebox.defaults.parser = function(s){
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
	$.fn.doubledatebox.defaults.showFormatter=function(_34){
		var y=_34.getFullYear();
		var m=_34.getMonth()+1;
		var d=_34.getDate();
		return y+"年"+m+"月"+d+"日";
	}

	$.fn.doubledatebox.defaults.err=function(target,message,action){

		var t = $(target);
		var idx= t.index(".textbox-text");
		var tb=$(target).closest(".textbox").prev()[0];
		var doubleText = $.data(tb,"doubledatebox");
		var opts = doubleText.options;
		if(opts.required && !isEmpty(message)){
			var value1=$(tb).doubledatebox("getValueBegin");
			var value2=$(tb).doubledatebox("getValueEnd");
			if(idx==1 && !isEmpty(value1) && isEmpty(value2)){
				message="结束日期为必输项";
			}else if(idx==1 && isEmpty(value1) && !isEmpty(value2)){
				message="开始日期为必输项";
			}else{
				message="开始日期,结束日期为必输项";
			}
		}

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
		m.css({position:"absolute",margin:0,padding:0});
		if(opts.labelPosition=="before"){
			var textspan = t.closest(".textbox");
			var textf= t.parent();
			var textLabel = textspan.siblings(".textbox-label");
			var wd = textspan.outerWidth(true)+textLabel.outerWidth(true);
			if(wd<=textf.innerWidth()){
				m.width(textspan.outerWidth(true));
				m.css({"marginLeft":textLabel.outerWidth(true)});
			}
		}else{
			m.width(opts.width);
		}

		if(action=="show"){
			m.html(message);
		}else{
			m.html(opts.prompt);
		}
		function isEmpty(str){
			return str==undefined || str==null || str.length==0;
		}
	}

	$.fn.doubledatebox.defaults.topButtons=[
		{text:"今天",handler:function(target){
			var d = new DateBoxUtil().today();
			$(target).doubledatebox("setValues",[d,d]);
			$(target).doubledatebox("hidePanel");

		}},{text:"昨天",handler:function(target){
			var d = new DateBoxUtil().today(-1);
			$(target).doubledatebox("setValues",[d,d]);
			$(target).doubledatebox("hidePanel");

		}},{text:"本周",handler:function(target){
			$(target).doubledatebox("setValues",new DateBoxUtil().thisWeek());
			$(target).doubledatebox("hidePanel");

		}},{text:"上周",handler:function(target){
			$(target).doubledatebox("setValues",new DateBoxUtil().thisWeek(-1));
			$(target).doubledatebox("hidePanel");

		}},{text:"本月",handler:function(target){
			$(target).doubledatebox("setValues",new DateBoxUtil().thisMonth());
			$(target).doubledatebox("hidePanel");

		}},{text:"上月",handler:function(target){
			$(target).doubledatebox("setValues",new DateBoxUtil().thisMonth(-1));
			$(target).doubledatebox("hidePanel");

		}},{text:"今年",handler:function(target){
			$(target).doubledatebox("setValues",new DateBoxUtil().thisYear());
			$(target).doubledatebox("hidePanel");

		}},{text:"去年",handler:function(target){
			$(target).doubledatebox("setValues",new DateBoxUtil().thisYear(-1));
			$(target).doubledatebox("hidePanel");

		}}];
}

var DateBoxUtil = function(){
	/**
	 *  格式化 yyyy-MM-dd
	 * @param dd
	 * @returns {string}
	 */
	this.parseDateStr=function(dd){
		var y = dd.getFullYear();
		var m = dd.getMonth()+1;
		var d = dd.getDate();
		return y+"-"+(m<10?("0"+m):m)+"-"+(d<10?("0"+d):d);
	}
	/**
	 * 日期计算
	 * 不影响原日期数据
	 * @param date
	 * @param addYear
	 * @param addMonth
	 * @param addDate
	 * @returns {Date}
	 */
	this.parseDate=function(date,addYear,addMonth,addDate) {
		var dd = new Date();
		dd.setTime(date.getTime());
		if($.isNumeric(addYear)) {
			dd.setFullYear(dd.getFullYear()+addYear);
		}
		if($.isNumeric(addMonth)) {
			dd.setMonth(dd.getMonth()+addMonth);
		}
		if($.isNumeric(addDate)) {
			dd.setDate(dd.getDate()+addDate);
		}
		return dd;
	}

	/**
	 * 今日 向前向后计算
	 * @param addDate
	 * @returns {string}
	 */
	this.today=function(addDate){
		var dd = this.parseDate(new Date(),0,0,addDate);
		return this.parseDateStr(dd);
	}
	/**
	 * 本周
	 * @param addWeek
	 * @returns {*[]}
	 */
	this.thisWeek=function(addWeek){
		if(!$.isNumeric(addWeek)) addWeek=0;
		var dd = new Date();
		var day = dd.getDay() + addWeek*-7;
		var weekFirst = this.parseDate(dd,0,0,-day);
		var weekLast = this.parseDate(weekFirst,0,0,6);
		return [this.parseDateStr(weekFirst),this.parseDateStr(weekLast)];
	}
	/**
	 *  本月
	 * @param addMonth
	 * @returns {*[]}
	 */
	this.thisMonth=function(addMonth){
		if(!$.isNumeric(addMonth)) addMonth=0;
		var dd = this.parseDate(new Date(),0,addMonth,0);
		var day = dd.getDate()-1;
		var monthFist = this.parseDate(dd,0,0,-day);
		var nextMonthFirst = this.parseDate(monthFist,0,1,0);
		var monthLast = this.parseDate(nextMonthFirst,0,0,-1);
		return [this.parseDateStr(monthFist),this.parseDateStr(monthLast)];
	}


	/**
	 * 本年
	 * @param addYear
	 * @returns {*[]}
	 */
	this.thisYear=function(addYear){
		var dd = this.parseDate(new Date(),addYear);
		var yearFirst = this.parseDate(dd);
		yearFirst.setMonth(0);
		yearFirst.setDate(1);
		var yearLast=this.parseDate(dd);
		yearLast.setMonth(11);
		yearLast.setDate(31);
		return [this.parseDateStr(yearFirst),this.parseDateStr(yearLast)];
	}
}