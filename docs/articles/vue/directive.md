<script setup>
import { ref } from 'vue'
import vSpace from '../../directives/space.js'
import vFilterInput from '../../directives/filterInput.js'
import vFormat from '../../directives/format.js'
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




