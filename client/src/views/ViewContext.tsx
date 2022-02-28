import { Views } from "./Views";
import React, { useContext } from "react";

export type ViewTypes = keyof typeof Views;
interface IViewContext {
  selectedView: ViewTypes;
  setView: (view: ViewTypes) => void;
}

export const ViewContext = React.createContext<IViewContext>({
  selectedView: "Day",
  setView: (view) => {},
});
