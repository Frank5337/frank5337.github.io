import {defineConfig} from 'vitepress'

// https://vitepress.dev

const sidebarInterview = () => [
    // { text: '其他职业', link: '/career/others' },
    // {
    //     text: '证书', collapsed: false, items: [
    //         { text: '软考高级系统架构', link: '/career/certificate/ruankao-high-lv' },
    //         { text: '教师资格证', link: '/career/certificate/ntce' },
    //         { text: '公务员区别', link: '/career/certificate/gwy-diff' },
    //     ]
    // }
    { text: 'Java', link: '/interview/java'},
    { text: 'Mysql', link: '/interview/mysql'},
    { text: 'Redis', link: '/interview/redis'},
    { text: 'Spring', link: '/interview/spring'},
    { text: 'Message Queue', link: '/interview/mq'}
]

// @ts-ignore
export default defineConfig({
    title: "Franklin 's World",
    titleTemplate: 'Custom Suffix',
    description: "难寻少年时, 总有少年来",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config

        //顶部导航栏
        nav: [
            // { text: 'Home', link: '/' },
            {text: '病痛', link: '/disease/2022-12-22-disease'},
            {text: '美剧', link: '/series/series'},
            {text: '面试', link: '/interview/java'},
            // { text: 'Examples', link: '/markdown-examples' }
        ],

        //侧边栏
        sidebar:
            {
                '/disease/': [
                    // {
                    //     text: 'Examples',
                    //     items: [
                    //         { text: 'Markdown Examples', link: '/markdown-examples' },
                    //         { text: 'Runtime API Examples', link: '/api-examples' }
                    //     ]
                    // },
                    {
                        text: '病骨支离纱帽宽',
                        items: [
                            {text: '2022-12-20 是新冠', link: '/disease/2022-12-22-disease'},
                            {text: '2023-6-8 Twice🐏', link: '/disease/2023-6-8-disease'},
                        ]
                    }
                ],
                '/interview/' : sidebarInterview(),

            },

        //https://vitepress.dev/reference/default-theme-config#sociallinks
        //社交平台link
        socialLinks: [
            // {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
            {icon: 'github', link: 'https://github.com/Frank5337'}
        ],

        editLink: {
            pattern: 'https://github.com/Frank5337/frank5337.github.io/blob/master/docs/:path',
            text: '在 Github 编辑',
        },

        lastUpdatedText: '上次更新',

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },


        outline: {label: '本页内容'},

        // algolia: {
        //     appId: 'TMOT9B7BHV',
        //     apiKey: '8870d1a7427df92c33d2db21368d01d1',
        //     indexName: 'augusmeowio',
        //     placeholder: '搜索',
        //     translations: {
        //         button: {
        //             buttonText: '搜索',
        //             buttonAriaLabel: '搜索'
        //         },
        //         modal: {
        //             searchBox: {
        //                 resetButtonTitle: '清除查询条件',
        //                 resetButtonAriaLabel: '清除查询条件',
        //                 cancelButtonText: '取消',
        //                 cancelButtonAriaLabel: '取消'
        //             },
        //             startScreen: {
        //                 recentSearchesTitle: '搜索历史',
        //                 noRecentSearchesText: '没有搜索历史',
        //                 saveRecentSearchButtonTitle: '保存至搜索历史',
        //                 removeRecentSearchButtonTitle: '从搜索历史中移除',
        //                 favoriteSearchesTitle: '收藏',
        //                 removeFavoriteSearchButtonTitle: '从收藏中移除'
        //             },
        //             errorScreen: {
        //                 titleText: '无法获取结果',
        //                 helpText: '你可能需要检查你的网络连接'
        //             },
        //             footer: {
        //                 selectText: '选择',
        //                 navigateText: '切换',
        //                 closeText: '关闭',
        //                 searchByText: '搜索提供者'
        //             },
        //             noResultsScreen: {
        //                 noResultsText: '无法找到相关结果',
        //                 suggestedQueryText: '你可以尝试查询',
        //                 reportMissingResultsText: '你认为该查询应该有结果？',
        //                 reportMissingResultsLinkText: '点击反馈'
        //             }
        //         }
        //     }
        // }
    // },

    }
})

//todo
export const sidebar = {
    '/interview' : sidebarInterview(),
}