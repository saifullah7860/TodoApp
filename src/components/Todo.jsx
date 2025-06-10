import { useEffect, useRef, useState } from "react";
import todo_logo from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";

const Todo = ({ onLogout }) => {
  const [todoList, setTodoList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [user, setUser] = useState(null);
  const inputRef = useRef();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const userUID = user?.uid;

  const todoEdit = (id, text) => {
    inputRef.current.value = text;
    setEditingId(id);
  };

  const todoAddOrUpdate = () => {
    if (!userUID) return;
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return null;
    const db = getDatabase(app);
    if (editingId !== null) {
      const updatedTodo = {
        ...todoList.find((todo) => todo.id === editingId),
        text: inputText,
      };
      set(ref(db, `todos/${userUID}/${editingId}`), updatedTodo);
      setEditingId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: inputText,
        isComplete: false,
      };
      set(ref(db, `todos/${userUID}/${newTodo.id}`), newTodo);
    }
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    if (!userUID) return;
    const db = getDatabase(app);
    remove(ref(db, `todos/${userUID}/${id}`));
    if (editingId === id) {
      setEditingId(null);
      inputRef.current.value = "";
    }
  };

  const toggle = (id) => {
    if (!userUID) return;
    const db = getDatabase(app);
    const todo = todoList.find((t) => t.id === id);
    if (todo) {
      update(ref(db, `todos/${userUID}/${id}`), {
        isComplete: !todo.isComplete,
      });
    }
  };

  useEffect(() => {
    if (!userUID) return;
    const db = getDatabase(app);
    const todosRef = ref(db, `todos/${userUID}`);
    const unsubscribe = onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      setTodoList(data ? Object.values(data) : []);
    });
    return () => unsubscribe();
  }, [userUID]);
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
