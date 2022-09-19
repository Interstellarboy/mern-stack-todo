import React from "react";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";

function App() {
  // const [todos, setTodos] = useState([]);
  const [backend, setBackend] = useState([]);
  const todoinput = useRef();
  const LOCAL_STORAGE_KEY = "storageKey";
  const BASE_URL = "http://localhost:5000/"
  const [loading, setLoading] = useState(true)
  const [change, setChange] = useState(null)

  useEffect(() => {

    async function fetchTodo() {
      setLoading(true)
      const response = await fetch(`${BASE_URL}`, {
        method: "GET",
      })
      const json = await response.json();
      setBackend(json)
      setLoading(false)
    }
    fetchTodo()
  }, [change])

  // if (!loading) {
  //   console.log("this is backend", backend)
  // }

  // useEffect(() => {
  //   const getTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (getTodos) setTodos(getTodos);
  // }, []);

  // useEffect(() => {
  //   const setStorage = localStorage.setItem(
  //     LOCAL_STORAGE_KEY,
  //     JSON.stringify(todos)
  //   );
  // }, []);

  async function putSaveTodo() {
    const name = todoinput.current.value
    const response = await fetch(`${BASE_URL}addTodo`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: name, completed: false })
    });
    const json = await response.json();
    console.log(response);

  }

  // function addTodos() {
  //   const name = todoinput.current.value;
  //   if (name === "") return;
  //   setTodos([
  //     ...todos,
  //     {
  //       id: uuidv4(),
  //       name: name,
  //       completed: false,
  //     },
  //   ]);
  //   todoinput.current.value = null;
  // }

  async function handleChange(id) {
    // const newTodos = [...todos];
    // let getItem = newTodos.find((getItem) => getItem.id === id);
    // getItem.completed = !getItem.completed;
    // setTodos(newTodos);
    const newBackend = [...backend];
    let getitem = newBackend.find((getitem) => getitem._id === id)
    const fetchDelete = await fetch(`${BASE_URL}deleteTodo`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: getitem._id })
    })
    setChange(!change)
  }

  // function handle() {
  //   handleChange(back._id)
  // }


  function clear() {
    const newBackend = backend.filter((back) => !back.completed);
    setBackend(newBackend);
  }

  return (
    <div className="h-full w-full p-5">
      <h1 className="text-center text-bold text-4xl p-5">
        Mern Stack Todo
      </h1>
      <form className="p-5 " onSubmit={putSaveTodo}>
        <input className=" p-5 mb-5 m w-full h-auto bg-gray-300 rounded" ref={todoinput} type="text" />
        <button className=" p-5 w-full h-auto bg-slate-600 rounded text-white">add todos</button>
      </form>
      {/* <button className="p-5 w-w/4 m-10  bg-slate-600 rounded text-white" onClick={putSaveTodo}>fetch put save</button> */}
      <ul className="text-xl m-5 p-5">
        {backend.map((back) => (
          <Todo key={back._id} handleChange={handleChange} todos={back} />
        ))}
      </ul>
      {/* <button className="bg-slate-600 rounded p-5 text-white m-10" onClick={clear}>clear completed</button> */}
    </div>
  );
}
export default App;
