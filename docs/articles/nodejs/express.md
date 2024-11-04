## express简介
Express 是一个基于 Node.js 的快速、开放、极简的 Web 开发框架。它提供了一系列强大的功能，包括路由、中间件、模板引擎等，可以帮助开发者快速构建 Web 应用程序。

## express中间件
### 1. 中间件
中间件是Express中一个非常重要的概念，中间件是一个函数，它可以访问请求对象（req）、响应对象（res）和应用程序的请求-响应循环中的下一个中间件函数。下一个中间件函数通常通过调用`next()`来传递。中间件函数可以执行以下任务：

- 执行任何代码。
- 修改请求和响应对象。
- 终结请求-响应循环。
- 调用堆栈中的下一个中间件函数。
- 如果函数没有调用`next()`并且没有终结请求-响应循环，则表示该请求未得到处理，将会发生错误。

### 2. 中间件分类
- 应用程序级别中间件
- 路由级别中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件

### 3. 中间件使用

#### 应用程序级别中间件
应用程序级别中间件绑定到`app`实例，使用`app.use()`和`app.METHOD()`，其中`METHOD`是HTTP请求方法，例如`GET`、`PUT`、`POST`等。

```js
const express = require('express');
const app = express();

// 应用程序级别中间件
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

#### 路由级别中间件
路由级别中间件绑定到`express.Router()`的实例，使用`router.use()`和`router.METHOD()`。

```js
const express = require('express');
const router = express.Router();
const app = express();

// 路由级别中间件
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

#### 错误处理中间件
错误处理中间件与其他中间件函数定义方式相同，但它有四个参数而不是三个，特别是`next`的参数，它必须命名为`next`。

```js
const express = require('express');
const app = express();

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

#### 内置中间件
Express有内置的中间件函数，例如`express.static`用于提供静态文件。

```js
const express = require('express');
const app = express();

// 内置中间件
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  })
```

#### 第三方中间件
第三方中间件是用户编写的中间件函数，可以通过npm安装和使用。例如，`body-parser`用于解析请求体。

```js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// 第三方中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### 4. 中间件执行顺序
中间件的执行顺序很重要，它决定了请求如何被处理。中间件的执行顺序如下：

1. 应用程序级别中间件
2. 路由级别中间件
3. 错误处理中间件
4. 内置中间件
5. 第三方中间件

例如，以下代码将按照以下顺序执行中间件：

```js
const express = require('express');
const app = express();

// 应用程序级别中间件
app.use((req, res, next) => {
  console.log('Application level middleware');
  next();
});

// 路由级别中间件
app.get('/', (req, res, next) => {
  console.log('Route level middleware');
  next();
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 内置中间件
app.use(express.static('public'));

// 第三方中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```





