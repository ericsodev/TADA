import { createTask, TaskContext } from "../../todo/Task";
import { useContext, useState } from "react";
import Todo from "../../todo/Todo";
import { Icon } from "@iconify/react";
import { ReactDOM } from "react";

export default function DayView() {
  const parentClass = ["grow", "flex", "flex-col", "lg:mt-8"].join(" ");
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
        <div className="flex grow-0 basis-full flex-col items-stretch justify-start gap-3 px-4 sm:basis-5/6 md:basis-1/2 lg:px-8 xl:basis-1/3">
          <NewTodo></NewTodo>
          <div className="flex flex-col gap-3">{completedTodoComponents}</div>
          <div className="flex flex-col gap-3">{activeTodoComponents}</div>
        </div>
      </div>
    </div>
  );
}

// Create a Todo for today
function NewTodo(): JSX.Element {
  const [collapsed, toggleCollapsed] = useState<boolean>(true);
  const submit = (event: any) => {
    event.preventDefault();
    createTask({
      name: "TEST ADD",
      dueDate: new Date(Date.now()).toISOString(),
      priority: "urgent",
    });
  };
  let Collapsed = () => {
    return (
      <div
        onClick={() => {
          toggleCollapsed(false);
        }}
        className={`${
          collapsed ? "inline-block" : "hidden"
        } text-md inline-block cursor-pointer rounded-xl bg-cyan-50 px-3 py-2 font-sans font-medium text-slate-800 hover:bg-lime-100 active:bg-lime-200`}>
        New
        <Icon
          className="inline-block text-2xl text-gray-900"
          icon="carbon:add"></Icon>
      </div>
    );
  };
  let Expanded = () => {
    return (
      <div
        className={`${
          collapsed ? "hidden scale-0" : "block scale-100"
        } w-full rounded-xl bg-cyan-50 py-3 px-5 font-sans text-lg transition-all duration-100`}>
        <form
          className="item-stretch flex flex-row flex-wrap justify-start gap-2 lg:gap-5"
          onSubmit={submit}>
          <input
            name="taskName"
            type="text"
            placeholder="Task Name"
            className="inline-block w-1/2 grow-0 basis-1/2 rounded-lg bg-slate-200 px-2 text-slate-800 outline-none lg:px-4"></input>
          <select
            name="taskPriority"
            className="inline-block w-1/3 grow-0 basis-1/2 rounded-lg border-none bg-slate-200 p-2 text-slate-800 lg:basis-1/2 lg:px-4 lg:px-4">
            <option value="planned" className="bg-green-200 text-green-900">
              planned
            </option>
            <option value="sidequest" className="bg-yellow-200 text-yellow-900">
              sidequest
            </option>
            <option value="urgent" className="bg-red-200 text-red-900">
              urgent
            </option>
          </select>
          <button
            type="submit"
            className="basis-full content-center rounded-lg bg-lime-300 p-2 xl:basis-1/2">
            Create
          </button>
        </form>
      </div>
    );
  };
  return (
    <div className="group">
      <Collapsed></Collapsed>
      <Expanded></Expanded>
    </div>
  );
}
