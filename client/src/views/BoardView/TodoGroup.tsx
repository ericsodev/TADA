import { useEffect } from "react";
import { Task } from "../../todo/TodoAPI";
import TodoCard from "../../todo/TodoCard";

interface ITodoGroup {
    todos: Array<Task>;
    title: "planned" | "urgent" | "completed";
    className?: string;
}

export default function TodoGroup({ todos, title, className }: ITodoGroup): JSX.Element {
    return (
        <div className={`flex grow basis-1/3 flex-col gap-y-6 ${className}`}>
            <h1 className="font-sans text-2xl font-medium text-purple-100 md:text-4xl">
                {title.toLowerCase()}
            </h1>
            <div className="grid-row-flow grid grow grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
                {todos.map((todo) => {
                    return <TodoCard todo={todo} group={title}></TodoCard>;
                })}
            </div>
        </div>
    );
}
