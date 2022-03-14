import DayView from "./DayView/DayView";
import ScopedView from "./ScopedView/ScopedView";
import BoardView from "./BoardView/BoardView";
import GlobalView from "./GlobalView/GlobalView";

export const Views = {
  Day: DayView,
  Board: BoardView,
  Scoped: ScopedView,
  Global: GlobalView,
};

export type ViewTypes = keyof typeof Views;
