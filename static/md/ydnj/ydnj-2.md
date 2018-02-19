### 值

**数组**
和其它强类型语言不同，在JavaScript中，数组可以容纳任何类型的值，可以是字符串、数字、对象（object）、甚至是其它数组（多维数组就是这样实现）

> 使用delete运算符可以删除数组元素，但是不会改变数量的length。

稀疏数组（sparse array，即含有空白单元格的数组）

类数组（一组通过数字索引的值）

有时候我们需要把类数组转行成真正的数组，一般通过数组工具函数（如indexOf(...)、concat(...)、forEach(...)）来实现

例如一下DOM查询操作返回的DOM元素列表，它们并不是正在意义上的数组，但是否相似。还有arguments对象。我们通常使用工具函数`slice(...)`来转换
```
function foo() {
  var arr = Array.prototype.slice.call(arguments);
  arr.push('bam');
  console.log(arr);
}
```

在es6的内置工具函数中有一个from（Array.from(...)）的方法也能实现同样的功能

**字符串**
字符串经常当成字符数组。但在JavaScript中字符串和字符数组并不是一回事。最多就是相似而已。它们都是类数组。都有length属性以及indexOf(..)（从es5开始数组支持此方法）和concat(..)方法

JavaScript中的字符串是不可变，而数组是可变的。

字符串不可变是指字符串的成员函数不会改变其原始值，而是创建并返回一个新的字符串。而数组的成员函数都是在其原始值上进行操作的

许多数组函数用来处理字符串很方便。虽然字符串没有这些函数，但是可以通过”借用“数组的非变更方法来处理字符串；
```
var a = 'ajie';
var b = ['a', 'j', 'e'];
a.join; //undefined
a.map; //undefined

var c = Array.prototype.join.call(a, '-');
var d = Array.prototype.map.call(a, function(v) {
  return v.toUpperCase() + '.';
}).join("");
c; // "a-j-i-e"
d; // "A.J.I.E."
```
可惜我们无法“借用”数组的可变更成员函数，因为字符串是不可变的。
```
//返回值仍然是字符串“foo”的一个封装对象
Array.prototype.reverse.call(a);
```
一个变通（破解）的办法是先将字符串转为数组，待处理完后再将结果转换回字符串。

```
var c = a
      // 将a的值转换为字符串数组
      .split('')
      // 将数组中的字符串进行倒转
      .reverse()
      // 将数组中的字符拼接回字符串
      .join("");
c; // "eija"
```

**数字**
JavaScript只有一种数值类型，就是 munber（数字），包括“整数”和带小数的十进制数。JavaScript和其它语言不通，它没有真正意义上的整数。目前只有数字类型。

JavaScript中的数字类型是基于IEEE 754标准来实现的。该标准也称为“浮点数”。JavaScript使用的是“双精度”格式（也就是64位二进制）

二进制的浮点数最大的问题（不仅是JavaScript，其它基于IEEE 754规范的语言也是如此）
```
0.1+0.2 === 0.3 //false
```
因为二进制浮点数中的0.1和0.2并不是十分精确。它们相加并非刚好等于0.3，而是一个比较接近的数字 0.30000000000000004,所以条件判断结果为 false。

那应该怎么判断它们相等呢？

最简单的就是设置一个误差范围值，也叫“机器精度”。对JavaScript 的数字来说,这个值通常是 2^-52 (2.220446049250313e-16)。

从 ES6 开始,该值定义在 Number.EPSILON 中,我们可以直接拿来用,也可以为 ES6 之前的版本写 polyfill:
```
if(Number.EPSILON) {
  Number.EPSILON = Math.pow(2,-52);
}
```

可以使用Number.EPSILON来比较两个数字是否相等（在指定误差范围内）

```
function numbersCloseEnoughToEqual(n1,n2) {
  return Math.abs( n1 - n2 ) < Number.EPSILON;
}
var a = 0.1 + 0.2;
var b = 0.3;
numbersCloseEnoughToEqual( a, b ); //true
numbersCloseEnoughToEqual( 0.0000001, 0.0000002 );  // false
```

整数的安全范围：

数字的呈现方式决定了“整数”的安全范围远远小于Number.MAX_VALUE

能被“安全”呈现的最大整数是`2^53 - 1`。即9007199254740991。在es6中被定义为Number.MAX_SAVE_INTEGER。最小的整数是 -9007199254740991。在es6中被定义为Nuner.MIN_SAVE_INTEGER；

检测是否为整数

要检测一个值是否是整数,可以使用 ES6 中的 Number.isInteger(..) 方法:
```
Number.isInteger( 42 );     // true
Number.isInteger( 42.000 ); // true
Number.isInteger( 42.3 );   // false
```
也可以为 ES6 之前的版本 polyfill Number.isInteger(..) 方法:
```
if(Number.isInteger){
  Number.isInteger = function(num){
    return typeof num == 'number' && num % 1 == 0;
  }
}
```

**特殊的值**
undefined类型只有一个值，就是undefined; null类型也只有一个值，就是null

undefined和null常用来表示“空的”值或“不是值”的值。二者之间有一些细微的差 别。例如:
- undefined 指没有值 或者 指从未赋值
- null 指不是值 或者 指曾赋过值,但是目前没有值

null是一个特殊的关键字。不是标识符。我们不能将其当成变量来使用和赋值。然而undefined却是一个标识符，可以用来作为变量和赋值

void 运算符：

undefined 是一个内置标识符(除非被重新定义,见前面的介绍),它的值为 undefined, 通过 void 运算符即可得到该值

表达式void ___没有返回值,因此返回结果是undefined。void并不改变表达式的结果, 只是让表达式不返回值:
```
var a = 42;
console.log( void a, a ); // undefined 42
```

**特殊的数字**
如果数学运算的操作数不是数字类型(或者无法解析为常规的十进制或十六进制数字), 就无法返回一个有效的数字,这种情况下返回值为 NaN。

NaN意指“不是一个数字”(not a number),这个名字容易引起误会,后面将会提到。将它 理解为“无效数值”“失败数值”或者“坏数值”可能更准确些。例如:
```
var a = 2 / "foo";      // NaN
typeof a === "number";  // true
```

根据 NaN 是 JavaScript 中唯 一一个不等于自身的值可以判断出一个值是否为NaN，在es6中我们可以直接使用Number.isNaN(xx)来判断。
```
if (!Number.isNaN) {
  Number.isNaN = function(n) {
      return n !== n;
  };
}
```

零值：
在JavaScript中我们与一个0（+0）和-0。为什么需要这样。

有些应用程序中的数据需要以级数形式来表示(比如动画帧的移动速度),数字的符号位 (sign)用来代表其他信息(比如移动的方向)。此时如果一个值为 0 的变量失去了它的符号位,它的方向信息就会丢失。所以保留 0 值的符号位可以防止这类情况发生

-0 除了可以用作常量以外,也可以是某些数学运算的返回值。例如:

```
var a = 0 / -3; // -0
var b = 0 * -3; // -0
```
加法和减法运算不会得到负零

根据规范,对负零进行字符串化会返回 "0"
```
var a = 0 / -3;
// 至少在某些浏览器的控制台中显示是正确的 a; // -0
// 但是规范定义的返回结果是这样!
a.toString();// "0"
a + "";// "0"
String( a );// "0"
// JSON也如此,很奇怪
JSON.stringify( a );// "0"
```

`JSON.stringify(-0) 返回 "0",而 JSON.parse("-0") 返回 -0。`

要区分 -0 和 0,不能仅仅依赖开发调试窗口的显示结果,还需要做一些特殊处理:
```
function isNegZero(n) {
    n = Number( n );
    return (n === 0) && (1 / n === -Infinity);
}
isNegZero( -0 );
isNegZero( 0 / -3 );
isNegZero( 0 );
// true
// true
// false
```

ES6 中新加入了一个工具方法 `Object.is(..)` 来判断两个值是否绝对相等,可以用来处理 上述所有的特殊情况(NaN,+0和-0等)

对于 ES6 之前的版本,Object.is(..) 有一个简单的 polyfill:
```
if (!Object.is) {
  Object.is = function(v1, v2){
    //判断是否是-0
  if (v1 === 0 && v2 === 0) {
    return 1 / v1 === 1 / v2 //根据正负无穷数来比较 -Infinity !== Infinity
  }
  //判断时候是NaN
  if (v1 !== v1) {
    return v2 !== v2;//根据自身不相等
  }
  // 其他情况
  return v1 === v2;
}
```

