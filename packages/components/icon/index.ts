import Icon from './src/icon.vue'
/* import type {App,Plugin} from "vue"

type SFCWithInstall<T> = T & Plugin
const withInstall = <T>(component:T)=>{
  (component as SFCWithInstall<T>).install = function(app:App){
   app.component((component as any).name,component)
  }
  return component as SFCWithInstall<T> 
}
 */
import { withInstall } from '@xin/utils/with-install'

const XIcon = withInstall(Icon)

export { XIcon }

export default XIcon
