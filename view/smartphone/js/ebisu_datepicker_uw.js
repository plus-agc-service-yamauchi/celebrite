/*
 * えびすUW用にカスタマイズしたJQueryのUI Datepicker
 * 
 * Dependencies JQuery
 * Updated 2017.09.21
 */

eb$(function() {
	eb$.datepicker.setDefaults(eb$.extend(eb$.datepicker.regional['ja']));
});

var scrollPosition = 0;
function initDatePicker(idName, yearName, monthName, dayName, freeOptions) {
	
	var hyphenOrEmpty = "";
	if (_ebisu_root_url_nodomain.lastIndexOf("/") != _ebisu_root_url_nodomain.length - 1) {
		hyphenOrEmpty = "/";
	}
	
	var options = {
				showOn: 'button',
				showAnim: 'show',
				buttonImage: _ebisu_root_url_nodomain + hyphenOrEmpty + 'html/common/datepicker/calendar.gif',
				buttonImageOnly: true,
				constrainInput: false,
				dateFormat: 'yy/mm/dd',
				changeMonth: true,
				changeYear: true,
				yearRange: '-2:+3',
				buttonText: 'click!',
				showMonthAfterYear: true,
				showButtonPanel: true,
				onClose: function(dateText, inst) {
					eb$('body').css({'position':'static','top':0});
					eb$('#bg').remove();
					eb$(window).scrollTop(scrollPosition);
				}
	};
	
	eb$("#" + idName).datepicker(options);

	if (freeOptions !== null) {
		// freeOptions[オプション名][値]
		for (var i = 0; i < freeOptions[0].length; i++) {
			eb$("#" + idName).datepicker('option', freeOptions[i][0], freeOptions[i][1]);
		}
	}
	
	
	// 年月日指定のあるときはコールバックセットして、戻り値を年月日にして返す
	if (yearName !== null) {
		var ele = document.createElement('script');
		ele.type = "text/javascript";
		document.body.appendChild(ele);
		ele.text = 'function ' + datePickerCreateFuncName(yearName, monthName, dayName) + '(date) {' +
			'var ymd = datePickerGetFuncName(arguments.callee.toString());' +
			'document.getElementById(ymd[0]).value = date.substring(0, 4);' +
			'document.getElementById(ymd[1]).value = date.substring(5, 7);' +
			'document.getElementById(ymd[2]).value = date.substring(8, 10);' +
		'}';
		eb$("#" + idName).datepicker('option', 'onSelect', eval(datePickerCreateFuncName(yearName, monthName, dayName)));
	}

	// クリックイベントの定義
	eb$('.ui-datepicker-trigger').on('click', function() {
		var $bgIn = eb$('<div id="bg"></div>');
		eb$('body').prepend($bgIn);
		scrollPosition = eb$('body').scrollTop();
		eb$('#bg').css({'position':'fixed','width':'100%','top':'0px', 'z-index':1 });
		eb$('body').css({'position':'fixed','width':'100%','top':-scrollPosition});
		eb$('#ui-datepicker-div').css({'top':'100px'});
	});}

function datePickerCreateFuncName(year, month, day) {
	return year + '$' + month + '$' + day + 'Callback';
}

function datePickerGetFuncName(str) {
	var returnArray = new Array(3);
	var pos1 = str.indexOf(" ");
	if (pos1 !== -1) {
		pos2 = str.indexOf('Callback', pos1);
		if (pos2 !== -1) {
			var ymd = str.substring(pos1 + 1, pos2);
			var pos = ymd.indexOf('$');
			if (pos !== -1) {
				returnArray[0] = ymd.substring(0, pos);
				ymd = ymd.substring(pos + 1);
				pos = ymd.indexOf('$');
				if (pos !== -1) {
					returnArray[1] = ymd.substring(0, pos);
					returnArray[2] = ymd.substring(pos + 1);
				}
			}
		}
	}
	return returnArray;
}