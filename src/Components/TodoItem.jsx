import React, { useState } from "react";

export default function TodoItem({ todo, deleteTodo, toggleComplete, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    updateTodo(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <input value={editText} onChange={(e) => setEditText(e.target.value)} />
      ) : (
        <span
          style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
          onClick={() => toggleComplete(todo.id)}
        >
          {todo.text}
        </span>
      )}

      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}
