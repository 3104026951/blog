<template>
    <Modal v-model:open="show" :title="modalTitle" :width="modalWidth">
        <Form ref="formRef" :model="form" :label-col="{ style: { width: labelWidth + 'px' } }">
            <FormItem v-for="item in formItemList" :key="item.key" :label="item.label" :name="item.key"
                :rules="item.rules">
                <Input v-if="item.type === 'Input'" v-model:value="form[item.key]" :placeholder="item.placeholder" />
                <Select v-if="item.type === 'Select'" v-model:value="form[item.key]" :placeholder="item.placeholder"
                    :options="item.options"></Select>
                <CheckboxGroup v-if="item.type === 'Checkbox'" v-model:value="form[item.key]"
                    :options="item.options" />
                <RadioGroup v-if="item.type === 'Radio'" v-model:value="form[item.key]" :options="item.options" />
                <DatePicker v-if="item.type === 'DatePicker'" v-model:value="form[item.key]"
                    :placeholder="item.placeholder" />
                <TreeSelect v-if="item.type === 'TreeSelect'" v-model:value="form[item.key]"
                    :placeholder="item.placeholder" :tree-data="item.treeData || []" />
            </FormItem>
        </Form>
        <template #footer>
            <Button @click="show = false" :loading="btnLoading">{{ cancelButtonText }}</Button>
            <Button type="primary" @click="submit" :loading="btnLoading">{{ confirmButtonText }}</Button>
        </template>
    </Modal>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Modal, Form, FormItem, Input, Button, Select, Checkbox, DatePicker, TreeSelect, Radio } from 'ant-design-vue';
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group

const formRef = ref(null)
const props = defineProps({
    formItemList: { //表单项列表
        type: Array,
        default: () => []
    },
    labelWidth: { //标签宽度
        type: Number,
        default: 100
    },
    modalTitle: { //弹窗标题
        type: String,
        default: '弹窗'
    },
    modalWidth: { //弹窗宽度
        type: Number,
        default: 800
    },
    modalVisible: { //弹窗是否显示
        type: Boolean,
        default: false
    },
    editFormData: { //编辑表单数据
        type: Object,
        default: () => { }
    },
    api: { //接口
        type: Function,
        default: undefined
    },
    filterFn: { //过滤函数
        type: Function,
        default: undefined
    },

    confirmButtonText: { //确认按钮文字
        type: String,
        default: '确认'
    },
    cancelButtonText: { //取消按钮文字
        type: String,
        default: '取消'
    }
})

const form = ref({})
const show = ref(false)
const btnLoading = ref(false) //按钮loading

const rules = computed(() => {

})

watch(() => props.modalVisible, (val) => {

})

watch(() => show.value, (val) => {
    if (val) {
        form.value = {
            ...props.editFormData
        }
    } else {
        form.value = {}
        formRef.value.resetFields()
        btnLoading.value = false
    }
})

function openModal() {
    show.value = true
}
function closeModal() {
    show.value = false
}

async function submit() {
    console.log({
        ...form.value
    })
    try {
        await formRef.value.validate()
        btnLoading.value = true
        const res = await props.api(form.value)
        if (res.code === 200) {
            show.value = false
            props.onSuccess && props.onSuccess()
        } else {
            btnLoading.value = false
        }
    } catch (error) {
        btnLoading.value = false

    }
}

function getFormItemValue(key) {
    return form.value[key]
}
function setFormItemValue(key, value) {
    form.value[key] = value
}
function validateField(key) {
    formRef.value.validateField(key)
}

defineExpose({
    openModal,
    closeModal,
    validateField
})

</script>

<style scoped></style>