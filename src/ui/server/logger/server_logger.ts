import { baseLoggerUtil } from "@server/core/logger/appname_logger"

export const serverLogger = baseLoggerUtil.child(`SERVER`, {
  logFilePrefix: `api`,
}).log
