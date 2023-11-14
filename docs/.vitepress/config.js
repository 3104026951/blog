export default {
    title: '打工是不可能打工',
    description: '个人博客', // 博客的介绍
    base: '/blog/', // 如果想用 https://mlyz.wdy.github.io/blog/ 访问，那么这句话必填
    themeConfig: {
        logo:'',
        nav: [
            // { text: "vue", link: "/articles/vue/上传素材到COS" },
            // { text: "uniapp", link: "/articles/uniapp/一键登录" },
            {
                text: '其他',
                items: [ // 可以配置成下拉
                    { text: 'js', link: '/articles/js/js' },
                    // { text: '', link: '/articles/libs/VForm3低代码初体验' },
                    { text: '其他', link: '/articles/other/代码' },
                ]
            }
        ],
        sidebar: { // 侧边栏，可以分组
            "/articles/js/": [
                {
                    text: "基础",
                    items: [
                        {
                            text: "js",
                            link: "/articles/js/js",
                        },
                        {
                            text: "typescript",
                            link: "/articles/js/typescript",
                        },
                    ],
                   
                },
                {
                    text: "代码段",
                    items: [
                    ],
                },
            ],
            "/articles/other/": [
                {
                    text: "",
                    items: [
                        {
                            text: "代码",
                            link: "/articles/other/代码",
                        }
                    ],
                },
                // {
                //     text: "代码段",
                //     items: [
                       
                //     ],
                // },
            ],
        },
        socialLinks: [{ icon: "github", link: "https://github.com/3104026951" }], // 可以连接到 github
    },
}