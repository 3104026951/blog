<style>
pre {
  overflow-y: auto;
  max-height: 500px;
}
</style>

# Vue

### keep-alive实现原理
1.  获取 keep-alive 下第一个子组件的实例对象，通过他去获取这个组件的组件名
1.  通过当前组件名去匹配原来 include 和 exclude，判断当前组件是否需要缓存，不需要缓存，直接返回当前组件的实例vNode
1.  需要缓存，判断他当前是否在缓存数组里面：

-   存在，则将他原来位置上的 key 给移除，同时将这个组件的 key 放到数组最后面（LRU）
-   不存在，将组件 key 放入数组，然后判断当前 key数组是否超过 max 所设置的范围，超过，那么削减未使用时间最长的一个组件的 key

4.  最后将这个组件的 keepAlive 设置为 true

  

## 为什么组件中的 data 必须是一个函数，然后 return 一个对象，而 new Vue 实例里，data 可以直接是一个对象？

因为组件是复用的，且JS里对象是引用关系，如果组件中data是一个对象，那么这样作用域没有隔离，子组件中的data属性会相互影响，如果data是一个函数，那么每个实例可以维护一份返回对象独立的拷贝，data就不相互影响。new Vue是实例，就不会有引用对象的问题。

## Vue 相互之间的通讯方式
- props/$emit 父子通讯
- ref 和 $parent/$children 父子通讯
- EventBus($emit/$on) 父子，隔代，兄弟组件通讯
- provide/inject 依赖注入，隔代
- Vuex 状态管理

## Vuex
- State：定义了应用状态的数据结构，可以在这里设置默认的初始状态
- Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
- Mutation：是唯一更改 store 中状态的方法，且必须是同步函数
- Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作
- Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中

## 为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作
因为更改state的函数必须是纯函数，纯函数既是统一输入就会统一输出，没有任何副作用；如果是异步则会引入额外的副作用，导致更改后的state不可预测；


## vue-router中常用的hash和history
(1) hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器
- 我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。
(2) history : 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式
- 其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()

## Mvvm双向绑定

1. 监听器Observer，用来劫持和监听所有属性的，如果属性变化，就通知订阅者
```js
   class Observer {
    constructor(data) {
        this.observe(data)
        console.log(Observer.depNUm)
    }

    static depNUm = 0;

    observe(data) {
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key])
            })
        }
    }

    defineReactive(obj, key, value) {
        // 递归遍历的里面的元素
        this.observe(value);

        const dep = new Dep();
        Observer.depNUm += 1;
        console.log('observe DepNum数量',Observer.depNUm)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: false,
            get: () => {
                console.log('调用get', Dep.target)
                // 订阅数据变化时，往Dep中添加观察者
                Dep.target && dep.addSub(Dep.target)
                return value;
            },
            set: (newVal) => {
                console.log('调用set')
                if (newVal !== value) {
                    this.observe(newVal)
                    value = newVal
                }
                //告诉dep通知变化
                dep.notify()
            }
        })
    }
}
```
2. 订阅器Dep，用来收集订阅者，对监听器Observer和订阅者Watcher进行统一管理
```js
class Dep {
    constructor() {
        this.subs = [];
    }
    static target = null
    // 收集观察者
    addSub(watcher) {
        this.subs.push(watcher)
    }
    // 通知观察者去更新
    notify() {
        console.log('观察者', this.subs)
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
}
```
3. 订阅者watcher，可以收到属性的变化并执行方法更新视图
```js
class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.oldVal = this.getOldVal()
    }

    getOldVal() {
        //这里这么写是因为要在后面Dep.addSub的时候指向正确的
        Dep.target = this;
        console.log('设置Dep.target', Dep.target)

        // 这一步里面有Observer->Object.defineProperty-> get() 的操作
        const oldVal = compileUtil.getVal(this.expr, this.vm)


        // 操作完了重置为null
        console.log('重置Dep.target')
        Dep.target = null;
        return oldVal
    }
    update() {
        const newVal = compileUtil.getVal(this.expr, this.vm)
        if (newVal !== this.oldVal) {
            this.cb(newVal)
        }
    }
}
```
4. 解析器Compile，可以解析每个节点的相关指令，对模板数据和订阅器进行初始化 
```js
const compileUtil = {
    getVal(expr, vm) {
        return expr.split('.').reduce((data, currentVal) => {
            // console.log(currentVal)
            return data[currentVal]
        }, vm.$data)
    },


    getContentVal(expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            // console.log(args) //  ['{{person.name}}', 'person.name', 0, '{{person.name}} -- {{person.age}}']
            return this.getVal(args[1], vm)
        })
    },


    //v-model修改值
    setVal(expr, vm, inputVal) {
        expr.split('.').reduce((data, curr) => {
            data[curr] = inputVal
        }, vm.$data)
    },

    text(node, expr, vm) { //expr:msg expr:person.name  还有{{ person.name }}这种情况
        let value;
        if (expr.indexOf('{{') !== -1) {
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                // console.log(args) //  ['{{person.name}}', 'person.name', 0, '{{person.name}} -- {{person.age}}']
                console.log('绑定text', value)
                new Watcher(vm, args[1], () => {
                    this.updater.textUpdater(node, this.getContentVal(expr, vm))
                })

                return this.getVal(args[1], vm)
            })
        } else {
            value = this.getVal(expr, vm)

        }
        this.updater.textUpdater(node, value)
    },
    html(node, expr, vm) {
        const value = this.getVal(expr, vm);
        console.log('绑定html', value)
        new Watcher(vm, expr, (newVal) => {
            this.updater.htmlUpdater(node, newVal)
        })
        this.updater.htmlUpdater(node, value)
    },
    model(node, expr, vm) {
        const value = this.getVal(expr, vm);
        console.log('绑定model', value)
        // 绑定更新函数 数据 -> 视图
        new Watcher(vm, expr, (newVal) => {
            this.updater.modelUpdater(node, newVal)
        })
        // 视图 -> 数据 -> 视图
        node.addEventListener('input', (e) => {
            this.setVal(expr,vm,e.target.value)
        })

        this.updater.modelUpdater(node, value)
    },
    bind(node, expr, vm, attr) {
        const value = this.getVal(expr, vm)
        console.log('绑定bind', value)
        new Watcher(vm, expr, (newVal) => {
            this.updater.bindUpdater(node, newVal, attr)
        })
        this.updater.bindUpdater(node, value, attr)
    },
    on(node, expr, vm, eventName) {
        let fn = vm.$options.methods && vm.$options.methods[expr]
        node.addEventListener(eventName, fn.bind(vm), false)
    },


    //更新的对象
    updater: {
        textUpdater(node, value) {
            node.textContent = value;
        },
        htmlUpdater(node, value) {
            node.innerHTML = value
        },
        modelUpdater(node, value) {
            node.value = value
        },
        bindUpdater(node, value, attr) {
            node.setAttribute(attr, value)
        }
    }
}

class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        console.log(this.el)
        this.vm = vm;

        // 1.获取文档碎片对象，放入内存中会减少页面的回流和重绘
        // const fragment = this.node2Fragment(this.el);

        // this.el.appendChild(fragment)

        this.compile(this.el)
    }

    // 编译节点
    compile(fragment) {
        //1.获取子节点
        const childNodes = fragment.childNodes;
        [...childNodes].forEach(child => {
            if (this.isElementNode(child)) {
                // console.log('元素节点', child)
                this.compileElement(child)
            } else {
                // console.log('文本节点', child)
                this.compileText(child)
            }

            if (child.childNodes && child.childNodes.length) {
                this.compile(child)
            }
        })
    }

    // 解析元素
    compileElement(node) {
        //  <div v-text="msg"></div>
        const attributes = node.attributes;
        [...attributes].forEach(attr => {
            const {
                name,
                value
            } = attr
            console.log('attr', name, value)

            if (this.isDirective(name)) { // v-text,v-html,v-model,v-on:click,v-bind:src,@click,:src
                const [, dirctive] = name.split('-') // 分离v-text
                const [dirName, attribute] = dirctive.split(':') // 分离on:click的事件类型

                // node是当前dom,value是绑定的data值，vm是实例，attribute是事件名或者绑定的属性名
                // 这里面第一次初始化也要生成对应的watcher进入dep
                compileUtil[dirName](node, value, this.vm, attribute)


                //删除有指令的标签上的属性
                // node.removeAttribute(`v-${dirctive}`)

            } else {
                if (this.isEventName(name)) {
                    let [, eventName] = name.split('@')
                    compileUtil['on'](node, value, this.vm, eventName)
                }

                if (this.isAttr(name)) {
                    let [, attr] = name.split(':');
                    compileUtil['bind'](node, value, this.vm, attr)
                }
            }
        })
    }



    // 解析文本 
    compileText(node) {
        // {{}}
        const content = node.textContent
        if (/\{\{(.+?)\}\}/.test(content)) {
            compileUtil['text'](node, content, this.vm)
        }
    }

    isAttr(name) {
        return name.startsWith(':')
    }

    // 判断是不是事件名
    isEventName(name) {
        return name.startsWith('@')
    }

    // 是否是指令
    isDirective(name) {
        return name.startsWith('v-')
    }


    // 返回文档碎片
    node2Fragment(el) {
        // 创建文档碎片
        const f = document.createDocumentFragment();
        let firstChild;
        while (firstChild = el.firstChild) {
            f.appendChild(firstChild)
        }

        return f
    }

    // 判断是不是dom的node
    isElementNode(node) {
        return node.nodeType === 1;
    }
}
```

## 虚拟DOM
- 保证性能，不需要直接去操作DOM
- 夸平台，虚拟DOM本质是JS对象，可以用于服务器渲染，weex开发等

## 虚拟DOM的实现原理
- 用JS对象模拟真实DOM树，对DOM进行抽象
- diff 算法 — 比较两棵虚拟 DOM 树的差异
- patch算法 - 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树

## Vue3的新特性
1. 组合式API，类似于react的hook
2. 生命周期的变化，有个一个setUp周期，可以写成语法糖
3. watch 监听的参数可以是不同的数据源，它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组

```js
const x = ref(0)
const y = ref(0)
// 单个 ref 
watch(x, (newX) => { console.log(`x is ${newX}`) }) 
// getter 函数 
watch( () => x.value + y.value, (sum) => { console.log(`sum of x + y is: ${sum}`) } ) 
// 多个来源组成的数组 
watch([x, () => y.value], ([newX, newY]) => { console.log(`x is ${newX} and y is ${newY}`) })
```
4. watchEffect,相对于watch他是立即执行的
5. ref()和reactive()，reactive可以通过toRefs转换
                                                              
## React Hook和Vue hook 对比
#### react
1. 不能在循环，条件，嵌套函数中调用hook
2. 确保在React函数的顶层调用他们
3. 每次重新渲染要再调用
#### Vue
1. Vue在setUp中调用，只调用一次，在性能上比较占优
2. 对调用顺序没有什么要求，每次渲染中不会反复调用
3. 不需要考虑useCallback的问题，以防止传递函数和props给子组件，导致无必要的重新渲染
4. React Hook 有臭名昭著的闭包陷阱问题（甚至成了一道热门面试题，omg），如果用户忘记传递正确的依赖项数组，useEffect 和 useMemo 可能会捕获过时的变量，这不受此问题的影响。 Vue 的自动依赖关系跟踪确保观察者和计算值始终正确无误。



