import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleStatus, toggleisDone, addTodo, clearTodo, updateTodo, removeTodo } from "../features/Todo/todoSlice";


function TodoList() {

    const [input, setInput] = useState("")

    const todos = useSelector((state) => state.todos.todos);
    const dispatch = useDispatch();

    const handleToggleStatus = (id) => {
        dispatch(toggleStatus(id));
    };

    const AddToTodo = () => { 
        if (input.trim()) {
            dispatch(addTodo(input));
            setInput(""); // Clear input after adding
        }
    }

    const Update = (id, text) => {
      dispatch(updateTodo({ id, text }));
    };

    const Remove = (id) => {
      dispatch(removeTodo(id));
    };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex gap-2 mb-4">
        {/*Input field to add new todo*/}
        <input
          type="text"
          placeholder="Add new todo"
          className="input input-info flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && AddToTodo()}
        />
        <button
          className="btn btn-primary"
          onClick={AddToTodo}
        >
          Add Todo
        </button>
        <button
          className="btn btn-error"
          onClick={() => dispatch(clearTodo())}
        >
          Clear All
        </button>
      </div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Todo List</li>

        {/* Todo Item Loop */}
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="collapse collapse-plus border-b border-base-300"
          >
            <input type="checkbox" />
            <div className="collapse-title list-row">
              <div>
                <div className="font-semibold">{todo.title}</div>
                {todo.isDone ? (
                  <div className="text-xs uppercase font-semibold opacity-60">
                    Done
                  </div>
                ) : (
                  <div
                    className="text-xs uppercase font-semibold opacity-60 cursor-pointer hover:opacity-100"
                    onClick={() => handleToggleStatus(todo.id)}
                  >
                    {todo.currentStatus}
                  </div>
                )}
              </div>
            </div>
            <div className="collapse-content text-sm px-4 pb-4">
              <p className="mb-3">{todo.text || "No description added yet."}</p>
              <div className="flex gap-2 items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={todo.isDone}
                    className="checkbox checkbox-md checkbox-success"
                    onChange={() => dispatch(toggleisDone(todo.id))}
                  />
                  <span className="text-xs">Mark as done</span>
                </label>
                <button className="btn btn-info btn-sm" onClick={() => {
                  const newText = prompt("Edit todo title:", todo.title);
                  if (newText) Update(todo.id, newText);
                }}>
                  Edit
                </button>
                <button className="btn btn-error btn-sm" onClick={() => Remove(todo.id)}>
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;