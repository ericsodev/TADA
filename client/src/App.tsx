import React, { useEffect, useState } from "react";
import Selector from "./components/Selector";
import { ViewContext, ViewTypes } from "./views/ViewContext";
import ViewWrapper from "./views/ViewWrapper";
import { Task, TaskContext, getTasks } from "./todo/Task";
import Header from "./components/Header";
import StatusBar from "./status/StatusBar";

function App() {
  const [view, setView] = useState<ViewTypes>("Day");
  const [taskList, fetchTask] = useState<Array<Task>>([]);
  useEffect(() => {
    getTasks()
      .then((val) => {
        fetchTask(val);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [view]);

  return (
    <div className="App h-full bg-slate-800 flex flex-col h-100 min-h-fit">
      <StatusBar></StatusBar>
      <Header title={view}></Header>
      <ViewContext.Provider value={{ selectedView: view, setView: setView }}>
        <Selector></Selector>
        <TaskContext.Provider value={{ tasks: taskList, setTasks: fetchTask }}>
          <ViewWrapper></ViewWrapper>
        </TaskContext.Provider>
      </ViewContext.Provider>
    </div>
  );
}
export default App;
