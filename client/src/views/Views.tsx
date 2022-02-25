import { useContext } from "react";
import Header from "../components/Header";
import Todo from "../components/Todo";
import { TaskContext } from "../models/Task";
function CreateDayTodo(): JSX.Element {
  return <div className=""></div>;
}
export function DayView() {
  const parentClass = ["grow", "flex", "flex-col"].join(" ");
  const { tasks, setTasks } = useContext(TaskContext);

  let activeTodoComponents: Array<JSX.Element> = [];
  let completedTodoComponents: Array<JSX.Element> = [];

  tasks.forEach((element) => {
    if (element.completed) {
      activeTodoComponents.push(<Todo task={element} date={false} />);
    } else {
      completedTodoComponents.push(<Todo task={element} date={false} />);
    }
  });

  return (
    <div className={parentClass}>
      <div className="flex flex-row justify-center">
        <div className="grow-0 px-4 lg:px-8 basis-full sm:basis-5/6 md:basis-1/2 xl:basis-1/3 flex flex-col justify-start items-stretch gap-3">
          <div className="flex flex-col gap-3">{completedTodoComponents}</div>
          <div className="flex flex-col gap-3">{activeTodoComponents}</div>
        </div>
      </div>
    </div>
  );
}

export function GlobalView() {
  return <div></div>;
}

export function ScopedView() {
  return <div></div>;
}

export function WeekView() {
  return <div className=""></div>;
}
