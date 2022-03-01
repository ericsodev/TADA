import { ViewTypes } from "../views/Views";
import React from "react";

// TODO: Check if there is need for this Context.
interface IViewContext {
  selectedView: ViewTypes;
  setView: (view: ViewTypes) => void;
}

export const ViewContext = React.createContext<IViewContext>({
  selectedView: "Day",
  setView: (view) => {},
});
