import React from "react";
export type Priority = "planned" | "sidequest" | "urgent";

export interface Task {
  _id: string;
  name: string;
  createdDate: string;
  dueDate?: string;
  priority: Priority;
  completed: boolean;
}

interface ITaskListContext {
  todoList: Array<Task>;
  setTasks: (_update: any) => void;
}

export const TaskContext = React.createContext<ITaskListContext>({
  todoList: [],
  setTasks: (_update) => {},
});

export async function getTasks(): Promise<Array<Task>> {
  try {
    const data: Array<Task> = await (await fetch("http://localhost:5000/api/todo")).json();
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

export async function updateTask(update: IUpdateTask): Promise<Task | null> {
  try {
    const updatedTask: Task = await (
      await fetch(`http://localhost:5000/api/todo/${update._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      })
    ).json();
    console.log(updatedTask);
    return updatedTask;
  } catch (err) {
    console.log("Error connecting to server to update a Todo");
    console.log(err);
    return null;
  }
}

export async function deleteTask(id: string): Promise<Task | null> {
  try {
    const deletedTask: Task = await (
      await fetch(`http://localhost:5000/api/todo/${id}`, {
        method: "DELETE",
      })
    ).json();
    return deletedTask;
  } catch (err) {
    console.log(err);
    return null;
  }
}

interface ICreateTask {
  name: string;
  dueDate?: string;
  priority: Priority;
}
export async function createTask({ name, dueDate, priority }: ICreateTask): Promise<Task | null> {
  const task = {
    name: name,
    dueDate: dueDate ? dueDate : "",
    createdDate: new Date(Date.now()).toISOString(),
    priority: priority,
    completed: false,
  };
  try {
    const res = await fetch("http://localhost:5000/api/todo", {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });
    const newTask = await res.json();
    return newTask;
  } catch (err) {
    console.log(err);
    return null;
  }
}
