//拡張版セールスキャンペーンオプションn番目の要素から右余白削除
$(function () {
	$('.sales_campaign_banner li:nth-child(2n)').css("margin-right", "0px");
});

//拡張版セールスキャンペーンオプション要素の高さ調節
$(window).on('load', function () {
	$(".sales_campaign_banner li").tile(2);
});