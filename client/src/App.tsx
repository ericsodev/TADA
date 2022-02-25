import React, { useEffect, useState } from "react";
import Selector from "./components/Selector";
import { ViewContext, ViewTypes } from "./views/ViewContext";
import ViewWrapper from "./views/ViewWrapper";
import { Task, TaskContext } from "./tasks/Task";

async function fetchData(): Promise<Array<Task>> {
  try {
    const data: Array<Task> = await (
      await fetch("http://localhost:5000/api/todo")
    ).json();
    return data;
  } catch (err) {
    console.log("Error fetching tasks");
    console.log(err);
    return [];
  }
}

function App() {
  const [view, setView] = useState<ViewTypes>("Day");
  const [taskList, fetchTask] = useState<Array<Task>>([]);
  useEffect(() => {
    fetchData()
      .then((val) => {
        fetchTask(val);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [view]);
  return (
    <div className="App h-full bg-slate-800 flex flex-col h-100 min-h-fit">
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
