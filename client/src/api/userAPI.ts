import { DiscordUser } from "../common/types";

export async function getDiscordUser(token: string): Promise<DiscordUser | null> {
  try {
    const res = await fetch("http://localhost:5000/auth/user/me", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const user = await res.json();
    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Checks if URL contains token, then checks for local storage. Updates local storage to use latest token
export function getAuthToken(): string | null {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get("token") !== null) {
    let token = urlParams.get("token");
    localStorage.setItem("todoapp-discord-auth-token", token ? token : ""); // The ternary is to suppress TS Errors
    return token;
  } else if (localStorage.getItem("todoapp-discord-auth-token")) {
    return localStorage.getItem("todoapp-discord-auth-token");
  } else {
    return null;
  }
}

export function revokeToken() {
  localStorage.removeItem("todoapp-discord-auth-token");
}
