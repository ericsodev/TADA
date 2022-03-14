import { ViewContext } from "../common/contexts/ViewContext";
import { Views, ViewTypes } from "./Views";
import { useEffect, useReducer, useState } from "react";
import TodoDictContext from "../common/contexts/TodoDictContext";
import ViewSelector from "./ViewSelector";
import Header from "../components/Header/";
import { todoReducer, todoAsyncReducer } from "../common/reducers/todoDictReducer";

const headerProps = {
  Day: { title: "Day" },
  Scoped: { title: "Scoped" },
  Board: { title: "Board" },
  Global: { title: "Global" },
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
