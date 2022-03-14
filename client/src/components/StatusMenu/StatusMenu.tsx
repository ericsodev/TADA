import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { UserIDContext } from "../../common/contexts/UserContext";
import { getAuthToken, getDiscordUser, revokeToken } from "../../api/userAPI";
import { DiscordUser } from "../../common/types";

export default function StatusMenu(): JSX.Element {
  const { setUserID } = useContext(UserIDContext);
  const [loggedIn, setLoggedIn] = useState(false);
  let token: string | null = null;
  const [user, setUser] = useState<DiscordUser>({ id: "", username: "", avatar: "" });

  useEffect(() => {
    token = getAuthToken();
    if (token) {
      getDiscordUser(token).then((res) => {
        if (res) {
          // Got a response for discord user object
          setUser(res);
          setUserID(user.id);
          setLoggedIn(true);
        } else {
          // Token is probably expired
          revokeToken();
          token = null;
          setLoggedIn(false);
        }
      });
    }
  }, []);
  console.log(user);
  if (!loggedIn) {
    return (
      <div className="flex flex-row">
        <button
          className="inline-block cursor-pointer rounded-md bg-purple-300 px-3 py-1 font-sans font-medium"
          onClick={() => {
            window.location.assign("http://localhost:5000/auth/login");
          }}>
          Login
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row">
        Logged in as
        {user.username}
      </div>
    );
  }
}
