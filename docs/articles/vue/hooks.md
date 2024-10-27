<style>
pre {
  overflow-y: auto;
  max-height: 300px;
}
</style>

## useRequest

`useRequest` 是一个用于处理异步请求的 Vue 3 Composition API Hook。它提供了一种简洁的方式来处理异步请求，包括获取数据、分页、刷新、加载更多等功能。

```js
import { throttle, debounce } from "lodash-es";
import { ref } from "vue";


function useRequest(
    apiFn,
    {
        automatic,
        defaultData,
        defaultParams,
        throttleTime,
        debounceTime,
        formatter,
        beforeRequest,
        onSuccess,
        onError
    } = {}
) {
    const data = ref(defaultData);
    const loading = ref(false);

    async function request(params) {
        loading.value = true;
        const isRequest = beforeRequest?.(params) ?? true;
        if (!isRequest) return;
        try {
            const result = await apiFn(params);
            data.value = formatter?.(result) ?? result;
            onSuccess?.(result, data.value);
        } catch (error) {
            onError?.(error);
        } finally {
            loading.value = false;
        }
    }

    let run = request;

    if (throttleTime) {
        const throttleRun = throttle(request, throttleTime);
        run = async (params) => throttleRun(params);
    }
    if (debounceTime) {
        const debounceRun = debounce(request, debounceTime);
        run = async (params) => debounceRun(params);
    }

    if (automatic) {
        request(defaultParams);
    }

    return [data, run, loading];
}

export default useRequest;

```

## useTable
`useTable` 是一个用于处理表格数据的 Vue 3 Composition API Hook。它提供了一种简洁的方式来处理表格数据，包括分页、刷新、加载更多等功能。

```js
import { reactive, ref } from 'vue';

export const useTable = (options) => {
    // 列表数据
    const tableData = ref([]);
    // loading变量
    const loading = ref < boolean > (false);
    // 请求参数
    const paramsInit = JSON.parse(JSON.stringify(options.params || {}));
    // 分页数据
    const page = reactive({
        page: 1,
        pageSize: 20,
        pageSizes: [10, 20, 30, 50],
        total: 10
    });

    const getList = async () => {
        loading.value = true;
        const isPageable = options.isPageable ?? true;
        // 根据传入的isPageable属性判断列表请求是否携带分页参数
        const pageParams = isPageable ? { page: page.page, pageSize: page.pageSize } : {};
        // 总的请求参数
        const totalParams = Object.assign({}, options.params, pageParams);
        let { data } = await options.apiFn(totalParams).finally(() => (loading.value = false));
        // 如果后端返回格式不规范，需要传入回调处理成我们想要的格式
        options.callback && (data = options.callback(data));
        // 根据是否分页取值，所以如果接口格式不正确可以传入cb处理
        tableData.value = isPageable ? data.list : data;
        page.total = data.total;
    };

    // 页码总数切换
    const handleSizeChange = async (val) => {
        page.page = 1;
        page.pageSize = val;
        await getList();
    };

    // 分页切换
    const handleCurrentChange = async (val) => {
        page.page = val;
        await getList();
    };

    // 重置搜索数据
    const resetParams = () => {
        Object.keys(paramsInit).forEach((item) => {
            options.params[item] = paramsInit[item];
        });
        getList();
    };

    //是否默认执行getList
    if (options.immediate ?? true) getList();

    // 返回相关需要的变量和方法
    return {
        tableData,
        page,
        loading,
        getList,
        resetParams,
        handleSizeChange,
        handleCurrentChange
    };
};


```

## useModal

`useModal` 是一个用于处理模态框的 Vue 3 Composition API Hook。它提供了一种简洁的方式来处理模态框的显示、隐藏、数据传递等功能。

```js
import { ref } from "vue";

function useModal() {
    const visible = ref(false);
    const data = ref(null);

    const showModal = (modalData) => {
        data.value = modalData;
        visible.value = true;
    };

    const hideModal = () => {
        visible.value = false;
    };

    return { visible, data, showModal, hideModal };
}

export default useModal;
```