import React from "react";
type Priority = "planned" | "sidequest" | "urgent";

export interface Task {
  _id: string;
  name: string;
  createdDate: string;
  dueDate?: string;
  priority: Priority;
  completed: boolean;
}

interface ITaskListContext {
  tasks: Array<Task>;
  setTasks: (_update: any) => void;
}

export const TaskContext = React.createContext<ITaskListContext>({
  tasks: [],
  setTasks: (_update) => {},
});
