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
                        ? "bg-lime-300 hover:bg-lime-400 active:bg-lime-500"
                        : "bg-sky-100 hover:bg-lime-200 active:bg-lime-300"
                } 
         cursor-pointer py-2 px-5 font-sans text-base shadow-md first:rounded-l-lg last:rounded-r-lg lg:px-8`}>
                {element}
            </div>
        );
    });
    return (
        <div className="flex grow-0 basis-auto flex-row items-center justify-center py-5">
            {buttons}
        </div>
    );
}
