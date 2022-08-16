import {createApp} from "vue"
import App from "./app.vue"
// import XIcon  from "@xin/components/icon"
import {XIcon}  from "@xin/components/icon"


const app = createApp(App)
app.use(XIcon)

app.mount("#app")
