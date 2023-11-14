import{_ as s,o as n,c as e,Q as a}from"./chunks/framework.d7a29f29.js";const h=JSON.parse('{"title":"# 泛型","description":"","frontmatter":{},"headers":[],"relativePath":"articles/js/typescript.md","filePath":"articles/js/typescript.md"}'),l={name:"articles/js/typescript.md"},p=a(`<h1 id="泛型" tabindex="-1"># 泛型 <a class="header-anchor" href="#泛型" aria-label="Permalink to &quot;# 泛型&quot;">​</a></h1><h3 id="类型别名中的泛型" tabindex="-1">类型别名中的泛型 <a class="header-anchor" href="#类型别名中的泛型" aria-label="Permalink to &quot;类型别名中的泛型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 等价于一个接受参数的函数</span></span>
<span class="line"><span style="color:#e1e4e8;">type Factory&lt;T&gt; = T | number | string;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// TypeScript 的内置工具类型</span></span>
<span class="line"><span style="color:#e1e4e8;">type Partial&lt;T&gt; = {</span></span>
<span class="line"><span style="color:#e1e4e8;">    [P in keyof T]?: T[P];</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;">interface Obj {</span></span>
<span class="line"><span style="color:#e1e4e8;">  prop1: string;</span></span>
<span class="line"><span style="color:#e1e4e8;">  prop2: number;</span></span>
<span class="line"><span style="color:#e1e4e8;">  prop3: boolean;</span></span>
<span class="line"><span style="color:#e1e4e8;">  prop4: () =&gt; void;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">type PartialObj = Partial&lt;Obj&gt;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 等价于一个接受参数的函数</span></span>
<span class="line"><span style="color:#24292e;">type Factory&lt;T&gt; = T | number | string;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// TypeScript 的内置工具类型</span></span>
<span class="line"><span style="color:#24292e;">type Partial&lt;T&gt; = {</span></span>
<span class="line"><span style="color:#24292e;">    [P in keyof T]?: T[P];</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;">interface Obj {</span></span>
<span class="line"><span style="color:#24292e;">  prop1: string;</span></span>
<span class="line"><span style="color:#24292e;">  prop2: number;</span></span>
<span class="line"><span style="color:#24292e;">  prop3: boolean;</span></span>
<span class="line"><span style="color:#24292e;">  prop4: () =&gt; void;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">type PartialObj = Partial&lt;Obj&gt;;</span></span></code></pre></div><h3 id="泛型约束与默认值" tabindex="-1">泛型约束与默认值 <a class="header-anchor" href="#泛型约束与默认值" aria-label="Permalink to &quot;泛型约束与默认值&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 给一个参数的默认值</span></span>
<span class="line"><span style="color:#e1e4e8;">type Factory&lt;T = boolean&gt; = T | number | string;</span></span>
<span class="line"><span style="color:#e1e4e8;">const foo: Factory = false;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 给一个参数的默认值</span></span>
<span class="line"><span style="color:#24292e;">type Factory&lt;T = boolean&gt; = T | number | string;</span></span>
<span class="line"><span style="color:#24292e;">const foo: Factory = false;</span></span></code></pre></div><h4 id="extend" tabindex="-1">extend <a class="header-anchor" href="#extend" aria-label="Permalink to &quot;extend&quot;">​</a></h4><p>extends关键字来约束传入的泛型参数必须符合要求，A extends B 意味着 A 是 B 的子类型，类似于“柯基 extends 狗”</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type ResStatus&lt;ResCode extends number&gt; = ResCode extends 10000 | 10001 | 10002</span></span>
<span class="line"><span style="color:#e1e4e8;">  ? &#39;success&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">  : &#39;failure&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">type Res1 = ResStatus&lt;10000&gt;; // &quot;success&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">type Res2 = ResStatus&lt;20000&gt;; // &quot;failure&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type Res3 = ResStatus&lt;&#39;10000&#39;&gt;; // 类型“string”不满足约束“number”。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type ResStatus&lt;ResCode extends number&gt; = ResCode extends 10000 | 10001 | 10002</span></span>
<span class="line"><span style="color:#24292e;">  ? &#39;success&#39;</span></span>
<span class="line"><span style="color:#24292e;">  : &#39;failure&#39;;</span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">type Res1 = ResStatus&lt;10000&gt;; // &quot;success&quot;</span></span>
<span class="line"><span style="color:#24292e;">type Res2 = ResStatus&lt;20000&gt;; // &quot;failure&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type Res3 = ResStatus&lt;&#39;10000&#39;&gt;; // 类型“string”不满足约束“number”。</span></span></code></pre></div><h4 id="keyof" tabindex="-1">keyof <a class="header-anchor" href="#keyof" aria-label="Permalink to &quot;keyof&quot;">​</a></h4><p>类比如JS中的Object.keys()</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">interface Foo {</span></span>
<span class="line"><span style="color:#e1e4e8;">  propA: number;</span></span>
<span class="line"><span style="color:#e1e4e8;">  propB: boolean;</span></span>
<span class="line"><span style="color:#e1e4e8;">  propC: string;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type A = keyof Foo</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type PropAType = Foo[&#39;propA&#39;]; // number</span></span>
<span class="line"><span style="color:#e1e4e8;">type PropBType = Foo[&#39;propB&#39;]; // boolean</span></span>
<span class="line"><span style="color:#e1e4e8;">type PropTypeUnion = Foo[keyof Foo]; // string | number | boolean</span></span>
<span class="line"><span style="color:#e1e4e8;">type PropTypeUnion2 = Foo[A]; // string | number | boolean</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">interface Foo {</span></span>
<span class="line"><span style="color:#24292e;">  propA: number;</span></span>
<span class="line"><span style="color:#24292e;">  propB: boolean;</span></span>
<span class="line"><span style="color:#24292e;">  propC: string;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type A = keyof Foo</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type PropAType = Foo[&#39;propA&#39;]; // number</span></span>
<span class="line"><span style="color:#24292e;">type PropBType = Foo[&#39;propB&#39;]; // boolean</span></span>
<span class="line"><span style="color:#24292e;">type PropTypeUnion = Foo[keyof Foo]; // string | number | boolean</span></span>
<span class="line"><span style="color:#24292e;">type PropTypeUnion2 = Foo[A]; // string | number | boolean</span></span></code></pre></div><h3 id="多泛型关联" tabindex="-1">多泛型关联 <a class="header-anchor" href="#多泛型关联" aria-label="Permalink to &quot;多泛型关联&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type Conditional&lt;Type, Condition, TruthyResult, FalsyResult&gt; =</span></span>
<span class="line"><span style="color:#e1e4e8;">  Type extends Condition ? TruthyResult : FalsyResult;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//  &quot;passed!&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">type Result1 = Conditional&lt;&#39;linbudu&#39;, string, &#39;passed!&#39;, &#39;rejected!&#39;&gt;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// &quot;rejected!&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">type Result2 = Conditional&lt;&#39;linbudu&#39;, boolean, &#39;passed!&#39;, &#39;rejected!&#39;&gt;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type Conditional&lt;Type, Condition, TruthyResult, FalsyResult&gt; =</span></span>
<span class="line"><span style="color:#24292e;">  Type extends Condition ? TruthyResult : FalsyResult;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//  &quot;passed!&quot;</span></span>
<span class="line"><span style="color:#24292e;">type Result1 = Conditional&lt;&#39;linbudu&#39;, string, &#39;passed!&#39;, &#39;rejected!&#39;&gt;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// &quot;rejected!&quot;</span></span>
<span class="line"><span style="color:#24292e;">type Result2 = Conditional&lt;&#39;linbudu&#39;, boolean, &#39;passed!&#39;, &#39;rejected!&#39;&gt;;</span></span></code></pre></div><h3 id="对象类型中的泛型" tabindex="-1">对象类型中的泛型 <a class="header-anchor" href="#对象类型中的泛型" aria-label="Permalink to &quot;对象类型中的泛型&quot;">​</a></h3><p>最常见的一个例子应该还是响应类型结构的泛型处理，预留出了实际响应数据的泛型坑位，然后在你的请求函数中就可以传入特定的响应类型了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">interface IRes&lt;TData = unknown&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  code: number;</span></span>
<span class="line"><span style="color:#e1e4e8;">  error?: string;</span></span>
<span class="line"><span style="color:#e1e4e8;">  data: TData;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type IPaginationRes&lt;TItem = unknown&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  data: TItem[];</span></span>
<span class="line"><span style="color:#e1e4e8;">  page: number;</span></span>
<span class="line"><span style="color:#e1e4e8;">  totalCount: number;</span></span>
<span class="line"><span style="color:#e1e4e8;">  hasNextPage: boolean;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type IUserProfileRes {</span></span>
<span class="line"><span style="color:#e1e4e8;">  name: string;</span></span>
<span class="line"><span style="color:#e1e4e8;">  homepage: string;</span></span>
<span class="line"><span style="color:#e1e4e8;">  avatar: string;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">function fetchUserProfile(): Promise&lt;IRes&lt;IUserProfileRes&gt;&gt; {}</span></span>
<span class="line"><span style="color:#e1e4e8;">function fetchUserProfileList(): Promise&lt;IRes&lt;IPaginationRes&lt;IUserProfileRes&gt;&gt;&gt; {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">interface IRes&lt;TData = unknown&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  code: number;</span></span>
<span class="line"><span style="color:#24292e;">  error?: string;</span></span>
<span class="line"><span style="color:#24292e;">  data: TData;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type IPaginationRes&lt;TItem = unknown&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  data: TItem[];</span></span>
<span class="line"><span style="color:#24292e;">  page: number;</span></span>
<span class="line"><span style="color:#24292e;">  totalCount: number;</span></span>
<span class="line"><span style="color:#24292e;">  hasNextPage: boolean;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type IUserProfileRes {</span></span>
<span class="line"><span style="color:#24292e;">  name: string;</span></span>
<span class="line"><span style="color:#24292e;">  homepage: string;</span></span>
<span class="line"><span style="color:#24292e;">  avatar: string;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">function fetchUserProfile(): Promise&lt;IRes&lt;IUserProfileRes&gt;&gt; {}</span></span>
<span class="line"><span style="color:#24292e;">function fetchUserProfileList(): Promise&lt;IRes&lt;IPaginationRes&lt;IUserProfileRes&gt;&gt;&gt; {}</span></span></code></pre></div><h3 id="函数中的泛型" tabindex="-1">函数中的泛型 <a class="header-anchor" href="#函数中的泛型" aria-label="Permalink to &quot;函数中的泛型&quot;">​</a></h3><p>在基于参数类型进行填充泛型时，其类型信息会被推断到尽可能精确的程度</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// TS内置类型</span></span>
<span class="line"><span style="color:#e1e4e8;">type Pick&lt;T, K extends keyof T&gt; = {</span></span>
<span class="line"><span style="color:#e1e4e8;">    [Key in K]: T[Key];</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// lodash 里面那个pick函数</span></span>
<span class="line"><span style="color:#e1e4e8;">pick&lt;T extends object, U extends keyof T&gt;(object: T, ...props: Array&lt;U&gt;): Pick&lt;T, U&gt;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const object = { &#39;a&#39;: 1, &#39;b&#39;: &#39;2&#39;, &#39;c&#39;: 3 };</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pick(object, [&#39;a&#39;, &#39;c&#39;]);</span></span>
<span class="line"><span style="color:#e1e4e8;">// =&gt; { &#39;a&#39;: 1, &#39;c&#39;: 3 }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// TS内置类型</span></span>
<span class="line"><span style="color:#24292e;">type Pick&lt;T, K extends keyof T&gt; = {</span></span>
<span class="line"><span style="color:#24292e;">    [Key in K]: T[Key];</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// lodash 里面那个pick函数</span></span>
<span class="line"><span style="color:#24292e;">pick&lt;T extends object, U extends keyof T&gt;(object: T, ...props: Array&lt;U&gt;): Pick&lt;T, U&gt;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const object = { &#39;a&#39;: 1, &#39;b&#39;: &#39;2&#39;, &#39;c&#39;: 3 };</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pick(object, [&#39;a&#39;, &#39;c&#39;]);</span></span>
<span class="line"><span style="color:#24292e;">// =&gt; { &#39;a&#39;: 1, &#39;c&#39;: 3 }</span></span></code></pre></div><h3 id="infer-关键字" tabindex="-1">infer 关键字 <a class="header-anchor" href="#infer-关键字" aria-label="Permalink to &quot;infer 关键字&quot;">​</a></h3><p>TypeScript 中支持通过 infer 关键字来在条件类型中提取类型的某一部分信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 提取首尾两个</span></span>
<span class="line"><span style="color:#e1e4e8;">type ExtractStartAndEnd&lt;T extends any[]&gt; = T extends [</span></span>
<span class="line"><span style="color:#e1e4e8;">  infer Start,</span></span>
<span class="line"><span style="color:#e1e4e8;">  ...any[],</span></span>
<span class="line"><span style="color:#e1e4e8;">  infer End</span></span>
<span class="line"><span style="color:#e1e4e8;">]</span></span>
<span class="line"><span style="color:#e1e4e8;">  ? [Start, End]</span></span>
<span class="line"><span style="color:#e1e4e8;">  : T;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 调换首尾两个</span></span>
<span class="line"><span style="color:#e1e4e8;">type SwapStartAndEnd&lt;T extends any[]&gt; = T extends [</span></span>
<span class="line"><span style="color:#e1e4e8;">  infer Start,</span></span>
<span class="line"><span style="color:#e1e4e8;">  ...infer Left,</span></span>
<span class="line"><span style="color:#e1e4e8;">  infer End</span></span>
<span class="line"><span style="color:#e1e4e8;">]</span></span>
<span class="line"><span style="color:#e1e4e8;">  ? [End, ...Left, Start]</span></span>
<span class="line"><span style="color:#e1e4e8;">  : T;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 提取首尾两个</span></span>
<span class="line"><span style="color:#24292e;">type ExtractStartAndEnd&lt;T extends any[]&gt; = T extends [</span></span>
<span class="line"><span style="color:#24292e;">  infer Start,</span></span>
<span class="line"><span style="color:#24292e;">  ...any[],</span></span>
<span class="line"><span style="color:#24292e;">  infer End</span></span>
<span class="line"><span style="color:#24292e;">]</span></span>
<span class="line"><span style="color:#24292e;">  ? [Start, End]</span></span>
<span class="line"><span style="color:#24292e;">  : T;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 调换首尾两个</span></span>
<span class="line"><span style="color:#24292e;">type SwapStartAndEnd&lt;T extends any[]&gt; = T extends [</span></span>
<span class="line"><span style="color:#24292e;">  infer Start,</span></span>
<span class="line"><span style="color:#24292e;">  ...infer Left,</span></span>
<span class="line"><span style="color:#24292e;">  infer End</span></span>
<span class="line"><span style="color:#24292e;">]</span></span>
<span class="line"><span style="color:#24292e;">  ? [End, ...Left, Start]</span></span>
<span class="line"><span style="color:#24292e;">  : T;</span></span></code></pre></div><h1 id="内置工具类型拓展" tabindex="-1">内置工具类型拓展 <a class="header-anchor" href="#内置工具类型拓展" aria-label="Permalink to &quot;内置工具类型拓展&quot;">​</a></h1><h3 id="内置工具类型" tabindex="-1">内置工具类型 <a class="header-anchor" href="#内置工具类型" aria-label="Permalink to &quot;内置工具类型&quot;">​</a></h3><p>在ts中有很多内置的工具类型，比如：</p><h4 id="_1-属性修饰工具类型" tabindex="-1">1.属性修饰工具类型 <a class="header-anchor" href="#_1-属性修饰工具类型" aria-label="Permalink to &quot;1.属性修饰工具类型&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type Partial&lt;T&gt; = {</span></span>
<span class="line"><span style="color:#e1e4e8;">    [P in keyof T]?: T[P];</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type Required&lt;T&gt; = {</span></span>
<span class="line"><span style="color:#e1e4e8;">    [P in keyof T]-?: T[P];</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type Partial&lt;T&gt; = {</span></span>
<span class="line"><span style="color:#24292e;">    [P in keyof T]?: T[P];</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type Required&lt;T&gt; = {</span></span>
<span class="line"><span style="color:#24292e;">    [P in keyof T]-?: T[P];</span></span>
<span class="line"><span style="color:#24292e;">};</span></span></code></pre></div><p>其中，Partial 与 Required 可以认为是一对工具类型，它们的功能是相反的，而在实现上，它们的唯一差异是在索引类型签名处的可选修饰符，Partial 是 ?</p><h4 id="_2-结构工具类型" tabindex="-1">2.结构工具类型 <a class="header-anchor" href="#_2-结构工具类型" aria-label="Permalink to &quot;2.结构工具类型&quot;">​</a></h4><p>这一部分的工具类型主要使用条件类型以及映射类型、索引类型。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// Record&lt;string, unknown&gt; 和 Record&lt;string, any&gt; 是日常使用较多的形式，通常我们使用这两者来代替 object</span></span>
<span class="line"><span style="color:#e1e4e8;">type Record&lt;K extends keyof any, T&gt; = {</span></span>
<span class="line"><span style="color:#e1e4e8;">    [P in K]: T;</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// Pick和Omit和lodash里的是类似的</span></span>
<span class="line"><span style="color:#e1e4e8;">type Pick&lt;T, K extends keyof T&gt; = {</span></span>
<span class="line"><span style="color:#e1e4e8;">    [P in K]: T[P];</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type Omit&lt;T, K extends keyof any&gt; = Pick&lt;T, Exclude&lt;keyof T, K&gt;&gt;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// Record&lt;string, unknown&gt; 和 Record&lt;string, any&gt; 是日常使用较多的形式，通常我们使用这两者来代替 object</span></span>
<span class="line"><span style="color:#24292e;">type Record&lt;K extends keyof any, T&gt; = {</span></span>
<span class="line"><span style="color:#24292e;">    [P in K]: T;</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// Pick和Omit和lodash里的是类似的</span></span>
<span class="line"><span style="color:#24292e;">type Pick&lt;T, K extends keyof T&gt; = {</span></span>
<span class="line"><span style="color:#24292e;">    [P in K]: T[P];</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type Omit&lt;T, K extends keyof any&gt; = Pick&lt;T, Exclude&lt;keyof T, K&gt;&gt;;</span></span></code></pre></div><h4 id="_3-集合工具类型" tabindex="-1">3.集合工具类型 <a class="header-anchor" href="#_3-集合工具类型" aria-label="Permalink to &quot;3.集合工具类型&quot;">​</a></h4><p>对于两个集合来说，通常存在交集、并集、差集、补集这么几种情况</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 交集</span></span>
<span class="line"><span style="color:#e1e4e8;">type Extract&lt;T, U&gt; = T extends U ? T : never;</span></span>
<span class="line"><span style="color:#e1e4e8;">// 差集</span></span>
<span class="line"><span style="color:#e1e4e8;">type Exclude&lt;T, U&gt; = T extends U ? never : T;</span></span>
<span class="line"><span style="color:#e1e4e8;">// 并集</span></span>
<span class="line"><span style="color:#e1e4e8;">export type Concurrence&lt;A, B&gt; = A | B;</span></span>
<span class="line"><span style="color:#e1e4e8;">// 补集</span></span>
<span class="line"><span style="color:#e1e4e8;">export type Complement&lt;A, B extends A&gt; = Exclude&lt;A, B&gt;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type AExtractB = Extract&lt;1 | 2 | 3, 1 | 2 | 4&gt;; // 1 | 2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type SetA = 1 | 2 | 3 | 5;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type SetB = 0 | 1 | 2 | 4;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type AExcludeB = Exclude&lt;SetA, SetB&gt;; // 3 | 5</span></span>
<span class="line"><span style="color:#e1e4e8;">type BExcludeA = Exclude&lt;SetB, SetA&gt;; // 0 | 4</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 交集</span></span>
<span class="line"><span style="color:#24292e;">type Extract&lt;T, U&gt; = T extends U ? T : never;</span></span>
<span class="line"><span style="color:#24292e;">// 差集</span></span>
<span class="line"><span style="color:#24292e;">type Exclude&lt;T, U&gt; = T extends U ? never : T;</span></span>
<span class="line"><span style="color:#24292e;">// 并集</span></span>
<span class="line"><span style="color:#24292e;">export type Concurrence&lt;A, B&gt; = A | B;</span></span>
<span class="line"><span style="color:#24292e;">// 补集</span></span>
<span class="line"><span style="color:#24292e;">export type Complement&lt;A, B extends A&gt; = Exclude&lt;A, B&gt;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type AExtractB = Extract&lt;1 | 2 | 3, 1 | 2 | 4&gt;; // 1 | 2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type SetA = 1 | 2 | 3 | 5;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type SetB = 0 | 1 | 2 | 4;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type AExcludeB = Exclude&lt;SetA, SetB&gt;; // 3 | 5</span></span>
<span class="line"><span style="color:#24292e;">type BExcludeA = Exclude&lt;SetB, SetA&gt;; // 0 | 4</span></span></code></pre></div><h3 id="属性修饰进阶" tabindex="-1">属性修饰进阶 <a class="header-anchor" href="#属性修饰进阶" aria-label="Permalink to &quot;属性修饰进阶&quot;">​</a></h3><h4 id="深层的属性修饰" tabindex="-1">深层的属性修饰 <a class="header-anchor" href="#深层的属性修饰" aria-label="Permalink to &quot;深层的属性修饰&quot;">​</a></h4><p>就是类似于深拷贝的递归调用</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">export type DeepPartial&lt;T extends object&gt; = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  [K in keyof T]?: T[K] extends object ? DeepPartial&lt;T[K]&gt; : T[K];</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export type DeepRequired&lt;T extends object&gt; = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  [K in keyof T]-?: T[K] extends object ? DeepRequired&lt;T[K]&gt; : T[K];</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">export type DeepPartial&lt;T extends object&gt; = {</span></span>
<span class="line"><span style="color:#24292e;">  [K in keyof T]?: T[K] extends object ? DeepPartial&lt;T[K]&gt; : T[K];</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export type DeepRequired&lt;T extends object&gt; = {</span></span>
<span class="line"><span style="color:#24292e;">  [K in keyof T]-?: T[K] extends object ? DeepRequired&lt;T[K]&gt; : T[K];</span></span>
<span class="line"><span style="color:#24292e;">};</span></span></code></pre></div><h4 id="属性类型的部分修饰" tabindex="-1">属性类型的部分修饰 <a class="header-anchor" href="#属性类型的部分修饰" aria-label="Permalink to &quot;属性类型的部分修饰&quot;">​</a></h4><p>主要的做法就是把原有的对象拆分成一部分，然后再组装起来</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type Flatten&lt;T&gt; = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  [P in keyof T]: T[P];</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;">export type MarkPropsAsOptional&lt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  T extends object,</span></span>
<span class="line"><span style="color:#e1e4e8;">  K extends keyof T = keyof T,</span></span>
<span class="line"><span style="color:#e1e4e8;">  D extends keyof T = keyof T,</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; = Flatten&lt;Partial&lt;Pick&lt;T, K&gt;&gt; &amp; Omit&lt;T, D&gt;&gt;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type Flatten&lt;T&gt; = {</span></span>
<span class="line"><span style="color:#24292e;">  [P in keyof T]: T[P];</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;">export type MarkPropsAsOptional&lt;</span></span>
<span class="line"><span style="color:#24292e;">  T extends object,</span></span>
<span class="line"><span style="color:#24292e;">  K extends keyof T = keyof T,</span></span>
<span class="line"><span style="color:#24292e;">  D extends keyof T = keyof T,</span></span>
<span class="line"><span style="color:#24292e;">&gt; = Flatten&lt;Partial&lt;Pick&lt;T, K&gt;&gt; &amp; Omit&lt;T, D&gt;&gt;;</span></span></code></pre></div><h4 id="集合工具类型的延伸" tabindex="-1">集合工具类型的延伸 <a class="header-anchor" href="#集合工具类型的延伸" aria-label="Permalink to &quot;集合工具类型的延伸&quot;">​</a></h4><p>之前内置集合类型可以延伸到对象的key值的集合计算</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 使用更精确的对象类型描述结构</span></span>
<span class="line"><span style="color:#e1e4e8;">export type PlainObjectType = Record&lt;string, any&gt;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 属性名并集</span></span>
<span class="line"><span style="color:#e1e4e8;">export type ObjectKeysConcurrence&lt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  T extends PlainObjectType,</span></span>
<span class="line"><span style="color:#e1e4e8;">  U extends PlainObjectType</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; = keyof T | keyof U;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 属性名交集</span></span>
<span class="line"><span style="color:#e1e4e8;">export type ObjectKeysIntersection&lt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  T extends PlainObjectType,</span></span>
<span class="line"><span style="color:#e1e4e8;">  U extends PlainObjectType</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; = Intersection&lt;keyof T, keyof U&gt;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 属性名差集</span></span>
<span class="line"><span style="color:#e1e4e8;">export type ObjectKeysDifference&lt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  T extends PlainObjectType,</span></span>
<span class="line"><span style="color:#e1e4e8;">  U extends PlainObjectType</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; = Difference&lt;keyof T, keyof U&gt;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 属性名补集</span></span>
<span class="line"><span style="color:#e1e4e8;">export type ObjectKeysComplement&lt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  T extends U,</span></span>
<span class="line"><span style="color:#e1e4e8;">  U extends PlainObjectType</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; = Complement&lt;keyof T, keyof U&gt;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 使用更精确的对象类型描述结构</span></span>
<span class="line"><span style="color:#24292e;">export type PlainObjectType = Record&lt;string, any&gt;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 属性名并集</span></span>
<span class="line"><span style="color:#24292e;">export type ObjectKeysConcurrence&lt;</span></span>
<span class="line"><span style="color:#24292e;">  T extends PlainObjectType,</span></span>
<span class="line"><span style="color:#24292e;">  U extends PlainObjectType</span></span>
<span class="line"><span style="color:#24292e;">&gt; = keyof T | keyof U;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 属性名交集</span></span>
<span class="line"><span style="color:#24292e;">export type ObjectKeysIntersection&lt;</span></span>
<span class="line"><span style="color:#24292e;">  T extends PlainObjectType,</span></span>
<span class="line"><span style="color:#24292e;">  U extends PlainObjectType</span></span>
<span class="line"><span style="color:#24292e;">&gt; = Intersection&lt;keyof T, keyof U&gt;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 属性名差集</span></span>
<span class="line"><span style="color:#24292e;">export type ObjectKeysDifference&lt;</span></span>
<span class="line"><span style="color:#24292e;">  T extends PlainObjectType,</span></span>
<span class="line"><span style="color:#24292e;">  U extends PlainObjectType</span></span>
<span class="line"><span style="color:#24292e;">&gt; = Difference&lt;keyof T, keyof U&gt;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 属性名补集</span></span>
<span class="line"><span style="color:#24292e;">export type ObjectKeysComplement&lt;</span></span>
<span class="line"><span style="color:#24292e;">  T extends U,</span></span>
<span class="line"><span style="color:#24292e;">  U extends PlainObjectType</span></span>
<span class="line"><span style="color:#24292e;">&gt; = Complement&lt;keyof T, keyof U&gt;;</span></span></code></pre></div><h1 id="模板字符串" tabindex="-1">模板字符串 <a class="header-anchor" href="#模板字符串" aria-label="Permalink to &quot;模板字符串&quot;">​</a></h1><p>模板字符串类型和泛型一样，可以通过JS函数传参一样，来接收参数返回一个新的值</p><h4 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type outPut&lt;T extends string | number | boolean&gt; = \`Hello \${T}\`</span></span>
<span class="line"><span style="color:#e1e4e8;">type o1 = outPut&lt;&#39;12&#39;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">type o2 = outPut&lt;string&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">const po1:o2 = &#39;Hello ggg&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type Version = \`\${number}.\${number}.\${number}\`;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type outPut&lt;T extends string | number | boolean&gt; = \`Hello \${T}\`</span></span>
<span class="line"><span style="color:#24292e;">type o1 = outPut&lt;&#39;12&#39;&gt;</span></span>
<span class="line"><span style="color:#24292e;">type o2 = outPut&lt;string&gt;</span></span>
<span class="line"><span style="color:#24292e;">const po1:o2 = &#39;Hello ggg&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type Version = \`\${number}.\${number}.\${number}\`;</span></span></code></pre></div><h4 id="专用工具类型" tabindex="-1">专用工具类型 <a class="header-anchor" href="#专用工具类型" aria-label="Permalink to &quot;专用工具类型&quot;">​</a></h4><p>这些工具类型专用于字符串字面量类型，包括 Uppercase、Lowercase、Capitalize 与 Uncapitalize</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type UpStr&lt;T extends string&gt; = \`\${Uppercase&lt;T&gt;}\`;</span></span>
<span class="line"><span style="color:#e1e4e8;">type LowStr&lt;T extends string&gt; = \`\${Lowercase&lt;T&gt;}\`;</span></span>
<span class="line"><span style="color:#e1e4e8;">type CapStr&lt;T extends string&gt; = \`\${Capitalize&lt;T&gt;}\`;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">type UpStr1 = UpStr&lt;&#39;aaa&#39;&gt; // AAA</span></span>
<span class="line"><span style="color:#e1e4e8;">type CapStr1 = UpStr&lt;&#39;aaa&#39;&gt; // Aaa</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type UpStr&lt;T extends string&gt; = \`\${Uppercase&lt;T&gt;}\`;</span></span>
<span class="line"><span style="color:#24292e;">type LowStr&lt;T extends string&gt; = \`\${Lowercase&lt;T&gt;}\`;</span></span>
<span class="line"><span style="color:#24292e;">type CapStr&lt;T extends string&gt; = \`\${Capitalize&lt;T&gt;}\`;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">type UpStr1 = UpStr&lt;&#39;aaa&#39;&gt; // AAA</span></span>
<span class="line"><span style="color:#24292e;">type CapStr1 = UpStr&lt;&#39;aaa&#39;&gt; // Aaa</span></span></code></pre></div><h1 id="ts类型编程" tabindex="-1">TS类型编程 <a class="header-anchor" href="#ts类型编程" aria-label="Permalink to &quot;TS类型编程&quot;">​</a></h1><p>对传入的类型参数（泛型）做各种逻辑运算，产生新的类型，这就是类型编程 简单点来理解就是循环、条件等各种 JS 里面有的语法它都有，JS 能写的逻辑它都能写。</p><h4 id="数组" tabindex="-1">数组 <a class="header-anchor" href="#数组" aria-label="Permalink to &quot;数组&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 提取第一个元素的类型</span></span>
<span class="line"><span style="color:#e1e4e8;">type GetFirst&lt;Arr extends unknown[]&gt; = </span></span>
<span class="line"><span style="color:#e1e4e8;">    Arr extends [infer First, ...unknown[]] ? First : never;</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">// 提取最后一个元素   </span></span>
<span class="line"><span style="color:#e1e4e8;">type GetLast&lt;Arr extends unknown[]&gt; = </span></span>
<span class="line"><span style="color:#e1e4e8;">    Arr extends [...unknown[], infer Last] ? Last : never;</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">// 除去头部的</span></span>
<span class="line"><span style="color:#e1e4e8;">type PopArr&lt;Arr extends unknown[]&gt; = </span></span>
<span class="line"><span style="color:#e1e4e8;">    Arr extends [] ? [] </span></span>
<span class="line"><span style="color:#e1e4e8;">        : Arr extends [...infer Rest, unknown] ? Rest : never;</span></span>
<span class="line"><span style="color:#e1e4e8;">// ReverseArr</span></span>
<span class="line"><span style="color:#e1e4e8;">type ReverseArr&lt;Arr extends unknown[]&gt; = </span></span>
<span class="line"><span style="color:#e1e4e8;">    Arr extends [infer First, ...infer Rest] </span></span>
<span class="line"><span style="color:#e1e4e8;">        ? [...ReverseArr&lt;Rest&gt;, First] </span></span>
<span class="line"><span style="color:#e1e4e8;">        : Arr;</span></span>
<span class="line"><span style="color:#e1e4e8;">// Includes</span></span>
<span class="line"><span style="color:#e1e4e8;">type IsEqual&lt;A, B&gt; = (A extends B ? true : false) &amp; (B extends A ? true : false);</span></span>
<span class="line"><span style="color:#e1e4e8;">type Includes&lt;Arr extends unknown[], FindItem&gt; = </span></span>
<span class="line"><span style="color:#e1e4e8;">    Arr extends [infer First, ...infer Rest]</span></span>
<span class="line"><span style="color:#e1e4e8;">        ? IsEqual&lt;First, FindItem&gt; extends true</span></span>
<span class="line"><span style="color:#e1e4e8;">            ? true</span></span>
<span class="line"><span style="color:#e1e4e8;">            : Includes&lt;Rest, FindItem&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">        : false;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 提取第一个元素的类型</span></span>
<span class="line"><span style="color:#24292e;">type GetFirst&lt;Arr extends unknown[]&gt; = </span></span>
<span class="line"><span style="color:#24292e;">    Arr extends [infer First, ...unknown[]] ? First : never;</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">// 提取最后一个元素   </span></span>
<span class="line"><span style="color:#24292e;">type GetLast&lt;Arr extends unknown[]&gt; = </span></span>
<span class="line"><span style="color:#24292e;">    Arr extends [...unknown[], infer Last] ? Last : never;</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">// 除去头部的</span></span>
<span class="line"><span style="color:#24292e;">type PopArr&lt;Arr extends unknown[]&gt; = </span></span>
<span class="line"><span style="color:#24292e;">    Arr extends [] ? [] </span></span>
<span class="line"><span style="color:#24292e;">        : Arr extends [...infer Rest, unknown] ? Rest : never;</span></span>
<span class="line"><span style="color:#24292e;">// ReverseArr</span></span>
<span class="line"><span style="color:#24292e;">type ReverseArr&lt;Arr extends unknown[]&gt; = </span></span>
<span class="line"><span style="color:#24292e;">    Arr extends [infer First, ...infer Rest] </span></span>
<span class="line"><span style="color:#24292e;">        ? [...ReverseArr&lt;Rest&gt;, First] </span></span>
<span class="line"><span style="color:#24292e;">        : Arr;</span></span>
<span class="line"><span style="color:#24292e;">// Includes</span></span>
<span class="line"><span style="color:#24292e;">type IsEqual&lt;A, B&gt; = (A extends B ? true : false) &amp; (B extends A ? true : false);</span></span>
<span class="line"><span style="color:#24292e;">type Includes&lt;Arr extends unknown[], FindItem&gt; = </span></span>
<span class="line"><span style="color:#24292e;">    Arr extends [infer First, ...infer Rest]</span></span>
<span class="line"><span style="color:#24292e;">        ? IsEqual&lt;First, FindItem&gt; extends true</span></span>
<span class="line"><span style="color:#24292e;">            ? true</span></span>
<span class="line"><span style="color:#24292e;">            : Includes&lt;Rest, FindItem&gt;</span></span>
<span class="line"><span style="color:#24292e;">        : false;</span></span></code></pre></div><h4 id="字符串" tabindex="-1">字符串 <a class="header-anchor" href="#字符串" aria-label="Permalink to &quot;字符串&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// StartsWith</span></span>
<span class="line"><span style="color:#e1e4e8;">type StartsWith&lt;Str extends string, Prefix extends string&gt; = </span></span>
<span class="line"><span style="color:#e1e4e8;">    Str extends \`\${Prefix}\${string}\` ? true : false;</span></span>
<span class="line"><span style="color:#e1e4e8;">// Replace</span></span>
<span class="line"><span style="color:#e1e4e8;">type ReplaceStr&lt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  Str extends string,</span></span>
<span class="line"><span style="color:#e1e4e8;">  From extends string,</span></span>
<span class="line"><span style="color:#e1e4e8;">  To extends string</span></span>
<span class="line"><span style="color:#e1e4e8;">  &gt; = Str extends \`\${infer Prefix}\${From}\${infer Suffix}\`</span></span>
<span class="line"><span style="color:#e1e4e8;">  ? \`\${Prefix}\${To}\${Suffix}\` : Str;</span></span>
<span class="line"><span style="color:#e1e4e8;">// ReverseStr</span></span>
<span class="line"><span style="color:#e1e4e8;">type ReverseStr&lt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    Str extends string, </span></span>
<span class="line"><span style="color:#e1e4e8;">    Result extends string = &#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; = Str extends \`\${infer First}\${infer Rest}\` </span></span>
<span class="line"><span style="color:#e1e4e8;">    ? ReverseStr&lt;Rest, \`\${First}\${Result}\`&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;">    : Result;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// StartsWith</span></span>
<span class="line"><span style="color:#24292e;">type StartsWith&lt;Str extends string, Prefix extends string&gt; = </span></span>
<span class="line"><span style="color:#24292e;">    Str extends \`\${Prefix}\${string}\` ? true : false;</span></span>
<span class="line"><span style="color:#24292e;">// Replace</span></span>
<span class="line"><span style="color:#24292e;">type ReplaceStr&lt;</span></span>
<span class="line"><span style="color:#24292e;">  Str extends string,</span></span>
<span class="line"><span style="color:#24292e;">  From extends string,</span></span>
<span class="line"><span style="color:#24292e;">  To extends string</span></span>
<span class="line"><span style="color:#24292e;">  &gt; = Str extends \`\${infer Prefix}\${From}\${infer Suffix}\`</span></span>
<span class="line"><span style="color:#24292e;">  ? \`\${Prefix}\${To}\${Suffix}\` : Str;</span></span>
<span class="line"><span style="color:#24292e;">// ReverseStr</span></span>
<span class="line"><span style="color:#24292e;">type ReverseStr&lt;</span></span>
<span class="line"><span style="color:#24292e;">    Str extends string, </span></span>
<span class="line"><span style="color:#24292e;">    Result extends string = &#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;">&gt; = Str extends \`\${infer First}\${infer Rest}\` </span></span>
<span class="line"><span style="color:#24292e;">    ? ReverseStr&lt;Rest, \`\${First}\${Result}\`&gt; </span></span>
<span class="line"><span style="color:#24292e;">    : Result;</span></span></code></pre></div>`,57),t=[p];function o(c,r,i,y,d,g){return n(),e("div",null,t)}const b=s(l,[["render",o]]);export{h as __pageData,b as default};
