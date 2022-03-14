import { formatDate } from "../../helpers/DateUtil";

interface HeaderProp {
  title: string;
}

export default function Header(prop: HeaderProp) {
  let date = (
    <p className="hidden w-fit font-sans text-xl font-medium text-lime-200 md:inline-block">
      Today is{" "}
      {formatDate(new Date(Date.now()), {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}
    </p>
  );
  return (
    <div className="flex grow-0 basis-1/6 flex-col items-center justify-center py-5 sm:basis-1/6 md:basis-1/5 lg:basis-1/4">
      <h1 className="inline-block w-fit font-display text-5xl font-semibold text-purple-100 sm:text-6xl md:mb-5 2xl:text-7xl">
        {prop.title}
      </h1>
      {date}
    </div>
  );
}
