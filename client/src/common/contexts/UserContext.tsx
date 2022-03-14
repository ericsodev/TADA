import React from "react";

interface IUserIDConext {
  userID: string | null;
  setUserID: (new_id: string | null) => void;
}
export const UserIDContext = React.createContext<IUserIDConext>({
  userID: null,
  setUserID: (_id) => {},
});
