import React, { useEffect, useState } from "react";
import ViewWrapper from "./views/ViewWrapper";
import StatusMenu from "./user/StatusMenu";

function App() {
  return (
    <div className="App flex h-full flex-col bg-slate-800">
      <StatusMenu></StatusMenu>
      <ViewWrapper></ViewWrapper>
    </div>
  );
}
export default App;
