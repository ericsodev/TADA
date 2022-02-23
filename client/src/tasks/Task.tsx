import React from "react";
type Priority = "planned" | "sidequest" | "urgent";

export interface Task {
  _id: String;
  name: string;
  createdDate: Date;
  dueDate?: Date;
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
