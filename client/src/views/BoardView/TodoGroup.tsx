import React, { useContext } from "react";
import { TODO_DICT_ASYNC_ACTIONS as DICT_ACTIONS } from "../../reducers/todoDictReducer";
import TodoDictContext from "../../store/TodoDictContext";
import { Task } from "../../todo/TodoAPI";
import TodoCard from "../../todo/TodoCard";

interface ITodoGroup {
  todos: Array<Task>;
  title: "planned" | "urgent" | "completed";
  className?: string;
}

const titleColors = {
  planned: "text-cyan-100",
  urgent: "text-amber-50",
  completed: "text-emerald-50",
};

export default function TodoGroup({ todos, title, className }: ITodoGroup): JSX.Element {
  const { todoDict, dispatchTodoDict } = useContext(TodoDictContext);
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const _id: string = e.dataTransfer.getData("_id");
    const completed = todoDict[_id].completed;
    if (title === "completed") {
      dispatchTodoDict({
        type: DICT_ACTIONS.UPDATE_TASK,
        payload: { update: { _id: _id, completed: true } },
      });
    } else if (title === "planned" || title === "urgent") {
      if (completed) {
        dispatchTodoDict({
          type: DICT_ACTIONS.UPDATE_TASK,
          payload: { update: { _id: _id, completed: false, priority: title } },
        });
      } else {
        dispatchTodoDict({
          type: DICT_ACTIONS.UPDATE_TASK,
          payload: { update: { _id: _id, priority: title } },
        });
      }
    }
  };
  // TODO: Implement dropped preview
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {};
  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={onDragEnter}
      className={`flex grow basis-1/3 flex-col gap-y-6 lg:gap-y-8 ${className}`}>
      <h1 className={`font-sans text-2xl font-medium ${titleColors[title]} md:text-4xl`}>
        {title.toLowerCase()}
      </h1>
      <div className="grid-row-flow grid grow grid-cols-1 content-start gap-3 lg:grid-cols-2 lg:gap-5">
        {todos.map((todo) => {
          return <TodoCard todo={todo} group={title}></TodoCard>;
        })}
      </div>
    </div>
  );
}
