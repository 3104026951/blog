//过滤输入
const vFilterInput = {
    mounted(el,binding) {
        let input = el.tagName === 'INPUT' ? el : el.querySelector('input');
        input.onkeyup = function () {
            input.value = input.value.replace(binding.value, '')
        },
        input.onblur = function () {
            input.value = input.value.replace(binding.value, '')  
        }
    }
}

export default vFilterInput