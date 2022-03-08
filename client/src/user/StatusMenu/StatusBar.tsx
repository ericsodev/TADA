import { Icon } from "@iconify/react";

interface IStatusMenu {
  className?: string;
}
export default function StatusMenu(): JSX.Element {
  return (
    <>
      <StatusBar></StatusBar>
      <StatusDropMenu></StatusDropMenu>
    </>
  );
}

interface IStatusBar {
  className?: string;
}
export function StatusBar({ className }: IStatusBar): JSX.Element {
  return (
    <div className={`${className} flex basis-0 flex-row bg-slate-500 bg-opacity-25 md:basis-12`}>
      <text className="font-sans text-lg text-purple-50">Signed in as YaTrippin#9181</text>
    </div>
  );
}

interface IStatusDrop {
  className?: string;
}
export function StatusDropMenu(): JSX.Element {
  return (
    <div className="md:hidden">
      <Icon icon="ci:hamburger" className="md:-basis-0 text-5xl text-slate-200"></Icon>
    </div>
  );
}
