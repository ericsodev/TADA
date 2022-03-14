import { useContext, useEffect, useState } from "react";
import TodoDictContext from "../../common/contexts/TodoDictContext";
import { TODO_DICT_ASYNC_ACTIONS as dispatchActions } from "../../common/reducers/todoDictReducer";
import TodoGroup from "./TodoGroup";
import { Todo } from "../../common/types";
import { TokenContext } from "../../common/contexts/TokenContext";

export default function BoardView(): JSX.Element {
  const { todoDict, dispatchTodoDict } = useContext(TodoDictContext);
  const [todoArrays, setTodoArrays] = useState<any>({ planned: [], urgent: [], completed: [] }); // TODO: Write interface for this
  const { token } = useContext(TokenContext);

  useEffect(() => {
    if (token === "") {
      return;
    }
    dispatchTodoDict({ type: dispatchActions.FETCH_ALL_TASKS, payload: { token: token } });
  }, [token]);
  useEffect(() => {
    let plannedArray: Array<Todo> = [];
    let urgentArray: Array<Todo> = [];
    let completedArray: Array<Todo> = [];
    for (const [_id, task] of Object.entries(todoDict)) {
      if (task.completed) {
        completedArray.push(task);
        continue;
      }
      if (task.priority == "urgent") {
        urgentArray.push(task);
        continue;
      }
      plannedArray.push(task);
    }
    setTodoArrays({
      planned: plannedArray,
      urgent: urgentArray,
      completed: completedArray,
    });
  }, [todoDict]);
  return (
    <div className="flex h-full w-full grow flex-row items-stretch gap-x-6 bg-opacity-5 px-6 py-3 lg:gap-x-10 lg:px-24 lg:py-5">
      <TodoGroup className="hidden md:flex" title="planned" todos={todoArrays.planned}></TodoGroup>
      <TodoGroup title="urgent" todos={todoArrays.urgent}></TodoGroup>
      <TodoGroup title="completed" todos={todoArrays.completed}></TodoGroup>
    </div>
  );
}
