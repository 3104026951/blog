<template>
    <div class="filter-container" v-if="titleList.length">
        <div class="filter-item" v-for="(item, index) in titleList" :key="index" :style="{
            width: (span / 24) * 100 + '%',
        }" v-show="index < showNum - 1 || showAll">
            <div class="filter-label" :style="{ maxWidth: labelWidth + 'px' }">{{ item.label }}</div>
            <div style="flex: 1;">
                <component style="width: 100%;" :is="comType(item.type)" v-model:value="form[item.key]"
                    v-bind="item.attrs" @change="changeFormValue(item)" />
            </div>
        </div>
        <div class="last-filter-item">
            <slot>

            </slot>
            <div v-show="titleList.length > showNum" style="margin-left: 10px;">
                <Button size="small" type="primary" @click="showAll = !showAll">{{ showAll ? '收起' : '展开' }}</Button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, watch } from 'vue';
import { Button, Input, Select, Checkbox, DatePicker, TimePicker, InputNumber, TreeSelect } from 'ant-design-vue';
const CheckboxGroup = Checkbox.Group
const props = defineProps({
    titleList: {
        type: Array,
        default: () => []
    },
    labelWidth: {
        type: Number,
        default: 100
    },
    span: {
        type: Number,
        default: 8
    }
})

const showNum = computed(() => {
    return 24 / props.span
})

const comMap = {
    'Input': Input,
    'Select': Select,
    'Checkbox': Checkbox,
    'CheckboxGroup': CheckboxGroup,
    'DatePicker': DatePicker,
    'TimePicker': TimePicker,
    'InputNumber': InputNumber,
    'TreeSelect': TreeSelect
}

watch(() => props.titleList, (newVal) => {
    form.value = {}
}, { deep: true })



const showAll = ref(true)
const form = ref({})


function changeFormValue(item) {
    // console.log(item, form.value)
}
function comType(type) {
    return type ? comMap[type] : Input
}

function getForm() {
    return form.value
}
function resetForm() {
    form.value = {}
    return form.value
}

function setForm(data) {
    form.value = {
        ...form.value,
        ...data
    }
    return form.value
}

function getItemVal(key) {
    return form.value[key]
}


defineExpose({
    getForm,
    resetForm,
    getItemVal,
    setForm
})



</script>

<style scoped>
.filter-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
}

.filter-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.filter-label {
    padding: 0 8px;
    text-align: right;
    font-weight: 700;
    font-size: 14px;
    color: #606266;
}

.last-filter-item {
    flex: 1;
    margin-left: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end
}
</style>
