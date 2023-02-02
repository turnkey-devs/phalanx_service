import { NotificationDriverSetting } from "./models/notification_driver_setting"
import { SendMessageRequest } from "./models/send_message_request"

export interface NotificationDriverPort {
  driver_type: string;
	
  connect(setting: NotificationDriverSetting): Promise<void>;
  send(request: SendMessageRequest): Promise<unknown>;
}
