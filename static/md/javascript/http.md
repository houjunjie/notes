### http

**http状态码有哪些？分别代表什么意思？**
```
简单版
	[
		100 Continue 继续，一半在大宋post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
		200 ok 正常返回信息
		201 Created 请求成功并且服务器创建了新的资源
		202 Accepted 服务器已接受请求，但尚未处理
		301 Moved Permanently 请求的网页已经永久移动到新位置，永久重定向
		302 Found 临时性重定向
		303 See Other 临时性重定向，且总是使用 GET 请求新的URI
		304 Not Modified 自从上次请求后，请求的网页未修改过
		400 Bad Request 服务器无法理解请求的格式，客户端不应该尝试再次使用相同的内容发起请求
		401 Unauthorized 请求未授权
		403 Forbidden 禁止访问
		404 Not Found 找不到如何与URI相匹配的资源。
		500 Internal Server Error 最常见的服务器端错误。
		503 Service Unavailable 服务器暂时无法处理请求（可能是过载或维护）
	]
```


**一个页面从输入 `URL` 到页面加载显示完成，这个过程中都发生了什么？
- 详细版本
  - 浏览器会开启一个线程来处理这个请求，对url分析判断如果是http协议就按照web方式来处理
  - 调用浏览器内核中的对应方法，比如WebView中的loadUrl方法；
  - 通过DNS解析获取网址的IP地址，设置UA等信息发出第二个GET请求
  - 进行http协议会话，客户端发送报头（请求报头）
  - 进入web服务器上的Web Server ，如Apache、Tomcat、Node.js等服务器
  - 进入部署好的后端应用，如PHP、Java、JavaScript、Python等，找到对应的请求处理
  - 处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回304
  - 浏览器开始下载html文档（响应报头，状态码200），同时使用缓存
  - 文档树简历，根据标记请求所需指定MIME类型的文件（比如css、js），同时设置了cookie
  - 页面开始渲染DOM，JS根据DOM API操作DOM，执行事件绑定等，页面显示完成
