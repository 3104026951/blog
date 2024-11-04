import { ref, onMounted, onUnmounted } from 'vue'
export function useSelfAdaption() {
    const scale = ref(1)
 
    const setScale = () => {
        const screenWidth = window.innerWidth
        // 设计稿基准宽度
        const baseWidth = 750  //750, 1190, 1920, 根据实际情况设定
        // 计算当前屏幕宽度与基准宽度的比例，并赋值给scale
        scale.value = screenWidth/baseWidth
        console.log('cale:', scale.value);
        // 设置body的CSS变换属性，根据scale的值进行缩放
        document.body.style.transform = `scale(${scale.value})`
    }
    onMounted(() => {
        // 初次挂载时调用setScale函数，以确保页面按照当前屏幕尺寸正确缩放
        setScale()
        // 当窗口大小改变时，触发setScale函数。
        window.addEventListener('resize', setScale)
    })
    onUnmounted(() => {
        // 移除之前添加的resize事件监听器，避免内存泄漏。
        window.removeEventListener('resize', setScale)
    })
 
    return {
        scale
    }
}