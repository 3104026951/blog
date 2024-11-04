<style>
pre {
  overflow-y: auto;
  max-height: 500px;
}
</style>

# 单例模式

保证一个类仅有一个实例，并提供一个访问它的全局访问点。

## Vuex中的单例模式

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

Vuex 的核心就是 store（仓库），store 是一个容器，包含着应用中大部分的状态（state）。Vuex 和单纯的全局对象有以下两点不同：
1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

Vuex 的 store 实例是唯一的，因此我们可以通过单例模式来创建 store 实例，从而保证整个应用只有一个 store 实例。

```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = null

function createStore() {
  if (!store) {
    store = new Vuex.Store({
      // ...
    })
  }
  return store
}

export default createStore()
```

## Vue Router中的单例模式

Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。Vue Router 是一个路由管理器，它可以帮助我们管理应用中的路由。Vue Router 的实例是唯一的，因此我们可以通过单例模式来创建 Vue Router 实例，从而保证整个应用只有一个 Vue Router 实例。

```js
// router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = null

function createRouter() {
  if (!router) {
    router = new Router({
      // ...
    })
  }
  return router
}

export default createRouter()
```
## Storage实现单例模式
```js
// 定义Storage
class Storage {
    static getInstance() {
        // 判断是否已经new过1个实例
        if (!Storage.instance) {
            // 若这个唯一的实例不存在，那么先创建它
            Storage.instance = new Storage()
        }
        // 如果这个唯一的实例已经存在，则直接返回
        return Storage.instance
    }
    getItem (key) {
        return localStorage.getItem(key)
    }
    setItem (key, value) {
        return localStorage.setItem(key, value)
    }
}

const storage1 = Storage.getInstance()
const storage2 = Storage.getInstance()

storage1.setItem('name', '张三')
console.log(storage2.getItem('name')) // 张三

```

## 实现全局模态框
```js
class Modal {
  constructor() {
    if (!Modal.instance) {
      this.modal = document.createElement('div')
      document.body.appendChild(this.modal)
      Modal.instance = this
    }
    return Modal.instance
  }
  open(html) {
    this.modal.innerHTML = html
    this.modal.style.display = 'block'
  }
  close() {
    this.modal.style.display = 'none'
  }
}

const modal1 = new Modal()
const modal2 = new Modal()

modal1.open('<p>hello world</p>')
modal2.close()
```
