import DayView from "./components/DayView";
import ScopedView from "./components/ScopedView";
import BoardView from "./components/BoardView";
import GlobalView from "./components/GlobalView";

export const Views = {
  Day: DayView,
  Board: BoardView,
  Scoped: ScopedView,
  Global: GlobalView,
};

export type ViewTypes = keyof typeof Views;
