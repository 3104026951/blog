# # 泛型

### 类型别名中的泛型

```
// 等价于一个接受参数的函数
type Factory<T> = T | number | string;

// TypeScript 的内置工具类型
type Partial<T> = {
    [P in keyof T]?: T[P];
};
interface Obj {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}
type PartialObj = Partial<Obj>;


```
### 泛型约束与默认值

```
// 给一个参数的默认值
type Factory<T = boolean> = T | number | string;
const foo: Factory = false;

```
#### extend
extends关键字来约束传入的泛型参数必须符合要求，A extends B 意味着 A 是 B 的子类型，类似于“柯基 extends 狗”

```
type ResStatus<ResCode extends number> = ResCode extends 10000 | 10001 | 10002
  ? 'success'
  : 'failure';
  
type Res1 = ResStatus<10000>; // "success"
type Res2 = ResStatus<20000>; // "failure"

type Res3 = ResStatus<'10000'>; // 类型“string”不满足约束“number”。

```
#### keyof
类比如JS中的Object.keys()
```
interface Foo {
  propA: number;
  propB: boolean;
  propC: string;
}

type A = keyof Foo

type PropAType = Foo['propA']; // number
type PropBType = Foo['propB']; // boolean
type PropTypeUnion = Foo[keyof Foo]; // string | number | boolean
type PropTypeUnion2 = Foo[A]; // string | number | boolean

```


### 多泛型关联


```
type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult;

//  "passed!"
type Result1 = Conditional<'linbudu', string, 'passed!', 'rejected!'>;

// "rejected!"
type Result2 = Conditional<'linbudu', boolean, 'passed!', 'rejected!'>;

```
### 对象类型中的泛型
最常见的一个例子应该还是响应类型结构的泛型处理，预留出了实际响应数据的泛型坑位，然后在你的请求函数中就可以传入特定的响应类型了

```
interface IRes<TData = unknown> {
  code: number;
  error?: string;
  data: TData;
}

type IPaginationRes<TItem = unknown> {
  data: TItem[];
  page: number;
  totalCount: number;
  hasNextPage: boolean;
}

type IUserProfileRes {
  name: string;
  homepage: string;
  avatar: string;
}
function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {}
function fetchUserProfileList(): Promise<IRes<IPaginationRes<IUserProfileRes>>> {}

```
### 函数中的泛型
在基于参数类型进行填充泛型时，其类型信息会被推断到尽可能精确的程度


```
// TS内置类型
type Pick<T, K extends keyof T> = {
    [Key in K]: T[Key];
};

// lodash 里面那个pick函数
pick<T extends object, U extends keyof T>(object: T, ...props: Array<U>): Pick<T, U>;

const object = { 'a': 1, 'b': '2', 'c': 3 };

pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }


```
### infer 关键字
TypeScript 中支持通过 infer 关键字来在条件类型中提取类型的某一部分信息

```
// 提取首尾两个
type ExtractStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...any[],
  infer End
]
  ? [Start, End]
  : T;

// 调换首尾两个
type SwapStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...infer Left,
  infer End
]
  ? [End, ...Left, Start]
  : T;

```

# 内置工具类型拓展
### 内置工具类型
在ts中有很多内置的工具类型，比如：
####  1.属性修饰工具类型

```
type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Required<T> = {
    [P in keyof T]-?: T[P];
};


```
其中，Partial 与 Required 可以认为是一对工具类型，它们的功能是相反的，而在实现上，它们的唯一差异是在索引类型签名处的可选修饰符，Partial 是 ?

#### 2.结构工具类型
这一部分的工具类型主要使用条件类型以及映射类型、索引类型。

```
// Record<string, unknown> 和 Record<string, any> 是日常使用较多的形式，通常我们使用这两者来代替 object
type Record<K extends keyof any, T> = {
    [P in K]: T;
};


// Pick和Omit和lodash里的是类似的
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

```
#### 3.集合工具类型

对于两个集合来说，通常存在交集、并集、差集、补集这么几种情况

```
// 交集
type Extract<T, U> = T extends U ? T : never;
// 差集
type Exclude<T, U> = T extends U ? never : T;
// 并集
export type Concurrence<A, B> = A | B;
// 补集
export type Complement<A, B extends A> = Exclude<A, B>;

type AExtractB = Extract<1 | 2 | 3, 1 | 2 | 4>; // 1 | 2

type SetA = 1 | 2 | 3 | 5;

type SetB = 0 | 1 | 2 | 4;

type AExcludeB = Exclude<SetA, SetB>; // 3 | 5
type BExcludeA = Exclude<SetB, SetA>; // 0 | 4


```

### 属性修饰进阶
#### 深层的属性修饰
就是类似于深拷贝的递归调用

```
export type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type DeepRequired<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

```
#### 属性类型的部分修饰
主要的做法就是把原有的对象拆分成一部分，然后再组装起来

```
type Flatten<T> = {
  [P in keyof T]: T[P];
};
export type MarkPropsAsOptional<
  T extends object,
  K extends keyof T = keyof T,
  D extends keyof T = keyof T,
> = Flatten<Partial<Pick<T, K>> & Omit<T, D>>;

```

#### 集合工具类型的延伸
之前内置集合类型可以延伸到对象的key值的集合计算

```
// 使用更精确的对象类型描述结构
export type PlainObjectType = Record<string, any>;

// 属性名并集
export type ObjectKeysConcurrence<
  T extends PlainObjectType,
  U extends PlainObjectType
> = keyof T | keyof U;

// 属性名交集
export type ObjectKeysIntersection<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Intersection<keyof T, keyof U>;

// 属性名差集
export type ObjectKeysDifference<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Difference<keyof T, keyof U>;

// 属性名补集
export type ObjectKeysComplement<
  T extends U,
  U extends PlainObjectType
> = Complement<keyof T, keyof U>;

```
# 模板字符串

模板字符串类型和泛型一样，可以通过JS函数传参一样，来接收参数返回一个新的值

#### 基本用法
```
type outPut<T extends string | number | boolean> = `Hello ${T}`
type o1 = outPut<'12'>
type o2 = outPut<string>
const po1:o2 = 'Hello ggg';

type Version = `${number}.${number}.${number}`;

```

#### 专用工具类型
这些工具类型专用于字符串字面量类型，包括 Uppercase、Lowercase、Capitalize 与 Uncapitalize

```
type UpStr<T extends string> = `${Uppercase<T>}`;
type LowStr<T extends string> = `${Lowercase<T>}`;
type CapStr<T extends string> = `${Capitalize<T>}`;

type UpStr1 = UpStr<'aaa'> // AAA
type CapStr1 = UpStr<'aaa'> // Aaa

```

# TS类型编程

对传入的类型参数（泛型）做各种逻辑运算，产生新的类型，这就是类型编程
简单点来理解就是循环、条件等各种 JS 里面有的语法它都有，JS 能写的逻辑它都能写。


#### 数组

```
// 提取第一个元素的类型
type GetFirst<Arr extends unknown[]> = 
    Arr extends [infer First, ...unknown[]] ? First : never;
    
// 提取最后一个元素   
type GetLast<Arr extends unknown[]> = 
    Arr extends [...unknown[], infer Last] ? Last : never;
    
// 除去头部的
type PopArr<Arr extends unknown[]> = 
    Arr extends [] ? [] 
        : Arr extends [...infer Rest, unknown] ? Rest : never;
// ReverseArr
type ReverseArr<Arr extends unknown[]> = 
    Arr extends [infer First, ...infer Rest] 
        ? [...ReverseArr<Rest>, First] 
        : Arr;
// Includes
type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);
type Includes<Arr extends unknown[], FindItem> = 
    Arr extends [infer First, ...infer Rest]
        ? IsEqual<First, FindItem> extends true
            ? true
            : Includes<Rest, FindItem>
        : false;


```
#### 字符串

```
// StartsWith
type StartsWith<Str extends string, Prefix extends string> = 
    Str extends `${Prefix}${string}` ? true : false;
// Replace
type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
  > = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}` : Str;
// ReverseStr
type ReverseStr<
    Str extends string, 
    Result extends string = ''
> = Str extends `${infer First}${infer Rest}` 
    ? ReverseStr<Rest, `${First}${Result}`> 
    : Result;
```