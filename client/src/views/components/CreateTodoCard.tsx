import { Task, Priority } from "../../todo/TodoAPI";
import React, { useState, useContext, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import TodoDictContext from "../../store/TodoDictContext";
import { TODO_DICT_ASYNC_ACTIONS } from "../../reducers/todoDictReducer";

interface ITodoCard {
  defaultDueDate?: string;
}
interface IFormData {
  name: string;
  priority: Priority;
}
const SelectThemes = {
  planned: "bg-cyan-100 text-cyan-500",
  sidequest: "bg-amber-100 text-amber-600",
  urgent: "bg-rose-100 text-rose-500",
};
export default function CreateTodoCard({ defaultDueDate }: ITodoCard): JSX.Element {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [formData, setFormData] = useState<IFormData>({ name: "", priority: "planned" });
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatchTodoDict } = useContext(TodoDictContext);
  useEffect(() => {
    document.addEventListener("keyup", (event) => {
      switch (event.code) {
        case "KeyN":
          onNKey();
          return;

        case "Escape":
          if (!collapsed) {
            setCollapsed(() => true);
          }
          return;
        default:
          return;
      }
    });
  }, []);

  const onNKey = () => {
    if (collapsed) {
      console.log(collapsed);
      setCollapsed((col) => false);
      // FIXME: setCollapsed does not update collapse
      if (inputRef.current) {
        // setFormData({ ...formData, name: formData.name.slice(0, -1) });
      }
    }
  };
  const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const newTaskData = {
      name: formData.name,
      priority: formData.priority,
      dueDate: defaultDueDate,
      completed: false,
    };
    await dispatchTodoDict({
      type: TODO_DICT_ASYNC_ACTIONS.ADD_NEW_TASK,
      payload: { task: newTaskData },
    });
    setCollapsed(true);
    setFormData({ name: "", priority: "planned" });
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.name === "name") {
      let newData = formData;
      newData[e.target.name] = e.target.value;
      setFormData({ ...newData });
    } else if (e.target.name === "priority") {
      let newData = formData;

      // Typescript made me do this...
      if (
        e.target.value === "planned" ||
        e.target.value === "sidequest" ||
        e.target.value === "urgent"
      ) {
        newData[e.target.name] = e.target.value;
        setFormData({ ...newData });
      }
    }
  };
  useEffect(() => {
    if (!collapsed) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [collapsed]);
  return (
    <div className="group">
      <Collapsed
        collapsed={collapsed}
        onClick={() => {
          setCollapsed(false);
        }}></Collapsed>
      <div
        className={`h-0 ${
          collapsed ? "w-0 scale-0" : "h-auto w-full scale-100"
        } w-full origin-top-left rounded-xl bg-cyan-50 py-3 px-5 font-sans text-lg transition-all duration-150`}>
        <form
          className="grid grid-cols-12 grid-rows-2 flex-wrap gap-1 lg:gap-3.5"
          onSubmit={submit}>
          <input
            ref={inputRef}
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Task Name"
            className=" grow-1 col-span-6 inline-block rounded-lg bg-slate-200 py-1 px-2 text-slate-800 outline-none lg:px-3"></input>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={`grow-1 col-span-6 inline-block w-auto rounded-lg border-none ${
              SelectThemes[formData.priority]
            } py-1 px-2 text-slate-800 lg:px-3`}>
            {Object.entries(SelectThemes).map(([key, val]) => {
              return (
                <option value={key} className={val}>
                  {key}
                </option>
              );
            })}
          </select>
          <button
            type="submit"
            className="grow-1 col-span-10 content-center rounded-lg bg-lime-300 p-2">
            create
          </button>
          <button
            type="button"
            onClick={() => {
              setCollapsed(true);
            }}
            className="grow-1 col-span-2 overflow-hidden overflow-ellipsis rounded-lg bg-rose-200 p-2 text-red-900">
            exit
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
