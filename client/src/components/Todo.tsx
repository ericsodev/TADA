import { formatDate } from "../utilities/DateUtil";
import ToolTip from "./ToolTip";
import { Task } from "../tasks/Task";

export default function Todo(props: Task) {
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
  const disabledClasses = ["bg-emerald-300", "hover:bg-emerald-400"];
  console.log(props.createdDate);
  const parentClass = props.completed
    ? activeClasses.concat(parentClasses).join(" ")
    : disabledClasses.concat(parentClasses).join(" ");
  const formattedDueDate = formatDate(new Date(props.dueDate + "T00:00"), {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  return (
    <div className={parentClass}>
      <p className="font-sans">{props.name}</p>
      <p className="self-center text-sm font-sans font-light hidden md:inline-block ml-auto">
        {formattedDueDate}
      </p>
      <ToolTip
        breakPoint="sm"
        text={formattedDueDate}
        direction="r"
        gap="sm"
      ></ToolTip>
    </div>
  );
}
