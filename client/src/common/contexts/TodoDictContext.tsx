import React from "react";
import { Todo } from "../types";

interface ITodoListContext {
  todoDict: Record<string, Todo>;
  dispatchTodoDict: (action: any) => Promise<void>;
}

// TodoListContext should be used in conjuction with useReducer
export default React.createContext<ITodoListContext>({
  todoDict: {},
  dispatchTodoDict: async (_action) => {
    return;
  },
});
