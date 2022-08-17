import {series,parallel} from "gulp"
import {run,withTashName} from "./utils"

export default series(
  withTashName("clean",async ()=> run('rm -rf ./dist')),
  withTashName("buildPackages",()=> run("pnpm run --filter=./packages/** --parallel --stream build"))
)