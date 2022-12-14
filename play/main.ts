import { createApp } from 'vue'
import App from './app.vue'
import { XIcon } from '@xin/components/icon'
import { XNumberRoll } from '@xin/components/number-roll'
import '@xin/theme-chalk/src/index.scss'

const app = createApp(App)
app.use(XIcon)
app.use(XNumberRoll)

app.mount('#app')
