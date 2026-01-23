// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import PasswordProtect from '../components/PasswordProtect.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // 注册全局组件
        app.component('PasswordProtect', PasswordProtect)
    }
}
