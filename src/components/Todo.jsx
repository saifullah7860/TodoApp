import { useEffect, useRef, useState } from "react";
import todo_logo from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const getUserUID = () => localStorage.getItem("userUID");
const getTodosKey = () => `todos_${getUserUID()}`;

const Todo = ({ onLogout }) => {
  const [todoList, setTodoList] = useState(() => {
    const key = getTodosKey();
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  });
  const [editingId, setEditingId] = useState(null);
  const inputRef = useRef();

  const todoEdit = (id, text) => {
    inputRef.current.value = text;
    setEditingId(id);
  };

  const todoAddOrUpdate = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }
    if (editingId !== null) {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === editingId ? { ...todo, text: inputText } : todo
        )
      );
      setEditingId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: inputText,
        isComplete: false,
      };
      setTodoList((prev) => [...prev, newTodo]);
    }
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
    if (editingId === id) {
      setEditingId(null);
      inputRef.current.value = "";
    }
  };
  const toggle = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    const key = getTodosKey();
    localStorage.setItem(key, JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    const key = getTodosKey();
    const stored = localStorage.getItem(key);
    setTodoList(stored ? JSON.parse(stored) : []);
  }, []);

  return (
    <>
      <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[500px] rounded-[4px]">
        <div className="flex items-center mt-7 gap-2 justify-center">
          <img className="w-8" src={todo_logo} alt="" />
          <h1 className="text-3xl font-semibold">Todo List</h1>
        </div>
        <div className="flex items-center my-7 bg-gray-200 rounded-full">
          <input
            ref={inputRef}
            className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
            type="text"
            placeholder="What needs to be Done?"
            onKeyDown={(e) => {
              if (e.key === "Enter") todoAddOrUpdate();
            }}
          />
          <button
            onClick={todoAddOrUpdate}
            className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
          >
            {editingId !== null ? "UPDATE" : "ADD"}
          </button>
        </div>
        <div>
          {todoList.map((item) => {
            return (
              <TodoItems
                key={item.id}
                text={item.text}
                id={item.id}
                isComplete={item.isComplete}
                deleteTodo={deleteTodo}
                toggle={toggle}
                todoEdit={todoEdit}
              />
            );
          })}
        </div>
      </div>
      <button
        className="mt-2 rounded-full bg-red-500 w-32 h-12 text-white text-sm font-medium cursor-pointer self-center ml-auto mr-auto"
        onClick={onLogout}
      >
        LOGOUT
      </button>
    </>
  );
};

export default Todo;
