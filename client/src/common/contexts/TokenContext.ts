import React from "react";

interface IUserIDContext {
  token: string;
  setToken: (token: string) => void;
}
export const TokenContext = React.createContext<IUserIDContext>({
  token: "",
  setToken: (_t: string) => {},
});
