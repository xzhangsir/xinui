import {spawn} from "child_process"
import {projectRoot} from "./paths"
export const withTashName = <T>(name:string,fn:T)=> Object.assign(fn,{displayName:name}) 

// 在node中使用子进程来运行脚本
export const run  = async (command:string)=>{
  return new Promise((resolve)=>{
    const [cmd,...args]  = command.split(" ")
    const app = spawn(cmd,args,{
      cwd:projectRoot,
      stdio:'inherit', // 直接讲这个子进程的输出共享给父进程
      shell:true //默认情况下 linux 才支持 rm -rf 。 安装了git bash
    })
    app.on("close",resolve)
  })
}