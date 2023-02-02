export interface SendMessageRequest {
  content: string;
  to?: {
    id: string | number;
    name?: string;
    username?: string;
  };
}
