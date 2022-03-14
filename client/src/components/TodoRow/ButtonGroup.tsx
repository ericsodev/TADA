import { useContext } from "react";
import { TODO_DICT_ASYNC_ACTIONS } from "../../common/reducers/todoDictReducer";
import TodoDictContext from "../../common/contexts/TodoDictContext";
import { Icon } from "@iconify/react";
import { TokenContext } from "../../common/contexts/TokenContext";

interface IButtonGroup {
  _id: string;
  completed: boolean;
}
export default function ButtonGroup(props: IButtonGroup): JSX.Element {
  const { dispatchTodoDict } = useContext(TodoDictContext);
  const { token } = useContext(TokenContext);
  const toggleCompleteColour = props.completed
    ? "bg-amber-200 text-amber-800 hover:bg-amber-300 active:bg-amber-400"
    : "bg-lime-300 text-lime-800 hover:bg-lime-400 active:bg-lime-500";

  return (
    <div className="item-center absolute right-2.5 top-1/2 flex origin-left -translate-y-1/2 scale-0 flex-row gap-1 transition-all delay-75 duration-100 hover:delay-700 group-hover:scale-100 lg:right-0 lg:gap-2.5 lg:pl-4 lg:group-hover:translate-x-full">
      <div
        onClick={onToggleComplete({ ...props, dispatch: dispatchTodoDict }, token)}
        className={`transition-color cursor-pointer rounded-xl p-2 font-sans text-xl shadow-xl duration-100 lg:p-3 ${toggleCompleteColour}`}>
        <Icon icon={props.completed ? "ic:baseline-refresh" : "akar-icons:check"}></Icon>
      </div>
      <div
        onClick={onDelete({ _id: props._id, dispatch: dispatchTodoDict }, token)}
        className="transiton-color cursor-pointer rounded-xl bg-rose-200 p-2 font-sans text-xl text-red-700 shadow-xl duration-100 hover:bg-rose-300 active:bg-rose-400 active:text-red-800 lg:p-3">
        <Icon icon="bx:trash"></Icon>
      </div>
    </div>
  );
}

interface ICompleteButton {
  _id: string;
  completed: boolean;
}
interface IOnDelete {
  _id: string;
  dispatch: (action: {}) => void;
}

function onDelete({ _id, dispatch }: IOnDelete, token: string): () => void {
  return async () => {
    await dispatch({
      type: TODO_DICT_ASYNC_ACTIONS.DELETE_TASK,
      payload: { _id: _id, token: token },
    });
  };
}

interface IOnToggleComplete {
  _id: string;
  completed: boolean;
  dispatch: (action: {}) => void;
}
function onToggleComplete(
  { _id, completed, dispatch }: IOnToggleComplete,
  token: string
): () => void {
  return async () => {
    if (token === "") return;
    await dispatch({
      type: TODO_DICT_ASYNC_ACTIONS.UPDATE_TASK,
      payload: { update: { _id: _id, completed: !completed }, token: token },
    });
  };
}
