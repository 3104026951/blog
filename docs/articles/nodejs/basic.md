<style>
pre {
  overflow-y: auto;
  max-height: 500px;
}
</style>

## node.js是什么

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。Node.js 的包管理器 npm，是全球最大的开源库生态系统。

## node.js有哪些特点

1. 事件驱动：Node.js 使用事件驱动的方式处理异步操作，避免了传统的多线程模型，提高了性能。
2. 非阻塞 I/O：Node.js 的非阻塞 I/O 模型使得它在处理 I/O 操作时非常高效，可以同时处理大量的并发请求。
3. 单线程：Node.js 是单线程的，但是通过事件驱动的方式，可以处理大量的并发请求，避免了传统多线程模型中的线程切换开销。
4. 跨平台：Node.js 可以在 Windows、Linux 和 macOS 等多个平台上运行。

## node.js有哪些应用场景

1. Web 开发：Node.js 可以用于构建高性能的 Web 应用程序，如实时聊天应用、在线游戏等。
2. 前后端同构：Node.js 可以用于构建前后端同构的应用程序，如 React、Vue 等框架。
3. API 服务：Node.js 可以用于构建 RESTful API 服务，如 GraphQL、RESTful API 等。
4. 工具开发：Node.js 可以用于开发各种工具，如构建工具、测试工具等。

## node.js有哪些全局对象

Node.js 提供了一些全局对象，可以在任何模块中使用，如：

1. `global`：全局对象，类似于浏览器中的 `window` 对象。
2. `process`：提供有关当前 Node.js 进程的信息和控制。
3. `console`：用于输出日志信息。
4. `Buffer`：用于处理二进制数据。
5. `require`：用于引入模块。
6. `module`：提供当前模块的信息和控制。
7. `__filename`：当前模块的文件名。
8. `__dirname`：当前模块的目录名。

## process对象的属性和方法

`process` 对象提供了有关当前 Node.js 进程的信息和控制。以下是一些常用的属性和方法：

1. `process.argv`：返回一个数组，包含启动 Node.js 进程时传入的命令行参数。
2. `process.env`：返回一个包含用户环境变量的对象。
3. `process.exit([code])`：终止当前进程，并返回指定的退出码。
4. `process.cwd()`：返回当前工作目录。
5. `process.chdir(directory)`：改变当前工作目录。
6. `process.memoryUsage()`：返回一个对象，包含 Node.js 进程的内存使用情况。
7. `process.nextTick(callback)`：在事件循环的下一次迭代中执行回调函数。

## fs模块
`fs` 模块是 Node.js 中用于处理文件和目录的模块。以下是一些常用的方法：

1. `fs.readFile(path[, options], callback)`：读取文件内容。
2. `fs.writeFile(file, data[, options], callback)`：写入文件内容。
3. `fs.appendFile(file, data[, options], callback)`：追加文件内容。
4. `fs.unlink(path, callback)`：删除文件。
5. `fs.mkdir(path[, options], callback)`：创建目录。
6. `fs.rmdir(path, callback)`：删除目录。

## Buffer对象
`Buffer` 对象是 Node.js 中用于处理二进制数据的类。以下是一些常用的方法：

1. `Buffer.alloc(size)`：创建一个指定大小的 Buffer 对象。
2. `Buffer.from(array)`：从数组创建一个 Buffer 对象。
3. `Buffer.concat(list[, totalLength])`：将多个 Buffer 对象合并为一个 Buffer 对象。
   
应用场景：

1. 处理二进制数据，如图片、音频等。
2. 读取和写入文件时，处理二进制数据。
3. 网络编程中，处理 TCP 和 UDP 数据包。

#### Buffer处理二进制文件
```js
const fs = require('fs');

// 读取二进制文件
fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// 写入二进制文件
fs.writeFile('file.txt', Buffer.from('Hello, world!'), (err) => {
  if (err) throw err;
  console.log('File has been saved!');
});
```


## stream模块
`stream` 模块是 Node.js 中用于处理流数据的模块。以下是一些常用的类：

1. `Readable`：可读流，用于读取数据。
2. `Writable`：可写流，用于写入数据。
3. `Duplex`：双工流，既可以读取数据，也可以写入数据。
4. `Transform`：转换流，可以对数据进行转换。

应用场景：

1. 处理大文件，如视频、音频等。
2. 网络编程中，处理 TCP 和 UDP 数据流。
3. 数据压缩和解压缩。

#### get请求返回文件给客户端
```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const fileStream = fs.createReadStream('file.txt');
  fileStream.pipe(res);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
#### post请求上传文件
```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const fileStream = fs.createWriteStream('file.txt');
    req.pipe(fileStream);
    req.on('end', () => {
      res.end('File has been uploaded!');
    });
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
#### stream处理文件复制
```js
const fs = require('fs');

const readStream = fs.createReadStream('file.txt');
const writeStream = fs.createWriteStream('file_copy.txt');

readStream.pipe(writeStream);

readStream.on('end', () => {
  console.log('File has been copied!');
});

```


## node中间件
中间件是 Node.js 中用于处理 HTTP 请求和响应的函数。以下是一些常用的中间件：

1. `express`：一个流行的 Node.js Web 应用框架，提供了丰富的中间件。
2. `body-parser`：用于解析请求体中的 JSON、URL-encoded 和 multipart/form-data 数据。
3. `cookie-parser`：用于解析请求中的 cookie。
4. `cors`：用于处理跨域请求。
5. `morgan`：用于记录 HTTP 请求日志。

应用场景：

1. 处理 HTTP 请求和响应。
2. 解析请求体中的数据。
3. 处理跨域请求。

## jwt鉴权机制
JWT（JSON Web Token）是一种用于身份验证和授权的机制。以下是一些常用的方法：

1. `jsonwebtoken`：一个流行的 Node.js JWT 库，用于生成和验证 JWT。
2. `express-jwt`：一个用于 Express 框架的 JWT 中间件，用于验证 JWT。

应用场景：

1. 身份验证和授权。
2. 保护 API 接口，确保只有经过身份验证的用户才能访问。
3. 在分布式系统中，用于在不同服务之间传递身份信息。

#### 生成和验证JWT
```js
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

// 生成 JWT
const token = jwt.sign({ userId: 123 }, 'secretKey', { expiresIn: '1h' });

// 验证 JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
};

app.get('/protected', verifyToken, (req, res) => {
  res.send('This is a protected route');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

