import { mainLogger } from "@server/core/logger/appname_logger"
import type { RequestContext } from "@server/core/models/request_context"
import { BaseNotificationService } from "./base_notification_service"

export const AppNotificationService = async (_context: RequestContext) => {
  try {
    const client = await BaseNotificationService(_context)
    client.setPrependMessage((formatId, render) => `🔔Notification🔔`)
    client.setAppendMessage(() => `Env: ${ process.env.NODE_ENV } \n please check dashboard for more details.`)

    return client
  } catch (error) {
    mainLogger(`NotificationService:FatalErr`, { error }, `error`)
    throw error
  }
}
