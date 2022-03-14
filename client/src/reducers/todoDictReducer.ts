import React from "react";
import { Task, getTasks, updateTask, deleteTask, createTask } from "../todo/TodoAPI";

export const TODO_DICT_ASYNC_ACTIONS = {
  ADD_NEW_TASK: "add_new_task",
  DELETE_TASK: "del_new_task",
  UPDATE_TASK: "update_task",
  FETCH_ALL_TASKS: "fetch_all_tasks",
  FETCH_QUERY_TASKS: "fetch_query_tasks", // TODO: Implement this! (used for dayview)
};

export const TODO_REDUCER_ACTIONS = {
  ADD_NEW_TASK: "add_new_task",
  DELETE_TASK: "del_new_task",
  UPDATE_TASK: "update_task",
  SET_TASKS: "set_tasks",
};

export function todoReducer(state: Record<string, Task>, action: any): Record<string, Task> {
  let newState: Record<string, Task> = {};
  switch (action.type) {
    case TODO_REDUCER_ACTIONS.ADD_NEW_TASK:
      newState = { ...state }; // Shallow clone state so that ref is different and triggers state change
      newState[action.payload.task._id] = action.payload.task;
      return newState;
    case TODO_REDUCER_ACTIONS.DELETE_TASK:
      newState = { ...state }; // Shallow clone state so that ref is different and triggers state change
      delete newState[action.payload.id];
      return newState;
    case TODO_REDUCER_ACTIONS.UPDATE_TASK:
      newState = { ...state }; // Shallow clone state so that ref is different and triggers state change
      delete newState[action.payload.task._id];
      newState[action.payload.task._id] = action.payload.task; // Override existing task
      return newState;
    case TODO_REDUCER_ACTIONS.SET_TASKS:
      newState = { ...action.payload.tasks };
      return newState;
    default:
      return state;
  }
}
export function todoAsyncReducer(dispatch: React.Dispatch<any>): (action: any) => Promise<void> {
  return async (action: any): Promise<void> => {
    let newTodoDict: Record<string, Task> = {};
    let data: any;
    switch (action.type) {
      case TODO_DICT_ASYNC_ACTIONS.ADD_NEW_TASK:
        data = await createTask(action.payload.task);
        if (data !== null) {
          dispatch({ type: TODO_REDUCER_ACTIONS.ADD_NEW_TASK, payload: { task: data } });
        }
        return;
      case TODO_DICT_ASYNC_ACTIONS.DELETE_TASK:
        data = await deleteTask(action.payload._id);
        if (data?._id === action.payload._id) {
          dispatch({ type: TODO_REDUCER_ACTIONS.DELETE_TASK, payload: { id: data._id } });
        }
        return;
      case TODO_DICT_ASYNC_ACTIONS.UPDATE_TASK:
        data = await updateTask(action.payload.update);
        if (data !== null) {
          dispatch({ type: TODO_REDUCER_ACTIONS.UPDATE_TASK, payload: { task: data } });
        }
        return;

      case TODO_DICT_ASYNC_ACTIONS.FETCH_ALL_TASKS:
        newTodoDict = {};
        data = await getTasks();
        data.forEach((task: Task) => {
          newTodoDict[task._id] = task;
        });
        dispatch({ type: TODO_REDUCER_ACTIONS.SET_TASKS, payload: { tasks: newTodoDict } });
        return;
      default:
        return;
    }
  };
}
