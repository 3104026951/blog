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
