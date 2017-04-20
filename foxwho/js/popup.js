(function() {
	
// 获取当前页面信息
chrome.tabs.query({active: true}, function(tab) {
//	console.log(tab);
	
	$('.url_source').val(tab[0].url);
	$('.title').val(tab[0].title);
});





//打开选项页面
$('.btnSetting').click(function() {
	chrome.tabs.create(
		{url: "chrome-extension://" + chrome.runtime.id + "/settings.html"},
		function(tab) {
		}
	);
});

//关闭页面
$('.btnCancel').click(function() {
	window.close();
});

var settings = JSON.parse(localStorage.getItem("settings"));
// 第一次 加入 默认参数
if (!settings) {
	settings={};
	settings = {
		token : "这里填写token",
		api_url : "http://www.foxwho.com/api/blog/create",
		api_url_cat : "http://www.foxwho.com/api/blog/cat",
		api_url_tag : "http://www.foxwho.com/api/blog/tag",
	}
	
	localStorage.setItem("settings", JSON.stringify(settings));
}

if (!settings) {
	// 打开设置窗口
	layer.alert('请先设置参数', function() {
		$('.btnSetting').click();
	})
	return;
}


var cats = [], tags = [];
// 获取栏目
$.get(settings.api_url_cat, function(data){
	if(data.code==1){
		//成功信息
		//layer.msg(data.info, {icon: 1, time: 500});
		var datas = data.data, html = [];
		
		for (var i = 0; i < datas.length; i++) {
			html.push('<option value="' + datas[i].cat_id + '">' + datas[i].name + '</option>');
		}
		
		$('.cat_id').html(html.join('\n'));
		initMultiSelect('.cat_id');
	}else{
		//错误信息
		layer.msg(data.info, {icon: 7, time: 500});
	}
});

// 获取标签
$.get(settings.api_url_tag, function(data){
	if(data.code==1){
		//成功信息
//		layer.msg(data.info, {icon: 1, time: 500});
		
		var datas = data.data, html = [];
		
		for (var i = 0; i < datas.length; i++) {
			html.push('<option value="' + datas[i].tag_id + '">' + datas[i].name + '</option>');
		}
		
		$('.tag').html(html.join('\n'));
		//initMultiSelect('.tag');
	}else{
		//错误信息
		layer.msg(data.info, {icon: 7, time: 500});
	}
});


$('.btnFav').click(function() {
	var tag = $('.tag').val();
	if (tag.length) {
		//tag = tag.join(',');
	}
	
	var cat = $('.cat_id').val();
	if (cat&&cat.length) {
		cat = cat.join(',');
	}
	
	var data = {
		token: settings.token,
		is_open: $('#is_open').is(':checked') ? 1 : 0,//是否显示 1是 0否
		is_life: $('#is_life').is(':checked') ? 1 : 0,//是否显示 1是 0否
		url_source: $('.url_source').val(), //网址
		title: $('.title').val(), // 标题
		tag: tag, //多个标签逗号隔开
		cat_id: cat, //栏目ID
		description: $('.description').val(), // 摘要
			
			
	};
	
	console.log(data);
	
	$.ajax({
		url: settings.api_url,
		data: data,
		type: 'post',
		headers:{"X-Requested-With":"XMLHttpRequest",},
		success: function(data){
			console.log(data)
			var icon = 1;
			if(data.code==1){
				//成功信息
			}else{
				//错误信息
				icon = 7;
			}
			
			layer.msg(data.info, {icon: icon, time: 1500}, function() {
				window.close();
			});
		},
		error: function(){
			layer.msg('收藏失败，请检查api_url_tag设置', {icon: 7, time: 3000}, function() {
				window.close();
			});
		}
	})
	
});




})();



function initMultiSelect(dom) {
	$(dom).each(function(i, o) {
		$(o).select2({
			selectOnClose: false,
			closeOnSelect: true,
			allowClear: true,
			placeholder: {id: -1, text: '请选择'}
		});
	})
}

