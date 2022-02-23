import { useContext } from "react";
import { ViewTypes, ViewContext, Views } from "../views/ViewContext";

export default function Selector() {
  let buttons: Array<JSX.Element> = [];
  const { selectedView, setView } = useContext(ViewContext);
  Object.keys(Views).forEach((element) => {
    buttons.push(
      <div
        onClick={() => setView(element as ViewTypes)}
        className={`${
          element === selectedView ? "bg-purple-300 hover:bg-purple-400" : ""
        } 
        cursor-pointer rounded-xl py-1 px-5 font-sans text-base bg-sky-100 hover:bg-purple-100 active:bg-slate-300 shadow-md`}
      >
        {element}
      </div>
    );
  });
  return (
    <div className="grow-0 basis-auto flex flex-row justify-center items-center gap-x-2 py-5">
      {buttons}
    </div>
  );
}
