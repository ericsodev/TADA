import { DayView, GlobalView, ScopedView, WeekView } from "./Views";
import React, { useContext } from "react";

export const Views = {
  Day: DayView,
  Week: WeekView,
  Scoped: ScopedView,
  Global: GlobalView,
};
export type ViewTypes = keyof typeof Views;
interface IViewContext {
  selectedView: ViewTypes;
  setView: (view: ViewTypes) => void;
}

export const ViewContext = React.createContext<IViewContext>({
  selectedView: "Day",
  setView: (view) => {},
});
