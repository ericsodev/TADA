import ViewWrapper from "./pages/ViewWrapper";
import StatusMenu from "./components/StatusMenu";
import { UserIDContext } from "./common/contexts/UserContext";
import { useState } from "react";

function App() {
  const [userID, setUserID] = useState<string | null>(null);
  return (
    <div className="App flex h-full flex-col bg-slate-800">
      <UserIDContext.Provider value={{ userID: userID, setUserID: setUserID }}>
        <StatusMenu></StatusMenu>
        <ViewWrapper></ViewWrapper>
      </UserIDContext.Provider>
    </div>
  );
}
export default App;
