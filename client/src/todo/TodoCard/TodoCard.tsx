import { Task } from "../TodoAPI";

interface ITodoCard {
    todo: Task;
    group: "planned" | "urgent" | "completed";
    classNames?: string;
}

const themes = {
    planned: "bg-cyan-50 hover:bg-cyan-100",
    urgent: "bg-amber-100 hover:bg-amber-200",
    completed: "bg-emerald-100 hover:bg-emerald-200",
};

// NOTE: Intended for use in a grid
export default function TodoCard({ todo, group, classNames }: ITodoCard) {
    return (
        <div
            draggable="true"
            className={`h-24 w-full rounded-lg px-2 lg:h-32 lg:px-4 lg:py-6 ${themes[group]}`}>
            <text className="font-sans font-semibold">{todo.name}</text>
        </div>
    );
}
