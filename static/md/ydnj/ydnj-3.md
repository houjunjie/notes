### 第三章 原生函数

JavaScript中的内建函数也叫原生函数

常用的原生函数有
- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()
- Symbol() --- es6新增的

这些实际都是内建函数

原生函数都可以当做构建函数使用。因为构建出来的是对象，所以我们使用typeof来检测都是object类型的

所有typeof返回值为‘object’的对象（如数组）都包含一个内部属性[[Class]] (我们可 以把它看作一个内部的分类,而非传统的面向对象意义上的类)。这个属性无法直接访问, 一般通过 Object.prototype.toString(..) 来查看。例如:
```
Object.prototype.toString.call([1, 2, 3])
// [object Array]
Object.prototype.toString.call( /regex-literal/i );
// "[object RegExp]"
Object.prototype.toString.call( null );
// "[object Null]"
Object.prototype.toString.call( undefined );
// "[object Undefined]"
.....
```
所以我们可以根据这个特性，用来检测该对象是什么类型的。


关于数组(array)、对象(object)、函数(function)和正则表达式,我们通常喜欢以常 量的形式来创建它们。实际上,使用常量和使用构造函数的效果是一样的(创建的值都是 通过封装对象来包装)。

Array 构造函数只带一个数字参数的时候,该参数会被作为数组的预设长度(length),而 非只充当数组中的一个元素。

这实非明智之举:一是容易忘记,二是容易出错。 更为关键的是,数组并没有预设长度这个概念。这样创建出来的只是一个空数组,只不过它的 length 属性被设置成了指定的值。

`我们将包含至少一个“空单元”的数组称为“稀疏数组”。`

原生构造函数有自己的 .prototype 对象,如 Array.prototype、String.prototype 等。

这些对象包含其对应子类型所特有的行为特征。

例如,将字符串值封装为字符串对象之后,就能访问 String.prototype 中定义的方法。

Function.prototype 是一个空函数,RegExp.prototype 是一个“空”的正则表达式(无 任何匹配),而 Array.prototype 是一个空数组。对未赋值的变量来说,它们是很好的默 认值。
```
function isThisCool(vals,fn,rx) {
  vals = vals || Array.prototype;
  fn = fn || Function.prototype;
  rx = rx || RegExp.prototype;
  return rx.test(
    vals.map( fn ).join( "" )
  );
}
isThisCool();       // true
isThisCool(
  ["a","b","c"],
  function(v){ return v.toUpperCase(); },
  /D/
);
// false

```
从 ES6 开始,我们不再需要使用 vals = vals || .. 这样的方式来设置默认 值(参见第 4 章),因为默认值可以通过函数声明中的内置语法来设置(参 见第5章)。

这种方法的一个好处是 .prototypes 已被创建并且仅创建一次。相反,如果将 []、
function(){} 和 /(?:)/ 作为默认值,则每次调用 isThisCool(..) 时它们都会被创建一次 (具体创建与否取决于 JavaScript 引擎,稍后它们可能会被垃圾回收),这样无疑会造成内存和 CPU 资源的浪费。

另外需要注意的一点是,如果默认值随后会被更改,那就不要使用 Array.prototype。上例 中的 vals 是作为只读变量来使用,更改 vals 实际上就是更改 Array.prototype,而这样会 导致前面提到过的一系列问题!

### 小结
JavaScript为基本数据类型提供了封装对象，称为原生对象（如Array，String，Number等）。它们为基本数据类型值提供了该子类型所特有的方法和属性(如:String#trim() 和 Array#concat(..))。

对于简单标量基本类型值,比如 "abc",如果要访问它的 length 属性或 String.prototype 方法,JavaScript 引擎会自动对该值进行封装(即用相应类型的封装对象来包装它)来实 现对这些属性和方法的访问。

例如
```
var a = 42
var b = 42 + ''; // 隐式强制类型转换
var c = String( a ); // 显式强制类型转换
```
对变量 b 而言,强制类型转换是隐式的;由于 + 运算符的其中一个操作数是字符串,所以 是字符串拼接操作,结果是数字 42 被强制类型转换为相应的字符串 "42"。
而 String(..) 则是将 a 显式强制类型转换为字符串。

**抽象值操作**
* ToString
规范的 9.8 节中定义了抽象操作 `ToString`,它负责处理非字符串到字符串的强制类型转换。

基本类型值的字符串化规则：null转换为"null"，undefined转换为"undefined"。数字的字符串化遵循通用规则，不过第2章中讲过的那些极小和极大的数字使用指数形式
```
// 1.07 连续乘以七个 1000
var a = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;
// 七个1000一共21位数字 a.toString(); // "1.07e21"
```

数组的默认 toString() 方法经过了重新定义,将所有单元字符串化以后再用 "," 连接起 来:
```
var a = [1,2,3];
a.toString(); // "1,2,3"
```

工具函数JSON.stringify(..)在将JSON对象序列化为字符串时也用到了ToString

JSON字符串化并非严格意义上的强制类型转换，因为其中也涉及ToString的相关规则。

对大多数简单值来说，JSON字符串化和toString()的效果基本相同，只不过序列化的结果总是字符串
```
JSON.stringify( 42 ); // "42"
JSON.stringify( "42" ); // ""42""(含有双引号的字符串) JSON.stringify( null ); // "null"
JSON.stringify( true ); // "true"
```
所有安全的 JSON 值(JSON-safe)都可以使用 JSON.stringify(..) 字符串化。安全的 JSON 值是指能够呈现为有效 JSON 格式的值。

为了简单起见,我们来看看什么是不安全的 JSON 值。undefined、function、symbol (ES6+)和包含循环引用(对象之间相互引用,形成一个无限循环)的对象都不符合 JSON
结构标准,支持 JSON 的语言无法处理它们。

JSON.stringify(..) 在对象中遇到 undefined、function 和 symbol 时会自动将其忽略,在数组中则会返回 null(以保证单元位置不变)。

例如
```
JSON.stringify(undefined) // undefined
JSON.stringify(function() {}) //undefined

JSON.stringify(
  [1, undefined, function(){}, 4]
); //"[1, null, null, 4]"

JSON.stringify(
  { a:2, b:function(){}}
); //"{"a":"2"}"
```
对包含循环引用的对象执行JSON.stringify(..)会出错。

如果对象中定义了toJSON()方法，JSON字符串化时会首先调用该方法，然后用它的返回值来进行序列化。

如果要对含有非法 JSON 值的对象做字符串化,或者对象中的某些值无法被序列化时,就 需要定义 toJSON() 方法来返回一个安全的 JSON 值。

例如：
```
var o = { };
var a = { b: 42,
  c: o,
  d: function(){}
};
// 在a中创建一个循环引用
o.e = a;
// 循环引用在这里会产生错误
// JSON.stringify(a)

// 自定义的JSON序列化
a.toJSON = function() {
  // 序列化仅包含b
  return {b: this.b}
}

JSON.stringify(a) //"{"b":42}"
```

很多人误以为 toJSON() 返回的是 JSON 字符串化后的值,其实不然,除非我们确实想要对 字符串进行字符串化(通常不会!)。toJSON() 返回的应该是一个适当的值,可以是任何 类型,然后再由 JSON.stringify(..) 对其进行字符串化。

也就是说,toJSON() 应该“返回一个能够被字符串化的安全的 JSON 值”,而不是“返回 一个 JSON 字符串”。

有几个不为人所知却很有用的功能

我们可以向JSON.stringify(..)传递一个可选参数replacer，它可以是数组或者函数，用来指定对象序列化过程中哪些属性应该被处理，哪些应该被排除，和toJSON()很像。

如果 replacer 是一个数组,那么它必须是一个字符串数组,其中包含序列化要处理的对象 的属性名称,除此之外其他的属性则被忽略。

如果 replacer 是一个函数,它会对对象本身调用一次,然后对对象中的每个属性各调用 一次,每次传递两个参数,键和值。如果要忽略某个键就返回 undefined,否则返回指定 的值。

```
var a = { b: 42,
c: "42",
d: [1,2,3] };
JSON.stringify( a, ["b","c"] ); // "{"b":42,"c":"42"}"
JSON.stringify( a, function(k,v){
    if (k !== "c") return v;
} );
// "{"b":42,"d":[1,2,3]}"

```
如果 replacer 是函数,它的参数 k 在第一次调用时为 undefined(就是对对象 本身调用的那次)。if 语句将属性 "c" 排除掉。由于字符串化是递归的,因 此数组 [1,2,3] 中的每个元素都会通过参数 v 传递给 replacer,即 1、2 和 3, 参数 k 是它们的索引值,即 0、1 和 2。

JSON.stringify(..)并不是强制类型转换。这里介绍是因为它涉及ToString强制类型转换，具体表现在以下两点。
- 字符串、数字、布尔值和null的JSON.stringift(..)规则与ToString基本相同
- 如果传递给JSON.stringify(..)的对象中定义了toJSON()方法，那么该方法会在字符串化前调用，以便将对象转换成为安全的JSON值

* ToNumber
有时候我们需要将非数字值当作数字来使用，比如数学运算。为此 ES5 规范在 9.3 节定义了 抽象操作 ToNumber。

其中 true 转换为 1,false 转换为 0。undefined 转换为 NaN,null 转换为 0。

数字常量的语法规则与 ToNumber 处理字符串所遵循的规则之间差别不大,这 里不做进一步介绍,可参考 ES5 规范的 9.3.1 节。

对象(包括数组)会首先被转换为相应的基本类型值,如果返回的是非数字的基本类型 值,则再遵循以上规则将其强制转换为数字。

为了将值转换为相应的基本类型值,抽象操作 ToPrimitive(参见 ES5 规范 9.1 节)会首先 (通过内部操作 DefaultValue,参见 ES5 规范 8.12.8 节)检查该值是否有 valueOf() 方法。 如果有并且返回基本类型值,就使用该值进行强制类型转换。如果没有就使用 toString()的返回值(如果存在)来进行强制类型转换。

* ToBoolean

JavaScript 中有两个关键词 true 和 false,分别代表布尔类型 中的真和假。我们常误以为数值 1 和 0 分别等同于 true 和 false。在有些语言中可能是这 样,但在 JavaScript 中布尔值和数字是不一样的。虽然我们可以将 1 强制类型转换为 true, 将 0 强制类型转换为 false,反之亦然,但它们并不是一回事。

以下这些是假值
- undefined
- null
- false
- +0、-0和null
- ""

假值转换成Boolean都是为false。假值以外的都是真值


**字符串和数字之间的显式转换**

字符串和数字之间的转换是通过 String(..) 和 Number(..) 这两个内建函数(原生构造函 数,参见第 3 章)来实现的,请注意它们前面没有 new 关键字,并不创建封装对象。

除了上述说的两个方法，还有一个toString方法也是显式的。不过其中涉及了隐式转换。因为toString()对42这样的基本类型值不适合，所以JavaScript引擎会自动为42创建一个封装对象，然后对该对象调用toString()；所以这里显式转换中含有隐式转换

在 JavaScript 开源社区中,一元运算 + 被普遍认为是显式强制类型转换。

不过这样有时候也容易产生误会。例如
```
var c = '3.14';
var d = 5+ +c;
d; //8.14
```
一元运算符 - 和 + 一样,并且它还会反转数字的符号位。由于 -- 会被当作递减运算符来处 理,所以我们不能使用--来撤销反转,而应该像- -"3.14"这样,在中间加一个空格,才 能得到正确结果 3.14。

一元运算符 + 的另一个常见用途是将日期(Date)对象强制类型转换为数字,返回结果为 Unix 时间戳,以微秒为单位(从 1970 年 1 月 1 日 00:00:00 UTC 到当前时间):

```
var d = new Date( "Mon, 18 Aug 2014 08:53:06 CDT" );
+d; // 1408369986000
```
我们常用下面的方法来获得当前的时间戳,例如:
```
 var timestamp = +new Date();
```

JavaScript 有一处奇特的语法,即构造函数没有参数时可以不用带 ()。于是 我们可能会碰到var timestamp = +new Date;这样的写法。这样能否提高代 码可读性还存在争议,因为这仅用于new fn(),对一般的函数调用fn()并 不适用

获取当前时间戳还有一种方法
```
var timestamp = new Date().getTime();
// var timestamp = (new Date()).getTime();
// var timestamp = (new Date).getTime();
```
不过最好还是使用 ES5 中新加入的静态方法 Date.now():
```
var timestamp = Date.now();
```
为老版本浏览器提供 Date.now() 的 polyfill 也很简单:
```
if (!Date.now) {
    Date.now = function() {
        return +new Date();
    };
}
```

我们不建议对日期类型使用强制类型转换,应该使用 Date.now() 来获得当前的时间戳,使
用 new Date(..).getTime() 来获得指定时间的时间戳。
