import DayView from "./DayView";
import WeekView from "./WeekView";
import ScopedView from "./ScopedView";
import GlobalView from "./GlobalView";
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
