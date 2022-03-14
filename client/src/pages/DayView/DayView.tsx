import { useContext, useEffect, useState } from "react";
import TodoRow from "../../components/TodoRow";
import CreateTodoCard from "../components/CreateTodoCard";
import TodoDictContext from "../../common/contexts/TodoDictContext";
import { TODO_DICT_ASYNC_ACTIONS } from "../../common/reducers/todoDictReducer";
import { TokenContext } from "../../common/contexts/TokenContext";

export default function DayView(): JSX.Element {
  const [completedTodos, setCompletedTodos] = useState<Array<JSX.Element>>([]);
  const [activeTodos, setActiveTodos] = useState<Array<JSX.Element>>([]);
  const { todoDict, dispatchTodoDict } = useContext(TodoDictContext);
  const { token } = useContext(TokenContext);

  const reloadComponentLists = (): void => {
    setCompletedTodos([]);
    setActiveTodos([]);
    let activeTodoComponents: Array<JSX.Element> = [];
    let completedTodoComponents: Array<JSX.Element> = [];
    for (const [_id, todo] of Object.entries(todoDict)) {
      if (todo.completed) {
        completedTodoComponents.push(<TodoRow key={todo._id} task={todo} date={false} />);
      } else {
        activeTodoComponents.push(<TodoRow key={todo._id} task={todo} date={false} />);
      }
    }
    setCompletedTodos(completedTodoComponents);
    setActiveTodos(activeTodoComponents);
  };
  useEffect(() => {
    if (token === "") {
      return;
    }
    dispatchTodoDict({
      type: TODO_DICT_ASYNC_ACTIONS.FETCH_ALL_TASKS,
      payload: { token: token },
    }).then(() => {});
  }, [token]);
  useEffect(() => {
    reloadComponentLists();
  }, [todoDict]);

  return (
    <div className="flex grow flex-col pb-8 lg:mt-8 lg:pb-16">
      <div className="flex flex-row justify-center">
        <div className="flex grow-0 basis-full flex-col items-stretch justify-start gap-3 px-4 sm:basis-5/6 md:basis-1/2 lg:px-8 xl:basis-1/3">
          <CreateTodoCard defaultDueDate={new Date(Date.now()).toISOString()}></CreateTodoCard>
          <div className="flex flex-col gap-3">{activeTodos}</div>
          <div className="flex flex-col gap-3">{completedTodos}</div>
        </div>
      </div>
    </div>
  );
}
