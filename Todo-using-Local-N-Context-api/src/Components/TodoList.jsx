import React, { useState } from "react";
import { useTodo } from "../Context";

function TodoList() {
    const [input, setInput] = useState("");
    const [contentInput, setContentInput] = useState("");
    const [expandedId, setExpandedId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    const { todos, toggleisDone, toggleStatus, addTodo, clearTodo, updateTodo, removeTodo } = useTodo();

    const handleToggleStatus = (id) => {
      toggleStatus(id);
    };

    const AddToTodo = () => {
      if (input.trim()) {
        addTodo({ title: input, text: contentInput || "" });
        setInput("");
        setContentInput("");
      }
    };

    const Update = (id, title, text) => {
      updateTodo(id, { title, text });
      setEditingId(null);
      setEditTitle("");
      setEditContent("");
    };

    const Remove = (id) => {
      removeTodo(id);
      if (expandedId === id) {
        setExpandedId(null);
      }
    };

    const toggleExpand = (id) => {
      setExpandedId(expandedId === id ? null : id);
    };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Add Todo Section */}
      <div className="mb-4 p-4 bg-base-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Add New Todo</h2>
        
        {/* Title Input */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter todo title"
            className="input input-info input-bordered w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && input.trim()) {
                e.preventDefault();
                // Focus will shift to content input
              }
            }}
          />
        </div>

        {/* Content Input - enabled only when title has text (peer dependency) */}
        <div className="mb-3">
          <textarea
            placeholder="Enter todo description (optional)"
            className={`textarea textarea-info textarea-bordered w-full transition-opacity ${
              input.trim() ? "opacity-100" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!input.trim()}
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                AddToTodo();
              }
            }}
          />
          <p className="text-xs text-gray-500 mt-1">
            {input.trim() ? "Ctrl+Enter to add" : "Add a title first"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            className="btn btn-primary flex-1" 
            onClick={AddToTodo}
            disabled={!input.trim()}
          >
            Add Todo
          </button>
          <button 
            className="btn btn-error" 
            onClick={() => {
              clearTodo();
              setInput("");
              setContentInput("");
            }}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Todo List */}
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide font-semibold">
          Todos ({todos.length})
        </li>

        {/* Todo Items */}
        {todos.length === 0 ? (
          <li className="p-4 text-center text-gray-500">No todos yet. Add one to get started!</li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className={`border-b border-base-300 transition-all ${
                expandedId === todo.id ? "bg-base-200" : ""
              }`}
            >
              {/* Collapse Header */}
              <div className="flex items-center gap-4 p-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  className="checkbox checkbox-md checkbox-success"
                  onChange={() => toggleisDone(todo.id)}
                />

                {/* Todo Info */}
                <div
                  className="flex-1 cursor-pointer hover:bg-base-300 p-2 rounded transition-colors"
                  onClick={() => toggleExpand(todo.id)}
                >
                  <div className={`font-semibold ${todo.isDone ? "line-through opacity-50" : ""}`}>
                    {todo.title}
                  </div>
                  {todo.isDone ? (
                    <div className="text-xs uppercase font-semibold opacity-60 text-success">
                      ✓ Done
                    </div>
                  ) : (
                    <div
                      className="text-xs uppercase font-semibold opacity-60 cursor-pointer hover:opacity-100 text-warning"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus(todo.id);
                      }}
                    >
                      {todo.currentStatus}
                    </div>
                  )}
                </div>

                {/* Expand/Collapse Icon */}
                <button
                  className={`btn btn-ghost btn-sm transition-transform ${
                    expandedId === todo.id ? "rotate-180" : ""
                  }`}
                  onClick={() => toggleExpand(todo.id)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
              </div>

              {/* Expanded Content */}
              {expandedId === todo.id && (
                <div className="px-4 pb-4 bg-base-200 rounded-b-lg">
                  {editingId === todo.id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Edit Title</label>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="input input-bordered w-full"
                          placeholder="Edit title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Edit Description</label>
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="textarea textarea-bordered w-full"
                          placeholder="Edit description"
                          rows="3"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => Update(todo.id, editTitle, editContent)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <p className="text-sm mb-4">
                        <strong>Description:</strong> {todo.text || "No description"}
                      </p>

                      <div className="flex gap-2">
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => {
                            setEditingId(todo.id);
                            setEditTitle(todo.title);
                            setEditContent(todo.text);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => Remove(todo.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;
