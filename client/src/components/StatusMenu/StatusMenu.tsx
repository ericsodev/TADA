import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { UserIDContext } from "../../common/contexts/UserContext";
import { getAuthToken, getDiscordUser, revokeToken } from "../../api/userAPI";
import { DiscordUser } from "../../common/types";
import { TokenContext } from "../../common/contexts/TokenContext";

export default function StatusMenu(): JSX.Element {
  const { setUserID } = useContext(UserIDContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<DiscordUser>({ id: "", username: "", avatar: "" });
  const { token, setToken } = useContext(TokenContext);

  useEffect(() => {
    let tempToken = getAuthToken();
    if (tempToken) {
      setToken(tempToken);
      getDiscordUser(tempToken).then((res) => {
        if (res) {
          // Got a response for discord user object
          setUser(res);
          setUserID(user.id);
          setLoggedIn(true);
        } else {
          // Token is probably expired
          revokeToken();
          setToken("");
          setLoggedIn(false);
        }
      });
    }
  }, []);
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
      <div className="flex flex-row items-center justify-end gap-x-8 py-3 px-6">
        <text className="font-sans font-medium text-purple-100">
          Logged in as <strong className="text-purple-300">{user.username}</strong>
        </text>
        <img
          className="rounded-full border-2 border-solid border-purple-200 drop-shadow-lg"
          alt="Discord profile picture"
          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=48`}></img>
      </div>
    );
  }
}
