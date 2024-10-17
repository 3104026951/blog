<template>
    The count is: {{ count }}

    <button :class="$style.button" @click="count++">Increment</button>

    <Button>124</Button>
</template>
<script setup>
import { ref } from 'vue'
import { Button } from 'ant-design-vue';
const count = ref(0)
</script>

<style module>
.button {
    color: red;
    display: block;
    font-weight: bold;
    font-size: 1.2em;
}
</style>