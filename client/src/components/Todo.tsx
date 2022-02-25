import { Icon } from "@iconify/react";
import { formatDate } from "../utilities/DateUtil";
import {
  Task,
  updateTask,
  deleteTask,
  TaskContext,
  getTasks,
} from "../models/Task";
import ToolTip from "./ToolTip";
import { useContext } from "react";

// TODO: Create an interface for these props
// TODO: FETCH single todo, not entire list
interface ITodo {
  task: Task;
  date: boolean;
}
export default function Todo({ task, date }: ITodo): JSX.Element {
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
  const { setTasks } = useContext(TaskContext);
  return (
    <div className={parentClass}>
      <p className="font-sans font-medium">{task.name}</p>
      <p className="self-center text-slate-800 text-sm font-sans hidden md:inline-block ml-auto">
        {formattedDueDate}
      </p>
      {!task.completed ? (
        <CompleteButton id={task._id} setTasks={setTasks}></CompleteButton>
      ) : (
        ""
      )}
      <DeleteButton
        completed={task.completed}
        id={task._id}
        setTasks={setTasks}
      ></DeleteButton>
    </div>
  );
}

interface ICompleteButton {
  id: string;
  setTasks: (update: Array<Task>) => void;
}
function CompleteButton({ id, setTasks }: ICompleteButton): JSX.Element {
  const onClick = async () => {
    await updateTask({ _id: id, completed: true });
    getTasks().then((res) => {
      setTasks(res);
    });
  };
  return (
    <div
      onClick={onClick}
      className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 md:right-auto md:left-full md:translate-x-4 scale-0 group-hover:scale-100 hover:scale-100 delay-100 duration-100 inline-block bg-lime-300 text-lime-800 text-lg font-sans p-2.5 rounded-xl"
    >
      <Icon icon="akar-icons:check"></Icon>
    </div>
  );
}
interface IDeleteButton {
  completed: boolean;
  id: string;
  setTasks: (update: Array<Task>) => void;
}
function DeleteButton({ completed, id, setTasks }: IDeleteButton): JSX.Element {
  const onClick = async () => {
    await deleteTask(id);
    getTasks().then((res) => {
      setTasks(res);
    });
  };
  if (completed) {
    return (
      <div
        onClick={onClick}
        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 md:right-auto md:left-full md:translate-x-4 scale-0 group-hover:scale-100 hover:scale-100 delay-100 duration-100 inline-block bg-rose-200 text-red-700 text-lg font-sans p-2.5 rounded-xl"
      >
        <Icon icon="bx:trash"></Icon>
      </div>
    );
  } else {
    return (
      <div
        onClick={onClick}
        className="cursor-pointer absolute right-8 -translate-x-full top-1/2 -translate-y-1/2 md:-right-8 md:translate-x-2x scale-0 group-hover:scale-100 hover:scale-100 delay-200 duration-100 inline-block bg-rose-200 text-red-700 text-lg font-sans p-2.5 rounded-xl"
      >
        <Icon icon="bx:trash"></Icon>
      </div>
    );
  }
}
