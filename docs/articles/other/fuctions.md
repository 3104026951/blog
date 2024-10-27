 # 代码


## 一维数组转多维

```js
function newArrFn(arr, rootValue = 0) { 
    return arr.reduce((acc, cur) => {
        if (cur.p_id === rootValue) {
            const children = newArrFn(arr, cur.id)
            if (children.length) { 
                cur.children = children 
            }
            acc.push(cur) // 返回值 新数组的长度
         } 
         return acc 
     }, []) 
} 
```

  
## 多维数组转一维

```js
function flatten(arr) {
    return arr.reduce((arr,cur)=>{
       if(Array.isArray(cur.children)) {
           return arr.concat(cur,flatten(cur.children))
       } else {
           return arr.concat(cur);
       }
    },[])
}
```

## 转换options
```js
export function translateOptions(list = [], labelName = 'label', valueName = 'value') {
  return list.map(it => {
    return {
      ...it,
      label: it[labelName],
      value: it[valueName]
    }
  })
}
```

## 转换Map
```js
export function translateMap(list = [], labelName = 'label', valueName = 'value') {
  return list.reduce((map, item) => {
    return map.set(item[valueName], item[labelName])
  }, new Map())
}

```

## 判断多种类型是否为空

```js
export const isNilEmpty = (
  value: any,
): value is null | undefined | '' | Record<string, never> | [] => {
  if (_.isString(value)) {
    return value.length === 0;
  }
  if (_.isObject(value)) {
    return _.isEmpty(Object.keys(value));
  }
  if (_.isArray(value)) {
    return _.isEmpty(value.length);
  }
  return _.isNil(value);
};
```


