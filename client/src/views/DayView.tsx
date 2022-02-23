import { useContext } from "react";
import Header from "../components/Header";
import Todo from "../components/Todo";
import { TaskContext } from "../tasks/Task";
const sampleTodos = [
  {
    name: "Sample 1",
    createdDate: "2022-02-18",
    plannedDate: "2022-02-20",
    priority: 1,
    categories: ["school"],
    disabled: true,
  },
  {
    name: "Sample 2",
    createdDate: "2022-02-18",
    plannedDate: "2022-02-20",
    priority: 1,
    categories: ["school"],
    disabled: true,
  },
  {
    name: "Sample 3",
    createdDate: "2022-02-18",
    plannedDate: "2022-02-20",
    priority: 1,
    categories: ["school"],
    disabled: false,
  },
];
export default function DayView() {
  const parentClass = ["grow", "flex", "flex-col"].join(" ");
  const { tasks, setTasks } = useContext(TaskContext);

  let activeTodoComponents: Array<JSX.Element> = [];
  let disabledTodoComponents: Array<JSX.Element> = [];

  tasks.forEach((element) => {
    if (element.completed) {
      activeTodoComponents.push(<Todo {...element} />);
    } else {
      disabledTodoComponents.push(<Todo {...element} />);
    }
  });

  return (
    <div className={parentClass}>
      <Header title="Day View" date></Header>
      <div className="flex flex-row justify-center">
        <div className="grow-0 px-2 basis-full sm:basis-5/6 md:basis-1/2 lg:basis-1/4 flex flex-col justify-start items-stretch gap-3">
          <div className="flex flex-col gap-3">{activeTodoComponents}</div>
          <div className="flex flex-col gap-3">{disabledTodoComponents}</div>
        </div>
      </div>
    </div>
  );
}
