import { formatDate } from "../utilities/DateUtil";

const dailyPhrases: Array<string> = [
  "No pressure, no diamonds",
  "Screw it, let's do it",
  "In the end, you just have to pull the trigger",
  "Pressure's what you make of it",
  "Sometimes you just gotta lick the stamp and send it",
];

interface HeaderProp {
  title: string;
}

export default function Header(prop: HeaderProp) {
  const randomNum = Math.floor(Math.random() * dailyPhrases.length);
  let date = (
    <p className="w-fit hidden md:inline-block font-sans font-medium text-xl text-lime-200">
      {formatDate(new Date(Date.now()), {
        weekday: "short",
        month: "short",
        day: "numeric",
      })}
    </p>
  );
  return (
    <div className="grow-0 basis-1/6 sm:basis-1/6 md:basis-1/5 lg:basis-1/4 flex flex-col justify-center items-center py-5">
      <h1 className="w-fit inline-block md:mb-5 text-5xl sm:text-6xl 2xl:text-7xl text-purple-100 font-display font-semibold">
        {prop.title}
      </h1>
      {date}
      <p className="w-fit hidden md:inline-block font-sans italic text-lg text-lime-200">
        {dailyPhrases[randomNum]}
      </p>
    </div>
  );
}
