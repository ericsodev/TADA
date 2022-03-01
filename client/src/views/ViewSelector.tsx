import { useContext } from "react";
import { ViewContext } from "../store/ViewContext";
import { Views, ViewTypes } from "./Views";

export default function ViewSelector() {
  let buttons: Array<JSX.Element> = [];
  const { selectedView, setView } = useContext(ViewContext);
  Object.keys(Views).forEach((element) => {
    buttons.push(
      <div
        key={element}
        onClick={() => setView(element as ViewTypes)}
        className={`${
          element === selectedView
            ? "bg-lime-300 hover:bg-lime-400"
            : "bg-sky-100 hover:bg-lime-200"
        } 
        cursor-pointer rounded-xl py-1 px-5 font-sans text-base shadow-md active:bg-slate-300`}>
        {element}
      </div>
    );
  });
  return (
    <div className="flex grow-0 basis-auto flex-row items-center justify-center gap-x-2 py-5">
      {buttons}
    </div>
  );
}
