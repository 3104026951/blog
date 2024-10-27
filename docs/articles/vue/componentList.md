<script setup>
import { ref } from 'vue'
import { Button, Input } from 'ant-design-vue';
import FilterList from '../../components/FilterList.vue'
import ModalForm from '../../components/ModalForm.vue'

const filterTitleList = ref([{
  label: '姓名',
  type: 'Input',
  key: 'name'
}, {
  label: '性别',
  type: 'Select',
  key: 'sex',
  attrs: {
    options: [{
      value: 'male',
      label: '男',
    },
    {
      value: 'female',
      label: '女',
    }]
  }
}, {
  label: '年龄',
  type: 'InputNumber',
  key: 'age'
}, {
  label: '爱好',
  type: 'CheckboxGroup',
  key: 'hobby',
  attrs: {
    options: [{
      value: 'football',
      label: '足球',
    },
    {
      value: 'basketball',
      label: '篮球',
    }]
  }
}, {
  label: '日期',
  type: 'DatePicker',
  key: 'date',
  attrs: {
    valueFormat: 'YYYY-MM-DD'
  }
}, {
  label: '时间',
  type: 'TimePicker',
  key: 'TimePicker',
  attrs: {
    valueFormat: 'HH:mm:ss'
  }
}
]);
const childComp = ref(null)
function reset() {
  const form = childComp.value.resetForm();
  console.log(form)
}
function submit() {
  const form = childComp.value.getForm()
  console.log(form)
}

const modalFormRef = ref(null)
const formItemList = ref([
  {
    label: '姓名',
    type: 'Input',
    key: 'name',
    rules: [{
      required: true,
      message: '请输入姓名',
      trigger: 'blur'
    }]
  },
  {
    label: '性别',
    type: 'Select',
    key: 'sex',
    options: [{
      value: 'male',
      label: '男',
    },
    {
      value: 'female',
      label: '女',
    }],
    rules: [{
      required: true,
      message: '请选择性别',
      trigger: 'change'
    }]
  },
  {
    label: '爱好',
    key: 'hobby',
    type: 'Checkbox',
    options: [{
      value: 'football',
      label: '足球',
    },
    {
      value: 'basketball',
      label: '篮球',
    },
    {
      value: 'tennis',
      label: '网球',
    }],
    rules: [{
      required: true,
      message: '请选择爱好',
      trigger: 'change'
    }]
  },
  {
    label: '日期',
    type: 'DatePicker',
    key: 'date',
    valueFormat: 'YYYY-MM-DD'
  },

  {
    label: '地址',
    key: 'address',
    type: 'TreeSelect',
    treeData: [
      {
        value: 'zhejiang',
        label: '浙江',
        children: [{
          value: 'hangzhou',
          label: '杭州',
          children: [{
            value: 'xihu',
            label: '西湖',
          }],
        }],
      },
      {
        value: 'jiangsu',
        label: '江苏',
      }
    ]
  },
  {
    label: '水果',
    key: 'fruit',
    type: 'Radio',
    options: [{
      value: 'apple',
      label: '苹果',
    },
    {
      value: 'banana',
      label: '香蕉',
    },
    {
      value: 'orange',
      label: '橙子',
    }],
    rules: [{
      required: true,
      message: '请选择水果',
    }]
  },
])

const editForm = ref({})
const addFormOpen = () => {
  editForm.value = {}
  modalFormRef.value.openModal()
}
</script>
<style>
pre {
  overflow-y: auto;
  max-height: 300px;
}
</style>

# vue组件

## 条件筛选表单组件


<FilterList ref="childComp" :titleList="filterTitleList">
    <Button size="small" style="margin-right: 10px;" @click="reset">重置</Button>
    <Button size="small" @click="submit">查询</Button>
</FilterList>

```js
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


```

## 模态框表单组件

  <Button @click="addFormOpen">打开弹窗</Button>
  <ModalForm :formItemList="formItemList" :editFormData="editForm" ref="modalFormRef"></ModalForm>

```js
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

```

