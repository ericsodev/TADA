import { useContext, useEffect, useState } from "react";
import { Task } from "../../todo/TodoAPI";
import TodoDictContext from "../../store/TodoDictContext";
import { TODO_DICT_ASYNC_ACTIONS as dispatchActions } from "../../reducers/todoDictReducer";
import TodoGroup from "./TodoGroup";

export default function BoardView(): JSX.Element {
    const { todoDict, dispatchTodoDict } = useContext(TodoDictContext);
    const [todoArrays, setTodoArrays] = useState<any>({ planned: [], urgent: [], completed: [] }); // TODO: Write interface for this
    useEffect(() => {
        dispatchTodoDict({ type: dispatchActions.FETCH_ALL_TASKS });
    }, []);
    useEffect(() => {
        let plannedArray: Array<Task> = [];
        let urgentArray: Array<Task> = [];
        let completedArray: Array<Task> = [];
        for (const [_id, task] of Object.entries(todoDict)) {
            if (task.completed) {
                completedArray.push(task);
                continue;
            }
            if (task.priority == "urgent") {
                urgentArray.push(task);
                continue;
            }
            plannedArray.push(task);
        }
        setTodoArrays({
            planned: plannedArray,
            urgent: urgentArray,
            completed: completedArray,
        });
    }, [todoDict]);
    return (
        <div className="flex h-full w-full flex-row gap-x-6 bg-opacity-5 px-6 py-3 lg:gap-x-10 lg:px-24 lg:py-5">
            <TodoGroup
                className="hidden md:flex"
                title="planned"
                todos={todoArrays.planned}></TodoGroup>
            <TodoGroup title="urgent" todos={todoArrays.urgent}></TodoGroup>
            <TodoGroup title="completed" todos={todoArrays.completed}></TodoGroup>
        </div>
    );
}
