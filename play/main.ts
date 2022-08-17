import {createApp} from "vue"
import App from "./app.vue"
// import XIcon  from "@xin/components/icon"
import {XIcon}  from "@xin/components/icon"
import '@xin/theme-chalk/src/index.scss'

const app = createApp(App)
app.use(XIcon)

app.mount("#app")
