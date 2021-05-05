// �f�U�C���v���r���[�p�ɁAIframe�̃T�C�Y��������������JavaScript
// ���s���͓ǂݍ��܂��Ȃ�
// 2009/09/16 

function resize_iframe(element) {
	if (element.contentWindow.document.documentElement) {
		element.style.height = element.contentWindow.document.documentElement.scrollHeight + "px" ;
	} else {
		element.style.height = element.contentWindow.document.body.scrollHeight + "px";
	}
	
}
