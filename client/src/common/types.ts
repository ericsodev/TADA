export type Priority = "planned" | "sidequest" | "urgent";
export interface Todo {
  _id: string;
  name: string;
  userId: string;
  createdDate: string;
  dueDate?: string;
  priority: Priority;
  completed: boolean;
}

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
}
