#你不知道的JavaScript

### 第一章 类型

在ES5.1规范中，关于类型的界定是：
> 本规范中的运算法则所操纵的值均有相应的类型。本节中定义了所有可能出现的类型，ECMAScript类型又进一步细分为语言类型和规范类型。
> ECMAScript语言中所有的值都有一个对应的语言类型。ECMAScript语言类型也包括Undefined、Null、String、Number、Boolean和Object

**内置类型**
JavaScript一共有7中内置类型：
- Number
- String
- Undefined
- null
- Boolean
- Object
- Symbol(es6 新增)

除了Object类型称为对象类型外，其余的都称之为基本类型

可以使用`typeof`运算符来查看值的类型,但需要注意的是`null`类型不在此列，`typeof null === 'object' //true`用`typeof`来检测`null`会返回`object`的基本类型值

还有一种情况是`function`(函数)，用typeof来检测类型的时候，会是`typeof function(){...} === 'function'`。

这样看来函数也是JavaScript的内置类型之一。然而规范说的是，`function`是`object`的“`子类型`”

数组`Array`也是对象。也是`object`的一个`子类型` 。`typeof [1, 2, 3] === 'object'`


**值和类型**
变量是没有类型的，只有值才有。因为变量是随时持有任何类型的值

变量已声明未赋值。是`undefined`，相反，未声明的是`undeclared`（未声明）

例如：
```
var a;
a; // undefined
b; //ReferenceError b is not defined
```

如何检测在程序中的参数or变量，不会出现ReferenceError错误。这是需要使用typeof
```
// 这样会抛出错误
if(DEBUG) {...}
// 这样是安全的
if(typeof DEBUG === 'undefined'){...}
```

### 小结
- JavaScript有7中内置类型：Number、String、Undefined、Boolean、Null、Object、Symbol（es6新增），可以用typeof运算符查看，但要注意null。null用typeof查看会是'object'
- 变量没有类型，但它们持有的值有类型。类型定义了值的行为特征
- 很多开发人员将Undefined和undeclared混为一谈，但在JavaScript中它们是两码事。Undefined是值的一种，undeclared则表示变量没有被声明过
- 遗憾的是，JavaScript缺把它们混为一谈。在我们试图访问“undeclared”变量时会出现这样的报错：`ReferenceError: a is not defined`，并且typeof对Undefined和undeclared变量都返回”undefined“
- 然而，通过typeof的安全防范机制（阻止报错）来检测undeclared变量。有时候是个不错的选择
