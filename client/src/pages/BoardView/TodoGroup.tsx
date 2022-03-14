import React, { useContext, useState } from "react";
import { reduceEachTrailingCommentRange } from "typescript";
import { TODO_DICT_ASYNC_ACTIONS as DICT_ACTIONS } from "../../common/reducers/todoDictReducer";
import TodoDictContext from "../../common/contexts/TodoDictContext";
import { Todo } from "../../common/types";
import TodoCard, { SkeletonTodoCard } from "../../components/TodoCard";
import { TokenContext } from "../../common/contexts/TokenContext";

interface ITodoGroup {
  todos: Array<Todo>;
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
  const [showSkeleton, setShowSkeleton] = useState<boolean>(false);
  const { token } = useContext(TokenContext);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (token === "") {
      return;
    }
    const _id: string = e.dataTransfer.getData("_id");
    const completed = todoDict[_id].completed;
    setShowSkeleton(false);
    if (title === "completed") {
      if (completed) return;
      dispatchTodoDict({
        type: DICT_ACTIONS.UPDATE_TASK,
        payload: { update: { _id: _id, completed: true }, token: token },
      });
    } else if (title === "planned" || title === "urgent") {
      if (completed) {
        dispatchTodoDict({
          type: DICT_ACTIONS.UPDATE_TASK,
          payload: { update: { _id: _id, completed: false, priority: title }, token: token },
        });
      } else {
        dispatchTodoDict({
          type: DICT_ACTIONS.UPDATE_TASK,
          payload: { update: { _id: _id, priority: title }, token: token },
        });
      }
    }
  };
  const onDragEnter = () => {
    setShowSkeleton(true);
    console.log("entered");
  };
  const onDragExit = () => {
    setShowSkeleton(false);
  };
  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={onDragEnter}
      onDragExit={onDragExit}
      className={`flex grow basis-1/3 flex-col gap-y-6 lg:gap-y-8 ${className}`}>
      <h1 className={`font-sans text-2xl font-medium ${titleColors[title]} md:text-4xl`}>
        {title.toLowerCase()}
      </h1>
      <div className="grid-row-flow grid grow grid-cols-1 content-start gap-3 lg:grid-cols-2 lg:gap-5">
        {todos.map((todo) => {
          return <TodoCard todo={todo} group={title}></TodoCard>;
        })}
        {showSkeleton ? <SkeletonTodoCard group={title}></SkeletonTodoCard> : <></>}
      </div>
    </div>
  );
}
