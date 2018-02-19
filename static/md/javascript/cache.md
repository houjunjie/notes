### 三种本地存储方式和一些扩展

**cookie**

先看看[mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)上是怎么描述`cookie`的

> HTTP Cookie（也叫Web Cookie或浏览器Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常用于告知服务器端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie使基于无状态的http协议记录稳定的状态信息成为了可能。

cookie主要用于以下三个方面
- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

如何工作
当网页发起http请求的时候，浏览器会自动检测这个请求是否有对应的cookie，有则自动添加到request header中的cookie字段中。这些都是浏览器自动帮我们做的。而且每一次请求都是这样。

特征
- cookie的存储是以域名形式进行区分的，不同的域下存储的cookie是独立的
- 我们可以设置cookie生效的域（当前设置cookie所在域的子域），也就是说，我们能够操作的cookie是当前域以及当前域下的所有子域
- 一个域名下存放的cookie的个数是有限制的。不同的浏览器存放的个数不一样，一般为20个
- 每个cookie存放的内容大小也是有限制的。不同的浏览器存放大小不一样，一般为4k
- cookie是可以设置过期时间的，默认是会话结束的时候，当时间到期自动销毁

cookie的设置

客户端
```
document.cookie = 'key=value'
document.cookie = 'username=ajie'
console.log(document.cookie); // "key=value; username=ajie"
document.cookie = 'username=ajie;domain=ajie.online'  //在设置cookie同时还设置了生效域
```
**注意：** 客户端可以设置cookie的下列选项：expores、domain、path、secure（有条件：只有在https协议的网页中，客户端设置secure类型的cookie才能成功），但无法设置HttpOnly选项

服务器设置
不管你是请求一个资源文件（如html/js/css/图片），还是发送一个ajax请求，服务端都会返回response。而response header中有一项叫做set-Cookie,是服务端专门用来设置cookie的
例如
```
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: key=value

[页面内容]
```
服务端设置的格式每个语言都不一样，可能是这样的，具体的自行查看
```
Set-Cookie: <cookie名>=<cookie值>
Set-Cookie 消息头是一个字符串，其格式如下（中括号中的部分是可选的）：
Set-Cookie: value[; expires=date][; domain=domain][; path=path][; secure]
```
**注意：** 一个set-Cookie字段只能设置一个cookie，当你要想设置多个cookie，需要添加同样多的set-Cookie字段。服务端可以设置cookie的所有选项：expires、domain、path、secure、HttpOnly

通过Set-Cookie指定的这些可选项只会在浏览器端使用，而不会被发送至服务端

读取：

我们通过document.cookie来获取当前网站下的cookie的时候，得到的字符串形式的值，它包含了当前网站下所有的cookie（为了避免跨域脚本（xss）攻击，这个方法只能获取非HttpOnly类型的cookie）。它会把所有cookie通过一个分号+空格的形式串联起来。例如`key=value; username=ajie;`

修改 cookie

要修改一个cookie，只需要重新赋值就行，旧的值会被新的值覆盖。但要注意的一点，在设置新的cookie时，path/domain这几个选项一定要和旧的cookie保持一致，否则不会修改旧值，而是添加新的cookie

删除 cookie

把要删除的cookie的过期时间设置成已过去的时间，path/domain这几个选项一定要个旧的cookie一样

**cookie的属性（可选项）**
过期时间

如果我们想长时间存放一个cookie。需要在设置这个cookie的时候同时给他设置一个过期时间。如果不设置，cookie默认是临时存储，当浏览器关闭进程的时候自动销毁
> 注意：document.cookie = '名称=值;expires=' + GMT(格林威治时间)格式的日期型字符串

一般设置的天数：new Date().setDate(oDate.getDate() + 5);比当前时间多5天

一个设置cookie时效性的例子
```
function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + excape(value) + ((expiredays == null) ? "" : ";expires="+exdate.toGMTString())
}
使用方法：setCookie('username', 'ajie', 30)
```
> expires 是http:1.0协议中的选项，在新的http/1.1协议中expires已经由max-age选项代替，两者的作用都是限制cookie的有效时间。expires的值是一个时间点（cookie时效时刻=expires），而max-age的值是一个以秒为单位的时间段（cookie时效时刻=创建时刻+ max-age）
> 另外，max-age默认值是 -1（即有效期为session）；max-age有三种可能的值：负数，0，正数
> 负数: 有效期session
> 0:删除cookie
> 正数：有效期为创建时刻+max-age

cookie的域概念（domain选项）

domain指定了cookie将要被发送至哪个或哪些域中。默认情况下。domain会被设置为创建该cookie的页面所在的域，所以当给相同域名发送请求时该cookie会被发送至服务器

浏览器会把domain的值与请求的域名做一个尾部比较（即从字符串的尾部开始比较），并将匹配的cookie发哦是那个至服务器

客户端设置

`document.cookie = "username=ajie;path=/;domain=qq.com"`
如上：“www.qq.com”与"sports.qq.com"公用一个关联的域名'qq.com'，我们如果想让“sports.qq.com”下的cookie被“www.qq.com”访问，我们就需要用到cookie的domain属性，并且需要把path属性设置为“/”

服务端设置

`Set-Cookie: username=ajie;path=/;domain=qq.com`
*注意：一定是同域之间的访问，不能把domain的值设置成非主域的域名。*

cookie的路径概念（path选项）

cookie一般都是由于用户访问页面而被创建的，可是并不是只有在创建cookie的页面才可以访问这个cookie。
因为安全方面的考虑，默认情况下，只有与创建cookie的页面在同一个目录或子目录下的网页才可以访问
即path属性可以为服务器特定文档指定cookie，这个属性设置的url且带有这个前缀的url路径都是有效的

客户端设置

最常用的例子就是让cookie在根目录下，这样不管是那个子页面创建的cookie，所有的页面都可以访问到了

`document.cookie = "username=ajie; path=/"`

服务端设置

`Set-Cookie:name=ajie; path=/blog`

如上设置：path选项值会与/bolg,/bolgrool等等相匹配。任何以/blog开头的选项都是合法的，需要注意的是，只有在domain选项核实完毕之后才会对path属性进行比较。path属性的默认值是发送Set-Cookie消息头所对应的URL中的path部分。

domain和path总结

domain是域名，path是路径，两者加起来就构成了url，domain和path一起来限制cookie能被哪些url访问。
所以dimain和path两个选项共同决定了cookie何时被浏览器自动添加到请求头部发送出去。如果没有设置这两个选项，则会使用默认值。domain的默认值为设置该cookie的网页所在的域名，path默认值为设置该cookie的网页所在的目录

cookie的安全性（secure选项）

通常 cookie 信息都是使用httpp连接传递数据的，这种传递方式很容易被查看，所以 cookie 存储的信息容易被窃取。假如 cookie中所传递的内容比较重要，那么就要求使用加密的数据传输

secure选项用来设置cookie只在确保安全的请求中才会发送。当请求是https或者其他安全协议时，包含secure选项的cookie才能被发送到服务器

`document.cookie = "username=ajie; secure"`

把cookie设置为secure，只保证cookie与服务器之间的数据传输过程加密，而保存在本地的cookie文件并不加密，就算设置了secure属性也不代表他人不能看到你机器本地保存的cookie信息。机密且敏感的信息绝不应该在cookie中存储或传输。因为cookie的整个机制原本就是不安全的

注意：如果想在客户端即网页中通过js去设置secure类型的cookie，必须保证网页是https协议。在http协议的网页中是无法设置secure类型的cookie的

HttpOnly

这个选项是用来设置cookie是否能通过js去访问。默认情况下，cookie不会带httpOnly选项（即为空），所以默认情况下，客户端是可以通过js代码去访问（包括读取，修改，删除等）这个cookie的。当cookie带HttpOnly选项时，客户端则无法通过js代码去访问（包括读取，修改，删除等）这个cookie

在客户端是不能通过js代码去设置一个HttpOnly类型的cookie，这种类型的cookie只能在服务端设置

cookie的编码

cookie其实是一个字符串，但这个字符串中等号、分号、空格被当做了特殊符号。所以当cookie的key和value中含有这3个特殊符号时，需要对其进行额外编码，一般会用`escape`进行编码，读取时用`unescape`进行解码。当然也可以用encodeURIComponent/decodeURIComponent或者encodeURI/decodeURI，[查看关于编码的介绍](http://www.cnblogs.com/season-huang/p/3439277.html)

第三方cookie

通常cookie的域和浏览器地址的域匹配，这被称为第一方cookie。那么第三方cookie就是cookie的域和地址栏中的域不匹配，这种cookie通常被用在第三方广告网站。为了跟踪用户的浏览记录，并且根据收集的用户的浏览习惯，给用户推送相关的广告。
关于第三方cookie和cookie的安全问题可以查看https://mp.weixin.qq.com/s/oOGIuJCplPVW3BuIx9tNQg

- cookie推荐资源
  - [聊一聊 cookie](https://segmentfault.com/a/1190000004556040)
  - [HTTP cookies 详解](http://bubkoo.com/2014/04/21/http-cookies-explained/)


---
### localStorage(本地存储)
---
html5新方法，不过ie8及以上浏览器都兼容

**特点**

- 生命周期：持久化本地存储，除非主动删除数据，否则数据是永久不会过期的
- 存储的信息在同一域中是共享的
- 当本页操作（新增、修改、删除）了localStorage的时候，本页面不会触发storage事件，但是别的页面会触发storage事件
- 大小：据说是5m（跟浏览器厂商有关）
- 在非ie下的浏览中可以本地打开。ie浏览器要在服务器中打开
- localStorage本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡
- localStorage受同源策略的限制

设置

`localStorage.setItem('username','ajie')`

获取
`localStorage.getItem('username')`
也可以获取一个键名
`localStorage.key(0)`

删除

`localStorage.removeItem('username')`
也可以一次性清除所有存储
`localStorage.clear()`

storage事件

当storage发生改变的时候出发。

注意：当前页面对storage的操作会触发其他页面的storage事件

时间的回调函数中有一个参数event，是一个StorageEvent对象，提供了一些实用的属性，如下表：
| Property  | Type  | Description |
| :---: | :---: | :---  |
| key | String  | The named key was added, removed, or moddified  |
| oldValue  | Any  | The previous value(now overwritten),or null if a new item was added  |
| newValue  | Any  | The new value, or null if an item was added  |
| url/uri  | String  | the page that called the method that triggered this change  |

---
---

### sessionStorage
---
其实跟localStorage差不多，也是本地存储，会话本地存储

**特点**
- 用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。也就是说只要这个浏览器窗口没有关闭，即使刷新页面或进入同源另一页面，数据仍然存储。关闭窗口后，sessionStorage即被销毁，或者在新窗口打开同源的另一个页面，sessionStorage也是没有的

### cookie，localStorage和sessionStorage区别
- 相同：在本地（浏览器端）存储数据
- 不同：
  - localStorage、sessionStorage：localStorage只有在相同的协议，相同的主机名、相同的端口下，就能读取/修改到同一份localStorage数据。
  - sessionStorage：sessionStorage比localStorage更严苛一点，除了协议、主机名、端口外，还要求在同一个窗口下（也就是浏览器的标签页）下
  - localStorage是永久存储，除非手动删除
  - sessionStorage是当前会话结束（即当前页面关闭的时候，自动销毁）
  - cookie的数据会在每一次发送http请求的时候，同时发送给服务器而localStorage，sessionStorage不会
