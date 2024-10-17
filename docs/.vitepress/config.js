export default {
    title: '打工是不可能打工',
    description: '个人博客', // 博客的介绍
    base: '/blog/',
    themeConfig: {
        logo: '',
        nav: [
            {
                text: 'oi',
                items: [ // 可以配置成下拉
                    { text: 'js', link: '/articles/js/js' },
                    { text: '其他', link: '/articles/other/代码' },
                ]
            }
        ],
        // sidebar: { // 侧边栏，可以分组
        //     "/articles/js/": [
        //         {
        //             text: "基础",
        //             items: [
        //                 {
        //                     text: "js",
        //                     link: "/articles/js/js",
        //                 },
        //                 {
        //                     text: "typescript",
        //                     link: "/articles/js/typescript",
        //                 },
        //             ],

        //         },
        //         {
        //             text: "代码段",
        //             items: [
        //             ],
        //         },
        //     ],
        //     "/articles/other/": [
        //         {
        //             text: "",
        //             items: [
        //                 {
        //                     text: "代码",
        //                     link: "/articles/other/代码",
        //                 }
        //             ],
        //         },
        //     ],
        // },
        sidebar: [
            {
                text: '基础',
                items: [
                    { text: 'js', link: '/articles/js/js' },
                    { text: 'typescript', link: '/articles/js/typescript' },
                ]
            },
            {
                text: '代码段',
                items: [
                    { text: '代码', link: '/articles/other/代码' },
                ]
            }
        ],
        socialLinks: [{ icon: "github", link: "https://github.com/3104026951" }], // 可以连接到 github
        footer: {
            // message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present 3104026951'
        }
    },
}
