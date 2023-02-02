
// ALWAYS RUN ENV LOADER BEFORE IMPORT ANYTHING
import 'reflect-metadata'
import { EnvLoader as EnvironmentLoader } from "./core/config/env_loader"

const env = EnvironmentLoader()

import { ApiApp } from "@server/ui/server/api_application"
import { mainLogger } from "./core/logger/appname_logger"

const main = async () => {
  const apiApp = new ApiApp()
  await Promise.all([
    apiApp.startApp(),
  ])
}

main()
  .catch(
    async error => {
      console.error(`main:MainFatalErr`, error)
      mainLogger(`main:MainFatalErr`, { error }, `error`)
    },
  )

export default main
