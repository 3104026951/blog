export default {
    title: '打工是不可能打工',
    description: '个人博客', // 博客的介绍
    base: '/blog/',
    themeConfig: {
        logo: '',
        nav: [
            {
                text: '首页',
                link: '/'
            },
            {
                text: 'oi',
                items: [ // 可以配置成下拉
                    { text: 'js', link: '/articles/js/js' },
                    { text: '代码段', link: '/articles/other/fuctions' },
                ]
            }
        ],
        sidebar: [
            {
                text: '基础',
                // collapsed: true,
                items: [
                    { text: 'js', link: '/articles/js/js' },
                    { text: 'typescript', link: '/articles/js/typescript' },
                ]
            },
            {
                text: '代码段',
                items: [
                    { text: '工具函数', link: '/articles/other/fuctions' },
                ]
            },
            {
                text: 'vue相关',
                items: [
                    { text: '组合式函数-hook', link: '/articles/vue/hooks' },
                    { text: 'vue组件', link: '/articles/vue/componentList' },
                    { text: '自定义指令', link: '/articles/vue/directive' },
                ]
            }
        ],
        socialLinks: [{ icon: "github", link: "https://github.com/3104026951" }], // 可以连接到 github
    },
}
