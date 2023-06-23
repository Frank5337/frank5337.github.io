import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Franklin 's World",
    titleTemplate: 'Custom Suffix',
    description: "难寻少年时, 总有少年来",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config

        //顶部导航栏
        nav: [
            // { text: 'Home', link: '/' },
            {text: '病痛', link: '/disease/'},
            {text: '美剧', link: '/series/series'},
            {text: '面试', link: '/interview/interview'},
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
                        text: 'Disease',
                        items: [
                            {text: 'Disease 2022-12-20 是新冠', link: '/disease/2022-12-22-disease'},
                        ]
                    }
                ],


            },
        //https://vitepress.dev/reference/default-theme-config#sociallinks
        socialLinks: [
            // {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
            {icon: 'github', link: 'https://github.com/Frank5337'}
        ]

    }
})
