<template>
    The count is: {{ count }}

    <button :class="$style.button" @click="count++">Increment</button>
</template>
<script setup>
import { ref } from 'vue'

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