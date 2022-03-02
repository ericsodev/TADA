import React from "react";
import { Task } from "../todo/TodoAPI";

interface ITodoListContext {
  todoDict: Record<string, Task>;
  dispatchTodoDict: (action: any) => Promise<void>;
}

// TodoListContext should be used in conjuction with useReducer
export default React.createContext<ITodoListContext>({
  todoDict: {},
  dispatchTodoDict: async (_action) => {
    return;
  },
});
