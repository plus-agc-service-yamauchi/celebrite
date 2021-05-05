// --------------ゼウストークン決済用jsから、UIの部分を再構成--------------
zeusTokenClass.prototype.initCardFormItems = function () {

	//hiddenタグ設定
	var html = "";
	html += '<input type="hidden" value="" id="zeus_token_value" name="zeus_token_value">';
	html += '<input type="hidden" value="" id="zeus_token_masked_card_no" name="zeus_token_masked_card_no">';
	html += '<input type="hidden" value="" id="zeus_token_return_card_expires_month" name="zeus_token_return_card_expires_month">';
	html += '<input type="hidden" value="" id="zeus_token_return_card_expires_year" name="zeus_token_return_card_expires_year">';
	html += '<input type="hidden" value="" id="zeus_token_masked_cvv" name="zeus_token_masked_cvv">';
	html += '<input type="hidden" value="" id="zeus_token_return_card_name" name="zeus_token_return_card_name">';
	html += '<input type="hidden" value="prev" id="zeus_token_action_type_quick" name="zeus_card_option">';	
	html += '<div id="zeus_registerd_card_area"><input type="hidden" value="" id="zeus_token_card_cvv_for_registerd_card" name="zeus_token_card_cvv_for_registerd_card" size="4" maxlength="5"></div>';	
	html += '<div id="zeus_new_card_area"></div>';
	eb$("#zeus_token_card_hidden_area").append(html);

	//カード有効期限(月)
	(function () {
		var option = "";
		for (var month = 1; month <= 12; month++) {
			var val = ("0" + month).slice(-2);
			option += "<option value="+ val +">"+ val +"</option>";
		}
		eb$("#zeus_token_card_expires_month").append(option);
	}());

	//カード有効期限(年)
	(function () {
		var option = "";
		var today = new Date();
  		for (var year = today.getFullYear(); year <= today.getFullYear() + 10; year++) {
			option += "<option value="+ year +">"+ year +"</option>";
		}
		eb$("#zeus_token_card_expires_year").append(option);
	}());

	// セキュリティコード(cvv)を使用するか判定
	var is_used_cvv_security_code = eb$("script[src='https://linkpt.cardservice.co.jp/api/token/1.0/zeus_token_cvv.js']").length;
	if (!is_used_cvv_security_code) {
		eb$("#zeus_token_card_cvv_area").remove();
	}

	// ゼウストークンjsで新しいカードのラジオボタンがデフォルトでcheckedになるため、
	// 登録カードはチェックを外す
	eb$('input[name=SAVED_CARD_VERI_TORIHIKI_ID]').attr('checked', false);

	//新規クレジットカードのラジオボタン領域を非表示にする
	eb$("#zeus_token_action_type_new_area").hide();
};

zeusTokenClass.prototype.disableRegisterdCardArea = function () {

};

// エラー文言は<head>に入れたjsより取得する
zeusTokenClass.prototype.getErrorMessage = function (error_code) {
	if (typeof this.zeusTokenItem["zeus_token_error_messages"] != "object") {
		return error_code + "An error has occurred.";
	}
	if (typeof this.zeusTokenItem["zeus_token_error_messages"][error_code] == null) {
		return error_code + "An error has occurred.";
	}
	if (typeof this.zeusTokenItem["zeus_token_error_messages"][error_code] != "string") {
		return error_code + " : An error has occurred.";
	}
	return error_code + ' : ' + zeusTokenCustomItem["zeus_token_error_messages"][error_code]
}

zeusTokenClass.prototype.init = function () {

	// IPCODEの設定
	if (typeof zeusTokenIpcode != "string") {
		alert('E00002');
		return;
	}
 
	this.ipcode = zeusTokenIpcode;

	// 設置ミス防止
	if (!document.getElementById('zeus_token_card_info_area')) {
		return;
	}

	// カード入力欄初期化
	this.initCardFormItems();

	// 新しいカードを使うをデフォルト
	document.getElementById('zeus_token_action_type_new').checked = true;
	this.disableRegisterdCardArea();
	this.enableNewCardArea();
	this.validateCardForm();
}

//--------------ゼウストークン決済用jsから、UIの部分を再構成　ここまで--------------

eb$(function(){
	//新しいカードのラジオボタンをクリックしたら、登録済みカードのラジオボタンのチェックをはずず
	eb$("#zeus_token_action_type_new").on("click", function(){
		var value = eb$('input[name=SAVED_CARD_VERI_TORIHIKI_ID]').val();
		eb$('input[name=SAVED_CARD_VERI_TORIHIKI_ID][value='+value+']').attr('checked', false);
	});
	
	//登録済みカードのラジオボタンをクリックしたら、新しいカードのラジオボタンのチェックをはずず
	eb$("input[name=SAVED_CARD_VERI_TORIHIKI_ID]").on("click", function(){
		eb$('#zeus_token_action_type_new').attr('checked', false);
	});
});