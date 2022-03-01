import { Task, Priority, createTask } from "../../todo/TodoAPI";
import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { TodoDictContext } from "../../store/TodoDictContext";
import { TODO_DICT_ASYNC_ACTIONS } from "../../reducers/todoDictReducer";

export default function CreateTodoCard(): JSX.Element {
  const [collapsed, toggleCollapsed] = useState<boolean>(true);
  const [formData, setFormData] = useState({ name: "", priority: "planned" });
  const { dispatchTodoDict } = useContext(TodoDictContext);
  const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const newTaskData = {
      name: formData.name,
      priority: formData.priority,
      completed: false,
    };
    await dispatchTodoDict({
      type: TODO_DICT_ASYNC_ACTIONS.ADD_NEW_TASK,
      payload: { task: newTaskData },
    });
    toggleCollapsed(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.name === "name" || e.target.name === "priority") {
      let newData = formData;
      newData[e.target.name] = e.target.value;
      setFormData({ ...newData });
    }
  };
  return (
    <div className="group">
      <Collapsed
        collapsed={collapsed}
        onClick={() => {
          toggleCollapsed(false);
        }}></Collapsed>
      <div
        className={`${
          collapsed ? "hidden scale-0" : "block scale-100"
        } w-full rounded-xl bg-cyan-50 py-3 px-5 font-sans text-lg transition-all duration-100`}>
        <form
          className="item-stretch flex flex-row flex-wrap justify-start gap-2 lg:gap-5"
          onSubmit={submit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Task Name"
            className=" inline-block w-1/2 grow-0 rounded-lg bg-slate-200 py-1 px-2 text-slate-800 outline-none lg:px-3"></input>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className=" grow-1 inline-block w-auto rounded-lg border-none bg-slate-200 py-1 px-2 text-slate-800 lg:px-3">
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
    </div>
  );
}

interface ICollapsed {
  onClick: () => void;
  collapsed: boolean;
}
function Collapsed({ onClick, collapsed }: ICollapsed): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={`${
        collapsed ? "inline-block" : "hidden"
      } text-md inline-block cursor-pointer rounded-xl bg-cyan-50 px-3 py-2 font-sans font-medium text-slate-800 hover:bg-lime-100 active:bg-lime-200`}>
      New
      <Icon className="inline-block text-2xl text-gray-900" icon="carbon:add"></Icon>
    </div>
  );
}
