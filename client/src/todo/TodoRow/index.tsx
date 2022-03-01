import { formatDate } from "../../utilities/DateUtil";
import { Task } from "../TodoAPI";
import ButtonGroup from "./ButtonGroup";

interface ITodo {
  task: Task;
  date: boolean;
}
export default function TodoRow({ task, date }: ITodo): JSX.Element {
  const parentClasses = [
    "w-full",
    "py-3",
    "px-4",
    "sm:px-4",
    "md:px-6",
    "lg:px-8",
    "rounded-xl",
    "group",
    "relative",
    "drop-shadow-xl",
    "shadow-inner",
    "flex",
    "flex-row",
    "select-none",
  ];
  const activeClasses = ["bg-cyan-50", "hover:bg-slate-200"];
  const completedClasses = ["bg-emerald-300", "hover:bg-emerald-400"];
  const parentClass = task.completed
    ? completedClasses.concat(parentClasses).join(" ")
    : activeClasses.concat(parentClasses).join(" ");
  const formattedDueDate =
    task.dueDate !== undefined && date
      ? formatDate(new Date(task.dueDate), {
          weekday: "short",
          day: "numeric",
          month: "short",
        })
      : "";
  return (
    <div className={parentClass}>
      <p className="font-sans font-medium">{task.name}</p>
      <p className="ml-auto hidden self-center font-sans text-sm text-slate-800 md:inline-block">
        {formattedDueDate}
      </p>
      <ButtonGroup _id={task._id} completed={task.completed}></ButtonGroup>
    </div>
  );
}
