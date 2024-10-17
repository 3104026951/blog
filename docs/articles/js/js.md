# JS

## JS数据检测方法
`Object.prototype.toString.call('str')`

## 判断数组的方法
- Object.prototype.toString.call()
- Array.isArray()

## null和undefined的区别
- 他们都是基础类型，都只有一个值
- undefined是未定义，null是空对象，都可以做非空判断
- null一般是后端的初始值

## this
this是一个在运行时才进行绑定的引用，在不同的情况下会被绑定不同的对象

## this绑定的指向
- 函数调用的时候指向全局window
- 方法调用的时候，指向这个对象
- 构建器调用的时候，指向这个新创建的对象
- apply,call 调用的时候指向了传参的第一个this绑定的对象
- bind 调用的时候传入一个对象，这个this指向这个对象
- 箭头函数this指向他外层作用域的this

## Map和Object的区别
- Object的键值只能是String和symbol,Map可以是很多
- Map的键是有序的，Object是无序的
- Map的个数可以通过size获取

## JSON.stringify深拷贝的缺点
- 如果obj里面有时间对象，时间对象要变成字符串
- 如果obj里面有函数或者undefined，会直接被丢掉

## 闭包
- 定义：函数执行的时候回产生一个私有上下文，这个上下文能保护里面使用的变量不受外界干扰，如果这个上下文里面的变量被外部引用，这里面的就不会释放，闭包是一个保存状态和私有变量的机制

## 闭包使用场景
- 返回函数
- 节流防抖
- 回调函数
- hooks
- 函数柯里化

## 执行上下文的类型
1. 全局执行上下文
任何不在函数内部的都是全局执行上下文，它首先会创建一个全局的window对象，并且设置this的值等于这个全局对象，一个程序中只有一个全局执行上下文
2. 函数执行上下文
当一个函数被调用时，就会为该函数创建一个新的执行上下文，函数的上下文可以有任意多个

## 作用域
变量的有限范围

- 1.全局作用域
    - 全局作用域下声明的变量叫全局变量
    - 全局作用域无法访问局部作用域中的变量
- 2.函数作用域
    - 调用函数时会创建函数作用域，函数执行完毕以后，作用域销毁。每调用一次函数就会建一个新的函数作用域，他们之间是相互独立的。
    - 在函数作用域中可以访问全局变量，在函数的外面无法访问函数内的变量。
    - 当在函数作用域操作一个变量时，它会先在自身作用域中寻找，如果有就直接使用，如果没有就向上一作用域中寻找，直到找到全局作用域，如果全局作用域中仍然没有找到，则会报错。
- 3.块级作用域
    - 在ES6中引入的作用域，{}中使用的const和let外部环境访问不到
- 4.词法作用域
    - 词法作用域是静态的作用域，无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由**函数被声明时所处的位置**决定。
    - 词法作用域就是你在写代码的时候就已经决定了变量的作用域
    
## 执行上下文和作用域的区别
执行上下文在运行时确定，随时可能改变。作用域在定义时就确定，并且不会改变

## 原型和原型链
1. `prototype`是显示原型，是构造函数的属性
2. `__proto__` 是隐式原型，是实例的属性

构造函数的`prototype`和实例的`__proto__`指向同一个对象，这个对象叫做原型对象

```js
function Fn() {
  this.name = '呵呵'
};
let fn = new Fn()
console.log(fn.__proto__ === Fn.prototype) // true
```
constructor是原型对象里面的一个熟悉，指向这个函数
`Fn.prototype.constructor == Fn`

-   `函数`是`Function构造函数`的实例
-   `对象`是`Object构造函数`的实例
-   `Function构造函数`和`Object构造函数`他们是都是`Function构造函数`的实例

```js
console.log(Function.prototype === Object.__proto__) // true 

console.log(Function.prototype === Function.__proto__) // true
```
原型链就是`__proto__`的路径，所有对象的原型链的结尾都是`Object.prototype`,`Object.prototype`的`__proto__`最后指向`null`

所以继承的主要方式就是吧这个构造函数的原型`prototype`指向一个继承的实例


## Promise
Promise是一种异步编程的解决方案，主要是用来解决回调地狱
- Promise是立即执行的
- Promise的状态是不可修改的
- Promise是可以链式调用的


## async/await
同步写法来执行异步代码，是Promise+generator的语法糖

## JS同步和异步
js是单线程的，同步代码按顺序执行，异步代码进异步队列，根据eventloop进行执行
 
## 宏任务和微任务
- 宏任务：`<script>`代码段,setTimeout,setInterval,requestAnimationFrame
- 微任务：Promise,nextTick,

先执行微任务队里里面的任务，之后再执行宏任务的队列中的任务·

## 箭头函数
- 箭头函数不能用于构造函数
- 箭头函数没有自己的this，他的this是他外层作用域的this
- 箭头函数没有原型对象

## Commonjs 和 ES6 Module的区别
- Commonjs是拷贝输出，ES6模块化是引用输出
- Commonjs是运行时加载，ES6模块化是编译时输出接口
- Commonjs是单个值导出，ES6模块化可以多个值导出
- Commonjs是动态语法可写在函数体中，ES6模块化静态语法只能写在顶层

  




## 123

<script setup>

import FirstComponent from '../../components/first.vue'

</script>


<FirstComponent />

