type Anchor = "t" | "b" | "l" | "r";
type GapSize = "sm" | "md" | "lg";
type BreakPoint = "" | "sm" | "md" | "lg" | "xl" | "2xl";
const gapsizes = {
  sm: 1,
  md: 3,
  lg: 5,
};

interface Props {
  direction: Anchor;
  text: string;
  gap: GapSize;
  breakPoint: BreakPoint;
}
export default function ToolTip(props: Props) {
  let parentClasses = [
    "absolute",
    "bg-gray-700",
    "font-medium",
    "text-cyan-100",
    "rounded-xl",
    "p-2",
    "scale-0",
    "group-hover:scale-100",
    "hidden",
  ];

  if (props.breakPoint == "") {
    parentClasses.splice(parentClasses.indexOf("scale-0"), 1);
  } else {
    parentClasses.push(`${props.breakPoint}:block`);
  }

  if (props.direction == "t") {
    parentClasses.push(
      "top-0",
      "right-0",
      "-translate-y-full",
      "translate-x-1/2"
    );
  } else if (props.direction == "r") {
    parentClasses.push(
      "top-1/2",
      `-right-${gapsizes[props.gap]}`,
      "-translate-y-1/2",
      "translate-x-full"
    );
  }

  const parentClass = parentClasses.join(" ");
  return <div className={parentClass}>{props.text}</div>;
}
