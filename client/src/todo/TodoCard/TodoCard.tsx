import { Task } from "../TodoAPI";
import { formatDate } from "../../utilities/DateUtil";
import { isUndefined } from "util";
import ToolTip from "../../components/ToolTip";
import React from "react";

interface ITodoCard {
  todo: Task;
  group: "planned" | "urgent" | "completed";
  classNames?: string;
}

const themes = {
  planned: "bg-cyan-50 hover:bg-cyan-100",
  urgent: "bg-amber-100 hover:bg-amber-200",
  completed: "bg-emerald-100 hover:bg-emerald-200",
};

// NOTE: Intended for use in a grid
export default function TodoCard({ todo, group, classNames }: ITodoCard) {
  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("_id", todo._id);
  };
  return (
    <div
      draggable="true"
      onDragStart={dragStart}
      onDragEnd={(e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
      }}
      className={`relative flex h-16 w-full flex-col justify-between overflow-clip rounded-lg p-2 duration-75 lg:h-32 lg:px-4 lg:py-6 ${themes[group]}`}>
      <span className="max-w-24 group font-sans text-sm font-semibold text-slate-900 lg:max-w-32ch xl:text-lg">
        <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap">{todo.name}</h1>
        {todo.name.length > 24 ? (
          <div className="no-scrollbar absolute top-0 right-0 left-0 bottom-0 origin-top scale-0 overflow-y-scroll whitespace-pre-wrap bg-zinc-100 px-6 py-4 font-sans text-base font-medium text-slate-700 duration-100 group-hover:scale-100">
            {todo.name}
          </div>
        ) : (
          <></>
        )}
      </span>
      <span className="font-sans text-sm text-slate-600 lg:text-base">
        {group === "completed" || todo.dueDate === undefined || todo.dueDate === null
          ? ""
          : formatDate(new Date(Date.parse(todo.dueDate)), {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
      </span>
    </div>
  );
}

export function SkeletonTodoCard({
  group,
}: {
  group: "planned" | "urgent" | "completed";
}): JSX.Element {
  return (
    <div
      className={`relative flex h-16 w-full flex-col justify-between overflow-clip rounded-lg p-2 duration-75 lg:h-32 lg:px-4 lg:py-6 ${themes[group]}`}></div>
  );
}