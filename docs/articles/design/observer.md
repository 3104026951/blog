<style>
pre {
  overflow-y: auto;
  max-height: 500px;
}
</style>
# 观察者模式

## 定义

观察者模式定义了对象之间的一对多依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都会得到通知并自动更新。

## 优点
1. 观察者模式可以解耦观察者和被观察者，使得它们之间的依赖关系更加灵活。
2. 观察者模式可以动态地添加和删除观察者，使得系统更加灵活。
3. 观察者模式可以实现对多个观察者的统一管理，使得系统更加简洁。

## 模型代码
```js
// 被观察者
class Subject {
  constructor() {
    this.observers = [];
  }
  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

// 观察者
class Observer {
  update(data) {
    console.log(`Received data: ${data}`);
  }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.subscribe(observer1);
subject.subscribe(observer2);
```

## 使用场景
1. 当一个对象的状态发生改变时，需要通知其他对象进行相应的处理。
2. 当一个对象需要动态地添加和删除观察者时。
3. 当一个对象需要实现对多个观察者的统一管理时。