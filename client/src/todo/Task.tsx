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

export async function getTasks(): Promise<Array<Task>> {
  try {
    const data: Array<Task> = await (
      await fetch("http://localhost:5000/api/todo")
    ).json();
    return data;
  } catch (err) {
    console.log("Error fetching tasks");
    console.log(err);
    return [];
  }
}

interface IUpdateTask {
  _id: string;
  name?: string;
  createdDate?: string;
  dueDate?: string;
  priority?: Priority;
  completed?: boolean;
}
export async function updateTask(update: IUpdateTask) {
  console.log(JSON.stringify(update));
  try {
    await fetch(`http://localhost:5000/api/todo/${update._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTask(id: string) {
  console.log("DELETE");
  try {
    await fetch(`http://localhost:5000/api/todo/${id}`, {
      method: "DELETE",
    });
    console.log("Deleted");
  } catch (err) {
    console.log(err);
  }
}

interface ICreateTask {
  name: string;
  dueDate?: string;
  priority: Priority;
}
export async function createTask({ name, dueDate, priority }: ICreateTask) {
  const task = {
    name: name,
    dueDate: dueDate,
    createdDate: new Date(Date.now()).toISOString(),
    priority: priority,
    completed: false,
  };
  console.table(task);
  try {
    await fetch("http://localhost:5000/api/todo", {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
  }
}
