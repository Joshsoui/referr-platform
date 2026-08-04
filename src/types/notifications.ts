export type NotificationKind =
  | "submitted"
  | "viewed"
  | "progress"
  | "nearby"
  | "celebration"
  | "reward"
  | "rejected";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  message: string;
  link?: string;
  readAt?: string | null;
  createdAt?: string;
}
