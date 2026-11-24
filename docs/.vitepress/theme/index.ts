import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DownloadTable from './components/DownloadTable.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DownloadTable', DownloadTable)
  },
} satisfies Theme
