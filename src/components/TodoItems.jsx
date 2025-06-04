import tick_icon from "../assets/tick.png";
import delete_icon from "../assets/delete.png";
import not_tick from "../assets/not_tick.png";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, todoEdit }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      <div
        className="flex flex-1 items-center cursor-pointer"
        onClick={() => toggle(id)}
      >
        <img src={isComplete ? tick_icon : not_tick} alt="" className="w-7" />
        <p
          className={` ${
            isComplete
              ? "text-slate-400 ml-4 text-[17px]"
              : "text-slate-700 ml-4 text-[17px]"
          }`}
        >
          {text}
        </p>
      </div>
      <img
        onClick={() => {
          deleteTodo(id);
        }}
        src={delete_icon}
        alt=""
        className="w-3.5 cursor-pointer"
      />
      <button
        className="ml-2 text-xs px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
        onClick={() => todoEdit(id, text)}
      >
        Edit
      </button>
    </div>
  );
};

export default TodoItems;
