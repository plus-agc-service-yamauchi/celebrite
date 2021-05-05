  eb$(function(){
//amazonPayログインボタン
  if (eb$('#AmazonPayV2Button')[0] 
  	&& eb$('#apv2IsSandBox').val() != "" && eb$('#apv2IsSandBox').val() != "undefined"){
	  amazon.Pay.renderButton('#AmazonPayV2Button', {
	    // set checkout environment
	    merchantId: eb$('#apv2SellerId').val(),
	    ledgerCurrency: eb$('#apv2LedgerCurrency').val(),
	    sandbox: eb$('#apv2IsSandBox').val() == '1',    
	    // customize the buyer experience
	    checkoutLanguage: eb$('#apv2CheckoutLanguage').val(),
	    productType: eb$('#apv2ProductType').val(),
	    placement: eb$('#apv2Placement').val(),
	    buttonColor: eb$('#apv2ButtonColor').val(),
	    // configure Create Checkout Session request
	    createCheckoutSessionConfig: {                     
	        payloadJSON: eb$('#apv2Payload').val(), // string generated in step 2
	        signature: eb$('#apv2Signature').val(), // signature generated in step 3
	        publicKeyId: eb$('#apv2PublicKeyId').val(),
	        authtoken: eb$('#apv2AuthToken').val()
	    }
    });
  }
  
  //amazonPayお届け先情報変更ボタン
  if (eb$('#AmazonPayV2ChangeSendButton')[0]){
	  amazon.Pay.bindChangeAction('#AmazonPayV2ChangeSendButton', {
	   	amazonCheckoutSessionId: eb$('#apv2CheckoutSessionId').val(),
　　	changeAction: 'changeAddress'
    });
  }
  
    //amazonPayお支払い情報変更ボタン
  if (eb$('#AmazonPayV2ChangePaymentButton')[0]){
	  amazon.Pay.bindChangeAction('#AmazonPayV2ChangePaymentButton', {
		amazonCheckoutSessionId: eb$('#apv2CheckoutSessionId').val(),
		changeAction: 'changePayment'
    });
  }
  
  //GETパラメータ取得
  function getURLParameter(name, source){
		return decodeURIComponent(((new RegExp('[?|&|#]' + name + '=([^&;]+?)(&|#|;|$)').exec(source)) || [void 0, ""])[1].replace(/\+/g, '%20' || null));
	}
	//amazonログイン自動リダイレクト
	if (eb$('#amazonPayPreLogin')[0]){
		var amazonCheckoutSessionId = null
		var checkoutSessionId = getURLParameter("amazonCheckoutSessionId", location.hash);
		if(typeof checkoutSessionId === 'string' && checkoutSessionId.match(/^Atza/)){
			amazonCheckoutSessionId = getURLParameter("amazonCheckoutSessionId", location.hash);
		}else{
			amazonCheckoutSessionId= getURLParameter("amazonCheckoutSessionId", location.search);
		}
		eb$('#amazonCheckoutSessionId').val(amazonCheckoutSessionId);
		eb$('#amazonPayPreLogin').submit();
	}
});

    //amazonログインリダイレクト
  function clickAmazonLoginPreButton() {
		eb$('#amazonPayPreLogin').submit();
	}