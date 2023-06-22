import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "My Awsome Project",
    description: "A VitePress Site",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config

        //顶部导航栏
        nav: [
            // { text: 'Home', link: '/' },
            {text: 'Disease', link: '/disease'},
            {text: 'Series', link: '/series/series'},
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
