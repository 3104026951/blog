<script setup>
import { ref } from 'vue'
import vSpace from '../../directives/space.js'
import vFilterInput from '../../directives/filterInput.js'
import vFormat from '../../directives/format.js'
import vRightClick from '../../directives/rightClick.js'
import { Button,Input } from 'ant-design-vue'
</script>
<style>
pre {
  overflow-y: auto;
  max-height: 300px;
}
</style>

## 输入框空格过滤
<Input  v-space placeholder="不能输入空格"/>

```js
const vSpace = {
    mounted(el) {
        let input = el.tagName === 'INPUT' ? el : el.querySelector('input');

        input.onkeyup = function () {
            input.value = input.value.replace(/^\s+|\s+$/g, '')
        },
        input.onblur = function () {
            input.value = input.value.replace(/^\s+|\s+$/g, '')
        }
    },
}
export default vSpace

```


## 输入框过滤特殊字符

比如这个输入框只能输入中文
<Input  v-filter-input="/[^\u4e00-\u9fa5]/g"  placeholder="只能输入中文"/>


```js

//过滤输入
const vFilterInput = {
    mounted(el,binding) {
        let input = el.tagName === 'INPUT' ? el : el.querySelector('input');
        input.onkeyup = function () {
            console.log(binding.value)
            input.value = input.value.replace(binding.value, '')
        },
        input.onblur = function () {
            input.value = input.value.replace(binding.value, '')  
        }
    }
}

export default vFilterInput

```

## 文本框颜色显示和格式化
<div v-format="{text:'1234567.12',isRed:true}"></div>
<div v-format="{text:'1234567.12',isRed:false}"></div>

```js

// 千分位显示数字函数
function formatNumber(value) {
    if (!/^[+-]?\d*(\.\d*)?(e[+-]?\d+)?$/.test(value)) {
        return value;
    }
    const formattedValue = Number(value).toLocaleString()
    console.log(formattedValue)
    return formattedValue;
}

const vFormat = {
    mounted(el, binding) {
        const value = binding.value.text;
        const isRed = binding.value.isRed;
        const formattedValue = formatNumber(value);
        el.innerHTML = `<p style="color:${isRed ? 'red' : ''}">${formattedValue}</p>`;
    },
    updated(el, binding) {
        const value = binding.value.text;
        const isRed = binding.value.isRed;
        const formattedValue = formatNumber(value);
        el.innerHTML = `<p style="color:${isRed ? 'red' : ''}">${formattedValue}</p>`;
    }
}



export default vFormat;

```

## 鼠标右键显示菜单
<Button v-right-click="{menu:[{name:'操作1',fn:()=>{console.log('操作1')}},
{name:'操作2',fn:()=>{console.log('操作2')}}
]}">
右键打开菜单
</Button>

```js
const vRightClick = {
    mounted(el, binding) {
        const menu = binding.value.menu;
        el.oncontextmenu = function (e) {
            e.preventDefault();
            const menuDiv = document.createElement('div');
            menuDiv.style.position = 'fixed';
            menuDiv.style.top = e.clientY + 'px';
            menuDiv.style.left = e.clientX + 'px';
            menuDiv.style.backgroundColor = '#fff';
            menuDiv.style.border = '1px solid #ccc';
            menuDiv.style.padding = '5px';
            menuDiv.style.zIndex = '9999';
            menuDiv.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
            menuDiv.style.display = 'flex';
            menuDiv.style.flexDirection = 'column';
            menu.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.style.padding = '5px';
                menuItem.style.cursor = 'pointer';
                menuItem.innerText = item.name;
                menuItem.onclick = function () {
                    item.fn();
                    menuDiv.remove();
                }
                menuDiv.appendChild(menuItem);
            });
            document.body.appendChild(menuDiv);
        }
        document.addEventListener('click', function () {
            const menuDiv = document.querySelector('div[style*="position: fixed"]');
            if (menuDiv) {
                menuDiv.remove();
            }
        })
    },
}

export default vRightClick;
```
