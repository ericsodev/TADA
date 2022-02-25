import { ViewContext, Views } from "./ViewContext";
import { useContext } from "react";

export default function ViewWrapper() {
  const { selectedView } = useContext(ViewContext);
  const ViewElement = Views[selectedView];
  return <ViewElement></ViewElement>;
}
