<template>
    <div>
      <!-- 准备一个有宽高的dom ———— 其他内容从父组件传过来 -->
      <div :id="uid" :style="style"></div>
    </div>
  </template>
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import * as echarts from 'echarts';
  const props =  defineProps({
      dataSource: {
          type: Object,
          default: null,
          required: true
      },
      canvasWidth: {
          type: String,
          default: '',
          required: true
      },
      canvasHeight: {
          type: String,
          default: '',
          required: true
      }
  })
  const uid = ref('')
  const myChart = ref(null)
  // 时间戳+随机字符
  uid.value = new Date().getTime() + Math.random().toString(32).slice(2, 10)
  console.log('uid:', uid.value);
   
  let style = computed(() => ({
      width: props.canvasWidth,
      height: props.canvasHeight
  }))
  console.log('style:', style.value);
   
  const init = () => {
      // 基于准备好的dom，初始化echarts实例
      myChart.value = echarts.init(document.getElementById(uid.value))
      // 绘制图表
      myChart.value.setOption(props.dataSource)
  }
  onMounted(() => {
      // nextTick(() => {
      //     init()
      // })
      init()
  })
   
   
  </script>
  <style scoped>
   
  </style>