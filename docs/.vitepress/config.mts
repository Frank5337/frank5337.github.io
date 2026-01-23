// @ts-ignore
import { defineConfig } from 'vitepress'

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
    { text: 'Java', link: '/interview/java' },
    { text: 'Mysql', link: '/interview/mysql' },
    { text: 'Redis', link: '/interview/redis' },
    { text: 'Spring', link: '/interview/spring' },
    { text: 'Message Queue', link: '/interview/mq' },
    { text: 'System Design', link: '/interview/systemdesign' },
    {
        text: 'Anti',
        collapsed: false,
        items: [
            { text: '总览', link: '/interview/anti/' },
            { text: 'JVM内存结构与调优', link: '/interview/anti/01_jvm_memory' },
            { text: 'synchronized vs ReentrantLock', link: '/interview/anti/02_synchronized_vs_lock' },
            { text: 'ThreadLocal 原理与内存泄漏', link: '/interview/anti/03_threadlocal' },
        ]
    }
]

const sidebarWindows = () => [
    { text: 'Excel公式速成指南', link: '/windows/excel/Excel公式速成指南' },
    { text: '10分钟学会数据透视表', link: '/windows/excel/10分钟学会数据透视表，让Excel自动帮你分析数据' },
    { text: 'Excel快捷键大全.md', link: '/windows/excel/Excel快捷键大全' },
]

// @ts-ignore
// @ts-ignore
export default defineConfig({
    title: "Franklin's World",
    // titleTemplate: 'Custom Suffix',
    description: "难寻少年时, 总有少年来",
    lastUpdated: true,

    // https://vitepress.dev/reference/default-theme-config
    head: [
        [
            'script',
            { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-9NWDZBRC0T' }
        ],
        [
            'script',
            {},
            "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-9NWDZBRC0T');"
        ]
    ],

    themeConfig: {
        //顶部导航栏
        nav: [
            // { text: 'Home', link: '/' },
            // {text: '病痛', link: '/disease/2022-12-22'},
            { text: '美剧', link: '/series/series' },
            { text: '面试', link: '/interview/java' },
            { text: 'Windows', link: '/windows/excel/Excel公式速成指南' },
            // {text: '自行车', link: '/soccer/'},
            // {text: '徒步', link: '/soccer/'},
            // {text: '羽毛球', link: '/soccer/'},
            // {text: '汽车', link: '/soccer/'},
            // {text: '专题', link: '/subject/'},
            // {text: '装修', link: '/fitment/'},
            // {text: '毒鸡汤', link: '/pcs/'},
            // { text: 'Examples', link: '/markdown-examples' }
        ],

        //侧边栏
        sidebar:
        // [
        {
            // '/disease/': [
            //     // {
            //     //     text: 'Examples',
            //     //     items: [
            //     //         { text: 'Markdown Examples', link: '/markdown-examples' },
            //     //         { text: 'Runtime API Examples', link: '/api-examples' }
            //     //     ]
            //     // },
            //     {
            //         text: '病骨支离纱帽宽',
            //         items: [
            //             {text: '2022-12-20 是新冠', link: '/disease/2022-12-22'},
            //             {text: '2023-6-8 Twice🐏', link: '/disease/2023-6-8'},
            //             {text: '2023-9-16 近一年+腹胀', link: '/disease/2023-9-16'},
            //             {text: '2023-10-5 肠镜😅', link: '/disease/2023-10-5'},
            //             {text: '2023-10-10 肌腱炎', link: '/disease/2023-10-10'},
            //             {text: '2024-5-12 全腹CT', link: '/disease/2024-5-12'},
            //             {text: '2024-5-29 增强CT', link: '/disease/2024-5-29'},
            //         ]
            //     }
            // ],
            '/interview/': sidebarInterview(),
            '/windows/': sidebarWindows(),

        },
        // {
        //
        //     '/windows/': sidebarWindows(),
        //
        //
        // }],

        //https://vitepress.dev/reference/default-theme-config#sociallinks
        //社交平台link
        socialLinks: [
            // {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
            { icon: 'github', link: 'https://github.com/Frank5337' }
        ],

        editLink: {
            pattern: 'https://github.com/Frank5337/frank5337.github.io/blob/master/docs/:path',
            text: '在 Github 编辑',
        },

        footer: {
            message: '努力工作 享受生活',
            copyright: 'Copyright © 2022-present Franklin'
        },

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        lastUpdated: { text: '上次更新' },

        outline: { label: '本页内容' },

        search: {
            provider: 'algolia',
            options: {
                appId: 'QRRJFWKYC6',
                apiKey: '738cba2eb19ec7aacce4ddf34f2b44a1',
                indexName: 'frank5337io',
                placeholder: '搜索',
                translations: {
                    button: {
                        buttonText: '搜索',
                        buttonAriaLabel: '搜索'
                    },
                    modal: {
                        searchBox: {
                            resetButtonTitle: '清除查询条件',
                            resetButtonAriaLabel: '清除查询条件',
                            cancelButtonText: '取消',
                            cancelButtonAriaLabel: '取消'
                        },
                        startScreen: {
                            recentSearchesTitle: '搜索历史',
                            noRecentSearchesText: '没有搜索历史',
                            saveRecentSearchButtonTitle: '保存至搜索历史',
                            removeRecentSearchButtonTitle: '从搜索历史中移除',
                            favoriteSearchesTitle: '收藏',
                            removeFavoriteSearchButtonTitle: '从收藏中移除'
                        },
                        errorScreen: {
                            titleText: '无法获取结果',
                            helpText: '你可能需要检查你的网络连接'
                        },
                        footer: {
                            selectText: '选择',
                            navigateText: '切换',
                            closeText: '关闭',
                            searchByText: '搜索提供者'
                        },
                        noResultsScreen: {
                            noResultsText: '无法找到相关结果',
                            suggestedQueryText: '你可以尝试查询',
                            reportMissingResultsText: '你认为该查询应该有结果？',
                            reportMissingResultsLinkText: '点击反馈'
                        }
                    }
                }
            }
        },
        optimizeDeps: {
            include: ['my-global-script-plugin']
        }
    }
})

//todo
export const sidebar = {
    '/interview': sidebarInterview(),
    '/windows': sidebarWindows(),
}
