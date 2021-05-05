// SM認証送信先携帯電話番号の表示制御

//ロード時
eb$(function() {
	var kessaiId = eb$('input[name="KESSAI_ID"]:checked').val();
	if(kessaiId == 274) {
		eb$('.yamato_atobarai_tel').show();
	}
	else{
		eb$('.yamato_atobarai_tel').hide();
	}
});

//選択時
eb$(function() {
	eb$('input[name="KESSAI_ID"]').change( function() {
		var kessaiId = eb$('input[name="KESSAI_ID"]:checked').val();
		if(kessaiId == 274) {
			eb$('.yamato_atobarai_tel').show();
		}
		else{
			eb$('.yamato_atobarai_tel').hide();
		}
	});
});

// 認証コード入力時の制御

eb$(function() {
	eb$('.yamato_atobarai_auth_code').find('input[type="text"]').addClass('authcode');
	eb$('.authcode').bind('keyup', function() {
		var thisValueLength = eb$(this).val().length;
		if(thisValueLength >= 1) {
			eb$(this).next().focus();
		}
	});
});
