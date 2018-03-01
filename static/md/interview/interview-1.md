#### 谈谈对前端安全的理解，有什么，怎么防范

前端安全问题主要有XSS，CSRF两种攻击方式
- XSS：跨站脚本攻击
它允许用户将恶意代码植入到提供给其他用户使用的页面中，可以简单理解为一种JavaScript代码注入

xss的防御措施：
1. 过滤转义输入输出
2. 避免使用`eval`、`new Function`等执行字符串的方法，除非确定字符串和用户输入无关
3. 使用cookie的httpPnly属性，加上了这个属性的cookie字段，js是无法进行读写的
4. 使用innerHTML，document.write的时候，如果数据是用户输入的，那么需要对象关键字符进行过滤与转义。

- CSRF:跨站请求伪造
其实就是网站中的一些提交行为，被黑客利用，在你访问黑客的网站的时候进行操作，会被操作到其他网站上

CSRF防御措施：
1. 检测http referer是否是同域名
2. 避免登录的session长时间存储在客户端中
3. 关键请求使用验证码或者token机制

其他的一些攻击方法还有http劫持，界面操作劫持

### 使用箭头函数需要注意的地方
当要求动态上下文的时候，你就不能使用箭头函数，比如：定义方法，用构造器创建对象，处理时间时用`this`获取目标
在对象上，原型上定义函数不能使用箭头函数。

### webpack.load的原理
loaders是你用在app源码上的转换原件，他们是用node.js运行的，把源文件作为参数，返回新的资源的函数

### es6 let const
let关键字可以将变量绑定到任意的作用域当中。更完美的var
 1. let声明的变量拥有块级作用域，let声明仍然保留了提升的特性，但不会盲目提升。
 2. let声明的全局变量不是全局对象的属性，不可以通过`window.变量名`的方式访问
 3. 形如`for (let x..)`的循环在每次迭代的时都为`x`创建新的绑定
 4. let声明的变量知道控制流到达该变量被定义的代码行时才会被装载，所以在到达之前使用该变量会触发错误。
const 声明常量，不可重新赋值，但如果是一个对象，可以改变对象的属性值

### css3 box-sizing的作用
改变盒模型尺寸作用规则的。。
box-sizing有三个尺寸属性
 1. content-box 默认值，border，padding不计算到width中
 2. padding-box padding计算到width中
 3. border-box padding、border都计算到width中

### 说说HTML5中有趣的标签（新标签及语义化）
canvas这是一个很有趣的新标签，可以做很多事情。还有header，footer，main，nav等标签这些都是一些语义化标签，有利于seo，搜索引擎更加容易读懂网页要表达的意思。

### git命令，如何批量删除分支
`git branch | grep 'branchName'| xargs git branch -D`，从分支列表中匹配到指定分支，然后一个一个（分成小块）传递给删除分支的命令，最后进行删除。

### 创建对象的三种方法
1. json方式
```
var obj = {};
```
2. 通过构造函数
```
var M = function(name) {this.name = name}
var obj = new M('ajie')
```
3. 使用内置对象的方式
```
var obj = new Object();
obj.name = 'ajie';
```
### js实现继承的几种方式。
1. 构造函数的方式
```
function Parent(){
  this.name = 'ajie'
}
function Child(){
  Parent.call(this);
}
```
2. 通过原型继承
```
function Parent() {
}
Parent.prototype.name = 'ajie';
function Child() {}
Child.prototype = new Parent();
```

3. 组合式继承
```
function Parent() {this.name = 'parent3'}
function Child() {
  Parent.call(this);
}
Child.prototype = new Parent();
```

### 当new Foo()时发生了什么。
1. 创建了一个新的对象
2. 将this指向这个新对象
3. 执行构造函数里面的代码
4. 返回新对象（this）

### 你做过哪些性能优化
雪碧图，移动端响应式图片，静态资源CDN，减少DOM操作（事件代理，fragment），压缩js和css、html等，DNS预解析

### 浏览器渲染原理
1. 根据返回的html资源构建dom树，
2. 根据的css构建cssDOM树
3. 根据dom树和cssDOM树，生成渲染树
4. 进行渲染

### 前端路由的原理
什么是路由？就是根据不同的url显示不同的页面或内容

使用场景？前端路由更多是在单页面上，也就是SPA，因为单页面应用，基本都是前后端分离的，后端自然也不会给前端提供路由

前端的路由和后端的路由在实现技术上不一样，但是原理都是一样的。在html5的history API出现之前，前端的路由都是通过hash来实现的，hash能兼容低版本的浏览器

两种实现前端路由的方式
1. HTML5 History两个新增的API：`history.pushState`和`history.replaceState`,两个 API 都会操作浏览器的历史记录，而不会引起页面的刷新。

2. Hash 就是rul中看到`#`，我们需要一个根据监听哈希变化触发的事件（`hashchange`）事件。我们用`window.location`处理哈希的改变时不会重新渲染页面，而是当作新页面加到历史记录中，这样我们跳转页面就可以在 hashchange 事件中注册 ajax 从而改变页面内容

优点：

从性能个用户体验的层面来比较的话，后端路由每次访问一个新页面的时候都要向服务器发送请求，然后服务器再响应请求，这个过程肯定会有延迟。而前端路由在访问一个新页面的时候仅仅是变换了一下路径而已，没有了网络延迟，对用户体验来说会有相当大的提升

缺点

使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存。

### Restful API是什么
1. Restful的意思就是表现层状态转化。
2. “表现层”其实指的是“资源”的“表现层”，把“资源”具体呈现出来的形式，叫做它的“表现层”
3. 所谓“资源”，就是网络上的一个实体，或者说是网络上的一个具体信息。它可以是一段文本、一张图片、一首歌曲、一种服务，总之就是一个具体的实在，每个url代表一种资源
4. 如果客户端想要操作服务器，必须通过某种手段，让服务器端发生“状态转化”。而这种转化是建立在表现层之上的，所以就是“表现层状态转化”
5. Restful 就是客户端和服务器之间，传递这种资源的某种表现层
6. 客户通过四个HTTP动词，对服务器端资源进行操作，实现表现层状态转化“”

Restful API就是符合Restful架构的API设计。

Restful API一下具体实践：
1. 应该尽量将API部署在专用的域名之下。如果确定API很简单，不会有进一步扩展，可以考虑放在主域名下。
2. 应该将API的版本号放入URL
3. 对资源的具体操作类型，由HTTP动词表示
4. 如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果
5. 如果状态码是4XX，就应该向用户返回出错信息。一般来说，返回的信息中将error作为键名
...
统一接口，根据不同的http方法进行不同的操作

### script标签的defer、async的区别
defer是在HTML解析完之后才会执行，如果是多个，按照加载的顺序依次执行，async是在加载完成后立即执行，如果是多个，执行顺序和加载顺序无关

### 同源与跨域
什么是同源策略

限制从一个源加载的文档或脚本如何与来自拧一个源的资源进行交互。一个源指的是主机名、协议和端口号的组合，必须相同

跨域通信的几种方式
 -  JSOP
 - Hash
 - postMessage
 - WebSocket
 - CORS
 - nginx转发

JSONP原理

基本原理：利用script标签的异步加载特性实现
给服务器传一个回调函数，服务器返回一个传递过去的回调函数名称的js代码。

### 原型与闭包相关问题

原型是什么？

每个对象都有一个原型对象，对象以其原型为模板，从原型上继承其属性和方法

闭包是什么？

当一个内部函数被其外部函数的变量引用时，就形成了闭包

还可以这么理解：

闭包就是一个具有封闭功能与包裹功能的结构，是为了实现具有私有访问空间的函数的，函数可以构成闭包，因为函数内部定义的数据函数外部无法访问，即函数具有封闭性；函数可以封装代码即具有包裹性，所以函数可以构成闭包。

创建闭包的最常见方式就是在函数内部创建另一个函数，通过另一个函数访问这个函数的局部变量。然后把这个函数返回

闭包的三个特性：
 - 函数嵌套函数
 - 函数内部可以引用外部的参数和变量
 - 参数和变量不会卑垃圾回收机制回收

闭包有什么用，使用场景

当我们需要在模块中定义一些变量，并希望这些变量`一直保存在内存中`但又`又不会”污染“全局的变量`时，就可以用闭包来定义这个模块

闭包的缺点

缺点就是变量常驻内存，使用不当会造成内存泄露

函数套函数就是闭包吗？不是！，当一个内部函数被其外部函数之外的变量引用时，才会形成了一个闭包。

### 如何进行错误监控

前端错误的分类
  - 即时运行错误（代码错误）
  - 资源加载错误

错误的捕获方式

即时运行错误的捕获方式：
 - try..catch
 - window.onerror

资源加载错误：
 - object.onerror （如img,script）
 - performance.getEntries()
 - Error事件捕获
```
延伸：跨域的js运行错误可以捕获吗？错误提示是什么？应该怎么处理?
可以
Script error
1. 在script标签增加crossorigin属性
2. 设置js资源响应头Access-Control-Allow-Orgin:*
```

上报错误的基本原理

采用Ajax通信方式上报

利用Image对象上报

### DOM事件类
DOM事件的级别
  - DOM0，element.onclick = function() {}
  - DOM2,element.addEventListener('click', function(){}, false)

DOM事件模型是什么：指的是冒泡和捕获
DOM事件流是什么？捕获阶段 -> 目标阶段 -> 冒泡阶段

描述DOM事件捕获的具体流程

window --> document --> documentElement(html标签) --> ... --> 目标对象

Event对象常见应用

  - event.preventDefault(),阻止默认行为
  - event.stopPropagation(), 阻止事件冒泡
  - event.stopImmediatePropagation(), 阻止剩余的事件处理函数执行并且防止事件冒泡到DOM树上，这个方法不接受任何参数。
  - event.currentTarget,返回绑定事件的元素
  - event.target，返回触发事件的元素

如何自定义事件
Event，不能传递参数

```
var eve = new Event('自定义事件名')
ev.addEventListener('自定义事件名', function() {
  console.log('自定义事件')
})
ev.dispatchEvent(eve)
```

### 本地起了一个http server，为什么只能在同一个wifi（局域网）上访问

你没有公网IP当然就不能被外网访问了。常见的wifi情况下，一般的ip会是~192.168.0.x这样的，只是对局域网（同wifi下）可见，但是外网访问不了

### 回流和重绘
**回流**
页面的布局发生改变，使得页面结构需要重排绘制

**重绘**
页面布局没有发生改变，只是背景颜色等一些不影响布局的东西发生改变，使得网页需要重新绘制

### 数组去重的方法
```
function unique(arr) {
  var res = a.filter(function(item, index, array){
    return array.indexOf(item) === index;
  })
  return res;
}
es6 :
let arr = [2,2,4,1,1,5,6]
let newArr = Array.from(new Set(arr))
```

### 深拷贝与浅拷贝
浅拷贝只是复制指向某个对象的指针，而不是复制对象本身，新旧对象还是共享同一快内存。但是深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象

实现浅拷贝
```
var obj1 = {a:1,b:2}
var obj2 = obj1;
```
实现深拷贝
一般的对象使用JSON转换为字符串再转成对象就可以实现一个深拷贝
```
var obj1 = {a:1,b:2}
var obj2 = JSON.parse(JSON.stringify(obj1));
或者
function clone (obj) {
  var newObj = {};
  for(var o in obj) {
    if(typeof obj[o] == 'object') {
      newObj[o] = clone(obj[o]);
    }else {
      newObj[o] = obj[o];
    }
  }
  return newObj;
}
```

### 代码优化基本方法

减少http请求

html优化
  - 使用语义化标签
  - 减少iframe：iframe是seo的大忌，iframe有好处也有弊端
  - 避免重定向

css优化：
  - 布局代码写前面
  - 删除空样式
  - 不滥用浮动，字体，需要加载的网络字体根据网站需求再添加
  - 选择器性能优化
  - 避免使用表达式，避免用id写样式

js优化：
  - 压缩
  - 减少重复代码

图片优化：
  - 使用webP
  - 图片合并，雪碧图

减少DOM操作
  - 缓存已访问过的元素
  - “离线”更新节点，再将它们添加到树中
  - 避免使用 JavaScript 输出页面布局--应该是css的事儿

使用JSON格式来进行数据交换

使用cdn加速

使用http缓存：添加Expires或Cache-Control信息头

使用dns预解析

Chrome内置了DNS Prefetching技术，Firefox 3.5也引入了这一特性，由于Chrome和Firefox 3.5本身对DNS预解析做了相应优化设置，所以设置DNS预解析的不良影响之一就是可能会降低Google Chrome浏览器及火狐Firfox 3.5浏览器的用户体验

预解析的实现：
1. 用meta信息来告知浏览器，当前页面要做DNS预解析:`<meta http-equiv="x-dns-prefeth-control" content="on">`
2. 在页面header中使用link标签来强制对DNS预解析：`<link rel="dns-prefetch" href="http://bdimg.share.baidu.com">`

### https的握手过程
1. 浏览器将自己支持的一套加密规则发送给服务器
2. 服务器从中选出一组加密算法与HASH算法，并将自己的身份信息以证书形式发回给浏览器。证书里面包含了网站地址，加密公钥，以及证书的颁发机构等信息。
3. 浏览器获得网站证书之后浏览器要做以下工作：
  - 验证证书的合法
  - 如果证书受信任，或者是用户接受了不受信的证书，浏览器会生成一串随机数的密码，并用证书提供的公钥加密。
  - 使用约定好的HASH算法计算握手消息，并使用生成的随机数对消息进行加密，最后将之前生成的所有信息发送给服务器
4. 网站接受浏览器发来的数据之后要做以下操作：
  - 使用自己的私钥将信息解密取出密码，使用密码解密浏览器发来的握手消息，并验证HASH是否与浏览器发来的一致。
  - 使用密码加密一段握手消息，发送给浏览器
5. 浏览器解密并计算握手消息的HASH，如果与服务器发来的HASH一致，此时握手过程结束，之后所有的通信数据将由之前浏览器生成的随机密码并利用对称加密算法进行加密。

### BFC相关问题
BFC(Block formatting context)直译为“块级格式化上下文”。它是一个独立的渲染区域，只有Block-level box参与，它规定了内部 Block-level Box如何布局，并且与这个区域外部毫不相关

BFC的渲染规则
  - BFC这个元素的垂直方向的边距会发生重叠
  - BFC的区域不会与浮动元素的box重叠（清除浮动原理）
  - BFC在页面上是一个独立的容器，外面的元素不会影响它里面的元素，反过来它里面的元素也不会影响外面的元素
  - 计算BFC的高度的时候，浮动元素也会参与计算。

如何创建BFC？
  - overflow属性不为visible
  - float属性不为none
  - position属性不为absolute或fixed
  - display属性为inline-block。table-cell、table-caption、flex、inline-flex

BFC的使用场景

他的很常用的一个应用场景就是解决边距重叠的问题。

### what is doctype
我们的html中，一般初始化如下代码。那`<!DOCTYPE html>`是干什么的？

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

</body>
</html>
```
当写`html`或者`xhtml`时，添加`doctype`声明非常重要。这样浏览器就能了解预期的文档类型，从而告知浏览器，要通过哪一种规范解析文档，确保文档在不同的浏览器中以相同的方式被解析。

### 垂直居中
使用flexbox,前提条件是可以使用flexbox

```
.box{
  display:flex;
  justify-content:center;
  align-items: center;
}
```
场景1：目标元素具有固定宽高

将元素绝对定位的位置设置为50%/50%,并设置相应方向的负`margin`值`width + padding / 2` 和`height + padding / 2`

```
.parent{
  position: relative;
}
.child{
  position: absolute;
  top:50%;
  left:50%;

  width:300px;
  height:100px;
  padding: 20px;

  margin: -70px 0 0 -170px;
}
```
或者将child元素绝对定位属性设置如下(left,right,top,bottom),然后使用`margin:auto;`来设置垂直居中
```
.parent{
  position: relative;
}
.child{
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;

  width:300px;
  height:100px;
  padding: 20px;

  margin: auto;
}
```

### BFC
什么是BFC，它就是页面上的一块隔离的渲染区域。容器里面的子元素的布局不会影响到外面的元素，反之亦然。那么它是如何形成的？
  - 块元素( `overflow` 值不为 `visible`)
  - 内联块元素( `display` 值为 `inline-block`)
  - 浮动元素(`float` 值不为 `none`)
  - 绝对定位元素( `position` 值为 `absolute` 或 `fixed`)
  - `display`的值为`table-cell`, `table-caption`, `inline-block`中的任何一个。

### 执行上下文
每个函数被调用时，都会创建一个新的执行上下文。对于JavaScript引擎，每次对执行上下文调用都分两个阶段
  - 创建阶段[当函数被调用，但是还未执行里面的代码]
    - 创建`variables`, `functions`, `arguments`
    - 确定 `this` 的值
    - 创建作用域链 `Scope Chain`
  - 激活 / 代码执行阶段
    - 分配值，对函数的引用，执行代码
也就是说，从概念上，我们可以将执行上下文表示为一个具有3个属性的对象:`executionContextObj`,这个对象在创建阶段生成
```
executionContextObj = {
  'scopeChain': { }, // AO|VO + [[scope]]
  'variableObject': { }, // function arguments / parameters, inner variable and function declarations
  'this': { }
}
```
以下，就是JavaScript引擎调用某函数时的伪过程：[在调用函数之前，创建一个执行上下文]
  - 进入创建阶段
    - 创建变量对象VO(variable object)
      - 创建arguments对象，初始化参数的名和值，然后再arg对象中放一份副本s
