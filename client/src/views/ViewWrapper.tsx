import { ViewContext } from "../store/ViewContext";
import { Views, ViewTypes } from "./Views";
import { useEffect, useReducer, useState } from "react";
import TodoDictContext from "../store/TodoDictContext";
import ViewSelector from "./ViewSelector";
import Header from "../components/Header";
import { todoReducer, todoAsyncReducer } from "../reducers/todoDictReducer";

const headerProps = {
  Day: { title: "Day", showMessage: true },
  Scoped: { title: "Scoped", showMessage: true },
  Board: { title: "", showMessage: false },
  Global: { title: "Global", showMessage: false },
};

export default function ViewWrapper() {
  const [todoDict, dispatchTodoDict] = useReducer(todoReducer, {});
  const [selectedView, setView] = useState<ViewTypes>("Day");
  const dispatchAsyncTodo = todoAsyncReducer(dispatchTodoDict);
  const ViewElement = Views[selectedView];

  return (
    <div className="flex grow flex-col">
      <Header {...headerProps[selectedView]}></Header>
      <ViewContext.Provider value={{ selectedView: selectedView, setView: setView }}>
        <ViewSelector></ViewSelector>
      </ViewContext.Provider>
      <TodoDictContext.Provider value={{ todoDict: todoDict, dispatchTodoDict: dispatchAsyncTodo }}>
        <ViewElement></ViewElement>
      </TodoDictContext.Provider>
    </div>
  );
}
