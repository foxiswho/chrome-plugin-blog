//http://www.foxwho.com/api/blog/tag     GET
//http://www.foxwho.com/api/blog/cat    GET
//http://www.foxwho.com/api/blog/create    POST

// 设置页面 js， 将条件保存到localStorage
var settings = JSON.parse(localStorage.getItem("settings")) || {};

$('.token').val(settings.token);
$('.api_url').val(settings.api_url);
$('.api_url_cat').val(settings.api_url_cat);
$('.api_url_tag').val(settings.api_url_tag);


$('.btnSave').click(function() {
	settings = {
		token : $('.token').val(),
		api_url : $('.api_url').val(),
		api_url_cat : $('.api_url_cat').val(),
		api_url_tag : $('.api_url_tag').val(),
	}
	
	localStorage.setItem("settings", JSON.stringify(settings));
	
//	if (settings.addMenu) {
//		chrome.contextMenus.create({
//		    type: 'normal',
//		    title: '博客收藏',
//		    id: 'fav',
//		    onclick : showPopup
//		});
//	} else {
//		chrome.contextMenus.removeAll();
//	}
	
	layer.msg('保存成功', {time: 500}, function() {
		window.close();
	});
});

function showPopup() {
	var ilinkWindow = window.open("popup.html", "extension_popup", "width=400,height=500,status=no,scrollbars=yes,resizable=no,top=0,left=2000");
	ilinkWindow.focus();
	
}


