import React from "react";
import { useNavigate } from "react-router-dom";

export default function TodoItem({ todo, deleteTodo, toggleComplete, handleEdit }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-3/4 bg-gray-100 p-4 rounded-lg shadow-md space-y-2">
      <div className="flex justify-between items-center">
        <h3
          onClick={() => toggleComplete(todo.id)}
          className={`font-semibold text-lg cursor-pointer ${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.title}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              handleEdit(todo);
              navigate("/add");
            }}
            className="px-3 py-1 bg-green-400 text-white rounded-lg hover:bg-green-500 transition"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="px-3 py-1 bg-red-400 text-white rounded-lg hover:bg-red-500 transition"
          >
            Delete
          </button>
        </div>
      </div>
      <p className={todo.completed ? "line-through text-gray-400" : "text-gray-700"}>
        {todo.text}
      </p>
      {todo.dateTime && (
        <p className="text-sm text-gray-500">
          {new Date(todo.dateTime).toLocaleString()}
        </p>
      )}
      <div className="flex items-center space-x-2">
        <label htmlFor={`${todo.id}`}>Mark Done</label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="w-5 h-5 text-amber-400 border-red-700 rounded-lg focus:ring-amber-300"
          id={`${todo.id}`}
        />
      </div>
    </div>
  );
}
