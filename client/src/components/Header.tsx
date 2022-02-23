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
  date: boolean;
}

export default function Header(prop: HeaderProp) {
  const randomNum = Math.floor(Math.random() * dailyPhrases.length);
  let date = prop.date ? (
    <span className="w-fit hidden md:inline-block font-sans text-lg text-purple-200">
      {formatDate(new Date(Date.now()), {
        weekday: "short",
        month: "short",
        day: "numeric",
      })}
    </span>
  ) : (
    <></>
  );
  return (
    <div className="grow-0 basis-1/6 sm:basis-1/6 md:basis-1/5 lg:basis-1/4 flex flex-col justify-center items-center gap-y-5">
      <h1 className="w-fit inline-block text-4xl sm:text-4xl md:text-5xl 2xl:text-6xl text-purple-100 font-display font-semibold">
        {prop.title}
      </h1>
      <span className="w-fit hidden md:inline-block font-sans text-lg text-purple-200">
        {dailyPhrases[randomNum]}
      </span>
      {date}
    </div>
  );
}
