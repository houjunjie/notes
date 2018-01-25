### javascript

**javascript的组成**
- JavaScript由以下三部分组成
  - ECMAScript（核心）：JavaScript语言基础
  - DOM（文档对象模型）：规定了访问HTML和XML的接口
  - BOM（浏览器对象模型）：提供了浏览器窗口之间进行交互的对象方法

**JS的基本数据类型和引用数据类型**
- 基本数据类型：Undefined、number、string、null、boolean、symbol
- 引用数据类型：Object、array、function

**检查浏览器版本有哪些方式**
- navigator.userAgent // UA.toLowerCase().indexOf('chrome')
- window 对象的成员//'ActiveXObject' in window

**介绍JS有哪些内置对象**
- 数据封装类对象：Object,Array,Number,Boolean,String
- 其他对象：Function,Arguments,Math,Date,RegExp,Error
- ES6新增对象：Symbol,Set,Map,Proxy,Promises,Reflect

**说说几条写JavaScript的基本规范**
- 代码段使用花括号{}包裹
- 语句结束使用分号；
- 函数和变量在使用前进行声明
- 以大写字母开头命名构造函数，全大写命名常量
- 规范定义JSON对象，补全双引号
- 用{}和[]声明对象和数组

**如何编写高性能的JavaScript**
- 遵循严格模式：“use strict”
- 将js脚本放在页面底部，加快渲染页面
- 将js脚本成组打包，减少请求
- 使用非阻塞方式下载js脚本
- 进来使用局部变量来保存全局变量
- 尽量少使用闭包
- 使用window对象属性方法时，省略window
- 尽量减少对象成员的嵌套
- 缓存DOM节点的访问
- 通过避免使用eval()和Function()构造器
- getSetTimeout()和setInterval()传递函数而不是字符串作为参数
- 尽量使用直接量创建对象和数组
- 最小化重绘(repaint)和回流(reflow)

**描述浏览器的渲染过程，DOM树和渲染树的区别**
- 浏览器的渲染过程
  - 解析html构建DOM（DOM树），并行请求css/image/js
  - css文件下载完成，开始构建CSSOM(css树)
  - CSSOM构建结束后，和DOM一起生成Reader Tree（渲染树）
  - 布局（Layout）：计算出每个节点在屏幕中的位置
  - 显示（Painting）：通过显卡把页面画到屏幕上
- DOM树和渲染树的区别
  - DOM树与HTML标签一一对应，包括head和隐藏元素
  - 渲染树不包括head和隐藏元素，大段文本的每一个行都是独立节点，每一个节点都有对应的css属性

**重绘和回流（重排）的区别和关系**
- 重绘：当渲染树中的元素外观（如：颜色）发生改变，不影响布局时，产生重绘回流
- 回流：当渲染树的元素的布局（如：尺寸、位置、隐藏/状态状态）发生改变时，产生重绘回流
- 注意：js获取Layout属性值（如：offsetLeft、scrollTop、getComputedStyle等）也会引起回流，因为浏览器需要通过回流计算最新值
- 回流必将引起重绘，而重绘不一定会引起回流

**如何最小化重绘（repaint）和回流（reflow）**
- 需要对元素进行复杂操作时，可以先隐藏（display:none），操作完成后再显示
- 需要创建多个DOM节点时，使用DocumentFragment创建后一次性的加入document
- 缓存Layout属性值，如：var left = elem.offsetLeft；这样，多次使用left只产生一次回流
- 进来避免用table布局（table元素一旦触发回流就会导致table里面所有的其它元素回流）
- 避免使用css表达式（expression），因为每次调用都会重新计算值（包括加载页面）
- 尽量使用css属性简写，如：用border代替border-width,border-style,border-color
- 批量修改元素样式：elem.className和elem.style.cssText代替elem.style.xxx

**script的位置是否会影响首屏显示时间**
- 在解析html生成dom过程中，js文件的下载是并行的，不需要dom处理到script节点。因此，script的位置不影响首屏显示的开始时间
- 浏览器解析html是自上而下的线性过程，script作为html的一部分同样遵循这个原则
- 因此，script会延迟DOMContentLoad，只显示其上部分首屏内容，从而影响首屏显示的完成时间

**解释JavaScript中作用域与变量声明提升**
