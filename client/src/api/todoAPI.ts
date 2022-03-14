import React from "react";
import { Todo, Priority } from "../common/types";

interface ITaskListContext {
  todoList: Array<Todo>;
  setTasks: (_update: any) => void;
}

export const TaskContext = React.createContext<ITaskListContext>({
  todoList: [],
  setTasks: (_update) => {},
});

export async function getTasks(token: string): Promise<Array<Todo>> {
  try {
    console.log(token);
    const data: Array<Todo> = await (
      await fetch("http://localhost:5000/api/todo", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
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
  userId: string;
  name?: string;
  createdDate?: string;
  dueDate?: string;
  priority?: Priority;
  completed?: boolean;
}

export async function updateTask(update: IUpdateTask, token: string): Promise<Todo | null> {
  try {
    const updatedTask: Todo = await (
      await fetch(`http://localhost:5000/api/todo/${update._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
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

export async function deleteTask(todoId: string, token: string): Promise<Todo | null> {
  try {
    const deletedTask: Todo = await (
      await fetch(`http://localhost:5000/api/todo/${todoId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
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
export async function createTask(
  { name, dueDate, priority }: ICreateTask,
  token: string
): Promise<Todo | null> {
  const task = {
    name: name,
    dueDate: dueDate,
    createdDate: new Date(Date.now()).toISOString(),
    priority: priority,
    completed: false,
  };
  try {
    const res = await fetch("http://localhost:5000/api/todo", {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
    });
    const newTask = await res.json();
    return newTask;
  } catch (err) {
    console.log(err);
    return null;
  }
}
