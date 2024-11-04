<style>
pre {
  overflow-y: auto;
  max-height: 500px;
}
</style>
# 发布订阅模式
## 定义
发布订阅模式是一种消息范式，消息的发送者（发布者）不会直接将消息发送给接收者（订阅者）。而是通过一个第三方组件（通常被称为“消息代理”或“事件总线”）来传递消息。发布者和订阅者之间没有直接的联系，而是通过消息代理来解耦。

## 优点
1. 解耦：发布者和订阅者之间没有直接依赖关系，它们通过消息代理进行通信，从而降低了系统的耦合度。
2. 可扩展性：新的订阅者可以轻松地添加到系统中，而无需修改现有的发布者代码。
3. 异步处理：发布者可以异步地发布消息，而不需要等待订阅者处理消息。这可以提高系统的性能和响应速度。
4. 广播通信：发布者可以将消息广播给多个订阅者，从而实现一对多的通信。
5. 灵活性：发布者和订阅者可以随时添加或删除，而不会影响系统的其他部分。

## 模型代码
```js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // 订阅事件
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // 取消订阅事件
  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listener);
  }

  // 触发事件
  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => listener(...args));
  }
}

const emitter = new EventEmitter();
emitter.on('event1', (data) => {
  console.log('Event 1:', data);
});

emitter.emit('event1', 'Hello, world!'); // 输出: Event 1: Hello, world!
```

## 应用场景
1. 事件驱动编程：发布订阅模式在事件驱动编程中非常常见，例如在Node.js中，可以使用事件发射器（EventEmitter）来实现事件驱动编程。
2. vue响应式系统：Vue.js的响应式系统也是基于发布订阅模式实现的，当数据发生变化时，会触发相应的订阅者进行更新。