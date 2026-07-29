export type NotificationKind =
  | "submitted"
  | "viewed"
  | "progress"
  | "celebration"
  | "reward"
  | "rejected";

export interface AppNotification {
  id: number;
  kind: NotificationKind;
  title: string;
  message: string;
}
