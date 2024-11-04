## ES8

1. **异步函数**：ES8 引入了 `async/await` 语法，使得异步编程更加直观和易于理解。例如，`async function fetchData() { const data = await fetch('https://api.example.com/data'); console.log(data); }`。

2. **Object.values() 和 Object.entries() 方法**：ES8 引入了 `Object.values()` 和 `Object.entries()` 方法，用于获取对象的属性值和属性键值对。例如，`const obj = { a: 1, b: 2 }; console.log(Object.values(obj)); // [1, 2] console.log(Object.entries(obj)); // [['a', 1], ['b', 2]]`。

3. **Object.getOwnPropertyDescriptors() 方法**：ES8 引入了 `Object.getOwnPropertyDescriptors()` 方法，用于获取对象的所有属性描述符。例如，`const obj = { a: 1, b: 2 }; console.log(Object.getOwnPropertyDescriptors(obj));`。

4. **Promise.prototype.finally() 方法**：ES8 引入了 `Promise.prototype.finally()` 方法，用于在 Promise 对象的状态改变后执行指定的回调函数。

## ES9

1. **异步迭代**：ES9 引入了异步迭代的概念，使得在异步操作中使用 `for...of` 循环变得更加方便。例如，`async function* asyncGenerator() { for await (const x of values) { yield x; } }`。


2. **Rest/Spread 属性**：ES9 允许在对象字面量中使用剩余（rest）和展开（spread）属性。例如，`const obj = { a: 1, ...rest };` 和 `const obj = { ...spread, a: 1 };`。

3. **模板字符串修订**：ES9 对模板字符串进行了修订，允许在模板字符串中嵌套模板字符串。例如，`const name = 'World'; console.log(`Hello, ${`Good morning, ${name}`}`);`。

## ES10


1. **BigInt**：ES10 引入了 `BigInt` 类型，用于表示大于 `2^53 - 1` 的整数。例如，`const bigInt = 123n;`。

2. **Array.prototype.flat() 和 Array.prototype.flatMap() 方法**：ES10 引入了 `Array.prototype.flat()` 和 `Array.prototype.flatMap()` 方法，用于将嵌套数组展平。例如，`const arr = [1, [2, [3, [4]], 5]]; console.log(arr.flat(2)); // [1, 2, 3, [4], 5]`。

3. **Object.fromEntries() 方法**：ES10 引入了 `Object.fromEntries()` 方法，用于将键值对列表转换为对象。例如，`const entries = [['a', 1], ['b', 2]]; console.log(Object.fromEntries(entries)); // { a: 1, b: 2 }`。

## ES11

4. **空值合并运算符（Nullish Coalescing Operator）**：ES11 引入了空值合并运算符 `??`，用于在左侧操作数为 `null` 或 `undefined` 时返回右侧操作数。例如，`const value = null ?? 'default'; // 'default'`。

5. **可选链运算符（Optional Chaining Operator）**：ES11 引入了可选链运算符 `?.`，用于在访问对象的属性或调用对象的方法之前，先检查对象是否为 `null` 或 `undefined`。例如，`const value = obj?.prop?.[0];`。

6. **BigInt**：ES11 对 `BigInt` 类型进行了修订，使其可以与 `Number` 类型进行混合运算。例如，`const bigInt = 123n; const number = 123; console.log(bigInt + number); // 246`。

7. **Promise.allSettled() 方法**：ES11 引入了 `Promise.allSettled()` 方法，用于等待所有 Promise 对象的状态改变，无论它们是成功还是失败。例如，`Promise.allSettled([Promise.resolve(1), Promise.reject(2)])
  .then(results => console.log(results)); // [{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 2 }]`。

1. **String.prototype.replaceAll() 方法**：ES11 引入了 `String.prototype.replaceAll()` 方法，用于替换字符串中所有匹配的子字符串。例如，`const str = 'Hello, World! Hello, World!'; console.log(str.replaceAll('World', 'JavaScript')); // 'Hello, JavaScript! Hello, JavaScript!'`。


2. **全局对象全局绑定**：ES11 将 `globalThis` 对象添加到全局作用域中，作为访问全局对象的统一方式。例如，`console.log(globalThis === window); // 在浏览器中为 true`。

## ES12

1. **数字分隔符**：ES12 引入了数字分隔符，允许在数字字面量中使用下划线 `_` 作为千位分隔符。例如，`const number = 1_000_000;`。

2. **String.prototype.replaceAll() 方法**：ES12 对 `String.prototype.replaceAll()` 方法进行了修订，使其可以接受一个正则表达式作为参数。例如，`const str = 'Hello, World! Hello, World!'; console.log(str.replaceAll(/World/g, 'JavaScript')); // 'Hello, JavaScript! Hello, JavaScript!'`。

3. **Promise.any() 方法**：ES12 引入了 `Promise.any()` 方法，用于等待第一个成功的 Promise 对象。例如，`Promise.any([Promise.reject(1), Promise.reject(2)])
  .then(result => console.log(result)); // Promise rejected with 1`。

4. **Array.prototype.sort() 的稳定性**：ES12 对 `Array.prototype.sort()` 方法进行了修订，使其在排序时保持稳定性。这意味着在排序时，相等的元素会保持它们在原始数组中的顺序。

