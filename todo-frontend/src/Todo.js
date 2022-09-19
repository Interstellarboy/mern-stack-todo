import React from "react";
import deleteIcon from "./delete.png"

function Todo({ todos, handleChange }) {
  function handle() {
    handleChange(todos._id);
  }

  return (
    <div>
      <label key={todos._id}>
        <input className="m-5"
          type="checkbox"
          onChange={handle}
          checked={todos.completed}
          id="check"
        ></input>
        {todos.content}
        <img className="inline m-2 w-8 cursor-pointer" onClick={handle} src={deleteIcon} alt="" />
      </label>
    </div>
  );
}

export default Todo;
