export default {
    title: '打工是不可能的，这辈子都不可能打工的',
    description: '个人博客', // 博客的介绍
    base: '/blog/',
    themeConfig: {
        siteTitle:"☘️",
        logo: '',
        nav: [
            {
                text: '首页',
                link: '/'
            },
            {
                text: '菜单',
                items: [ // 可以配置成下拉
                    { text: '基础', link: '/articles/js/js' },
                    { text: 'vue', link: '/articles/vue/vue' },
                    { text: 'node', link: '/articles/nodejs/basic' },
                ]
            },
            {
                text: '小游戏',
                link: 'https://3104026951.github.io/index'
            },
           
        ],
        sidebar: [
            {
                text: '基础',
                // collapsed: true,
                items: [
                    { text: 'js', link: '/articles/js/js' },
                    { text: 'es', link: '/articles/js/es' },
                    { text: 'typescript', link: '/articles/js/typescript' },
                    { text: 'react', link: '/articles/js/react'}
                ]
            },
            {
                text: 'vue相关',
                items: [
                    { text: 'vue基础', link: '/articles/vue/vue' },
                    { text: '组合式函数-hook', link: '/articles/vue/hooks' },
                    { text: 'vue组件', link: '/articles/vue/componentList' },
                    { text: '自定义指令', link: '/articles/vue/directive' },  
                ]
            },
            {
                text: 'nodejs',
                items: [
                    { text: 'node基础', link: '/articles/nodejs/basic' },
                    { text: 'express', link: '/articles/nodejs/express' },
                    { text:  'typeorm', link: '/articles/nodejs/typeorm' },
                ]
            },
            {
                text: '设计模式',
                items:[
                    { text: '单例模式', link: '/articles/design/single' },
                    { text: '适配器模式', link: '/articles/design/adapter'},
                    { text: '观察者模式', link: '/articles/design/observer' },
                    { text: '发布订阅模式', link: '/articles/design/subscribe' },
                ]
            },
            {
                text: '其他',
                items: [
                    { text: '工具函数', link: '/articles/other/fuctions' },
                    { text: '性能优化', link: '/articles/other/optimize' },
                    { text: '函数式编程', link: '/articles/other/functional' },
                ]
            },
        ],
        socialLinks: [{ icon: "github", link: "https://github.com/3104026951" }], // 可以连接到 github
    },
}
