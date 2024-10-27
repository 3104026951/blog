
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