# chrome-plugin-blog
博客的 收藏插件 配合 blog-go  https://github.com/foxiswho/blog-go

foxwho 博客网摘 chrome 插件地址
<a href="https://chrome.google.com/webstore/detail/diaphlmmfnagdgicohlhbcimoioeafnc">https://chrome.google.com/webstore/detail/diaphlmmfnagdgicohlhbcimoioeafnc</a>


# 说明
token: 令牌 或 更新标志字段

api_url：更新URL地址

api_url_cat：栏目URL地址

api_url_tag：标签URL地址

var api_url='';

var api_url_cat='';

var api_url_tag='';


# 栏目
获取栏目 返回JSON
```JS
{
	code:1,
	info:ok,
	data:[
		{cat_id:1,
			name:"栏目一"
		},{cat_id:2,
			name:"栏目二"
		}
	]
}
```

# 标签
获取标签 返回JSON
```JS
{
	code:1,
	info:ok,
	data:[
		{tag_id:1,
			name:"PHP"
		},{tag_id:2,
			name:"JAVA"
		}
	]
}
```
# 保存
保存 的数据
```JS
var data={
token:token,
is_open:1,//是否显示 1是 0否
is_life:1,//是否显示 1是 0否
url_source:"",//网址
title:"标题",
tag:"标签",//多个标签逗号隔开
cat_id:栏目ID,
description:"摘要"
};
```


# 其他 未来
////////////////
//内容
$('div.editor-content').append('内容');

//标题
$('a.file-title-navbar').text('内容');
$('input.input-file-title').val('内容');
