### 第八章 Promise

我们为了解决之前说过的回调地狱，可以使用Promise

Promise 对象用于表示一个异步操作的最终状态（成功或失败），以及返回的值。

Promise的使用场景很像我们去麦当劳点一个汉堡。我通过下订单并付款，这表示我已经发出了一个对某个值（也就是那个汉堡）的请求。

但是，通常我们不能马上就得到这个汉堡。收银员会交给我某个东西来代替汉堡：一张带有订单号的收据。订单号就是 IOU（I owe you，我欠你的）承诺，保证了最终我会得到我的汉堡

我们再等待的过程中，我们可以做点其他的事情，比如给朋友发个短信：“嗨，要来和同一起吃午饭吗？我正要吃汉堡呢。”

在这里我已经在想着未来的汉堡了，尽管现在我还没有拿到手。但我的大脑可以这样做。是因为它已经把订单号当作是汉堡的占位符了。从本质上讲。这个占位符使得这个值不再依赖时间。这是一个未来值

换句话说，一旦我们需要的值准备好了，我就用我的承诺值来换取这个值的本身。

但是，还有可能有另一种结果。他们叫到了我的订单号，当我过去拿的时候，告诉我，你的要的汉堡已经卖完了。

所以我们可以看到这个未来值有一个重要的特性：它可能成功，也可能失败。

然而在代码中，事情并非这么简单，因为还有一种情况就是你的订单号永远不会被叫到。这种情况下，我们就永远处于一种未决议的状态。也就是等待（pending）


**Promise 调度技巧**

promise有很多调度的细微差别。在这种情况下。两个独立Promise 上的链接的回调的相对顺序无法可靠预测

如果两个promise p1 和p2 都已经决议，那么 p1.then(..);p2.then(..)应该最终会先调用p1的回调，然后是p2的那些。但还有一些微妙的场景可能不是这样的。比如：
```
var p3 = new Promise( function(resolve, reject) {
  resolve("B")
} )
var p1 = new Promise( function(resolve, reject) {
  resolve( p3 )
} )
p2 = new Promise( function(resolve, reject) {
  resolve("A")
} )
p1.then( function(v) {
  console.log(v);
})
p2.then( function(v) {
  console.log(v);
})
// A B  <-- 而不是像你可能认为的 B A
```
我们可以看出，p1不是用立即值而是用另一个peomise p3决议，后者本身的决议值为“B”。规定的行为是把p3 展开到 p1，但是是异步地展开，所以再异步任务队列中，p1 的回调排在p2 的回调之后、


我们可以发现Promise并没有完全摆脱回调。它们只是改变了传递回调的位置。我们并不是把回调传递给foo(..)，而是从foo(..)得到某个东西（外观上看是一个真正的Promise），然后把回调传给这个东西。

所以为什么这就比单纯使用回调更值得信任呢？对于这个问题，在原生的es6 Promise实现中的解决方案就是Promise.resolve(..)。

如果向 Promise.resolve(..) 传递一个非 Promise、非 thenable 的立即值,就会得到一个用 这个值填充的 promise。下面这种情况下,promise p1 和 promise p2 的行为是完全一样的:

```
var p1 = new Promise( function (resolve, reject){
  resolve( 42 );
});
var p2 = Promise.resolve(42)
```
而如果向Promise.resolve(..)传递一个真正的Promise，就只会返回同一个promise：
```
var p1 = Promise.resolve(42);
var p2 = Promise.resolve(p1);
p1 === p2; // true
```
更重要的是，如果向Promise.resolve(..)传递了一个非 Promise 的 thenable 的值，前者就会试图展开这个值，而且展开过程会持续到提取出一个具体的非类Promise的最终值。

考虑：
```
var p = {
  then: function(cb) {
    cb(42);
  }
}
// 这可以工作，但是只是因为幸运而已
p
  .then(
    function fulfilled(val) {
      console.log(val); // 42
    },
    function rejected(err) {
      // 永远不会到达这里
    }
  )
```
这个 p 是一个 tenable ，但并不是一个真正的Promise。幸运的是，和绝大多数值一样，它是可追踪的。但是，如果得到的是如下这样的值又会怎样呢：
```
var p = {
  then: function(cb, errcb) {
    cb(42);
    errcb('evil laugh')
  }
}
p
 .then(
    function fulfilled(val){
      console.log( val ); // 42
    },
    function rejected(err){
      // 啊,不应该运行!
      console.log( err ); // 邪恶的笑
    }
 );
```
这个 p 是一个 thenable,但是其行为和 promise 并不完全一致。这是恶意的吗?还只是因为 它不知道 Promise 应该如何运作?说实话,这并不重要。不管是哪种情况,它都是不可信 任的。

尽管如此,我们还是都可以把这些版本的 p 传给 Promise.resolve(..),然后就会得到期望中的规范化后的安全结果：

```
Promise.resolve(p)
  .then(
    function fulfilled(val) {
      console.log(val); // 42
    },
    function rejected(err) {
      // 永远不会到达这里
    }
  )
```
Promise.resolve(..) 可以接受任何 thenable,将其解封为它的非 thenable 值。从 Promise. resolve(..) 得到的是一个真正的 Promise,是一个可以信任的值。如果你传入的已经是真 正的 Promise,那么你得到的就是它本身,所以通过 Promise.resolve(..) 过滤来获得可信 任性完全没有坏处。


对于用 Promise.resolve(..) 为所有函数的返回值(不管是不是 thenable) 都封装一层。另一个好处是,这样做很容易把函数调用规范为定义良好的异 步任务。如果 foo(42) 有时会返回一个立即值,有时会返回 Promise,那么 Promise.resolve( foo(42) ) 就能够保证总会返回一个 Promise 结果。而且 避免 Zalgo 就能得到更好的代码。


**链式流**

Promise有两个固有行为特性：
- 每次你对Promise 调用 then(..),它都会创建并返回一个新的 Promise，我们可以将其链接起来
- 不过从 then(..) 调用的完成回调（第一个参数）返回的值是什么，它都会自动设置为被链接Promise（第一点中的）的完成。

思考：
```
var p = Promise.resolve(21);
var p2 = p.then(function(v) {
  console.log(v); //21
  // 用值42填充p2
  return v * 2;
})
// 连接p2
p2.then(function(v) {
  console.log(v); // 42
})
```
我们通过返回 v * 2( 即 42),完成了第一个调用 then(..) 创建并返回的 promise p2。p2 的 then(..)调用在运行时会从return v * 2语句接受完成值。当然,p2.then(..)又创建了 另一个新的 promise,可以用变量 p3 存储。

但这样我们会创建一个临时变量，所以我们就可以使用链式调用来消除这个临时变量
```
var p = Promise.resolve(21);
var p2 = p.then(function(v) {
  console.log(v); //21
  // 用值42填充p2
  return v * 2;
})
// 这里是链接的promise
.then(function(v) {
  console.log(v); // 42
})
```
现在第一个 then(..)就是异步序列中的第一步，第二个 then(..)就是第二步。这可以一直任意扩展下去。只要保持把先前的 then(..)连到自动创建的每一个Promise即可。

简单总结一下使用链式流程控制可行的Promise固有特性
- 调用Promise的then(..)会自动创建一个新的Promise从调用返回。
- 在完成或拒绝处理函数内部，如果返回一个值或抛出一个异常，新返回的（可链接的）Promise就会相应地决议。
- 如果完成或拒绝处理函数返回一个Promise，它将会被展开，这样一来，不管它的决议值是什么，都会成为当前 then(..)返回的链接Promise的决议值。

**术语：决议。完成以及拒绝**
决议在各种文献(包括本书)中是用来描述“为 Promise 设 定最终值 / 状态”。前面我们已经多次使用“Promise 决议”来表示完成或拒绝 Promise。


**错误处理**
错误处理使用的是`.catch`,链式的方式


**Promise.all([..])**

Promise.all([ .. ]) 需要一个参数,是一个数组,通常由 Promise 实例组成。从 Promise. all([ .. ]) 调用返回的 promise 会收到一个完成消息(代码片段中的 msg)。这是一个由所 有传入 promise 的完成消息组成的数组,与指定的顺序一致(与完成顺序无关)。

**Promise.race([..])**
Promise.race([ .. ])也接受单个数组参数。这个数组由一个或多个Promise、thenable或 立即值组成。立即值之间的竞争在实践中没有太大意义,因为显然列表中的第一个会获 胜,就像赛跑中有一个选手是从终点开始比赛一样!

一项竞赛需要至少一个“参赛者”。所以,如果你传入了一个空数组,主 race([..]) Promise 永远不会决议,而不是立即决议。这很容易搬起石头砸 自己的脚! ES6 应该指定它完成或拒绝,抑或只是抛出某种同步错误。遗憾 的是,因为 Promise 库在时间上早于 ES6 Promise,它们不得已遗留了这个 问题,所以,要注意,永远不要递送空数组。

**new Promise(..)构造器**

有启示性的构造器 Promise(..) 必须和 new 一起使用,并且必须提供一个函数回调。这个 回调是同步的或立即调用的。这个函数接受两个函数回调,用以支持 promise 的决议。通 常我们把这两个函数称为 resolve(..) 和 reject(..):
```
var p = new Promise( function(resolve,reject){ // resolve(..)用于决议/完成这个promise
// reject(..)用于拒绝这个promise
} );
```
reject(..) 就是拒绝这个 promise;但 resolve(..) 既可能完成 promise,也可能拒绝,要 根据传入参数而定。如果传给 resolve(..) 的是一个非 Promise、非 thenable 的立即值,这 个 promise 就会用这个值完成。
