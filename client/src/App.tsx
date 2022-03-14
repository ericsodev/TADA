import ViewWrapper from "./pages/ViewWrapper";
import StatusMenu from "./components/StatusMenu";
import { TokenContext } from "./common/contexts/TokenContext";
import { UserIDContext } from "./common/contexts/UserContext";
import { useState } from "react";

function App() {
  const [userID, setUserID] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");
  return (
    <div className="App flex h-full flex-col bg-slate-800">
      <TokenContext.Provider value={{ token: token, setToken: setToken }}>
        <UserIDContext.Provider value={{ userID: userID, setUserID: setUserID }}>
          <StatusMenu></StatusMenu>
        </UserIDContext.Provider>
        <ViewWrapper></ViewWrapper>
      </TokenContext.Provider>
    </div>
  );
}
export default App;
