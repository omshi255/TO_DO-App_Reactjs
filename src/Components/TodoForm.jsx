import React, { useContext, useState, useEffect } from "react";
import { TodoContext } from "../context/Todocontext";
import { useNavigate, useParams } from "react-router-dom";

export default function TodoForm() {
  const { addTodo, updateTodo, editingTodo, setEditingTodo, todos } = useContext(TodoContext);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

useEffect(() => {
  let todoToEdit = editingTodo;

  if (!todoToEdit && id) {
    todoToEdit = todos.find(t => String(t.id) === String(id));
    setEditingTodo(todoToEdit || null);
  }

  if (todoToEdit) {
    setTitle(todoToEdit.title);
    setText(todoToEdit.text);
    if (todoToEdit.dateTime) {
      const dt = new Date(todoToEdit.dateTime);
      setDate(dt.toISOString().split("T")[0]);
      setTime(dt.toTimeString().split(" ")[0].slice(0, 5));
    }
  } else {
    setTitle("");
    setText("");
    setDate("");
    setTime("");
  }
}, [editingTodo, id, todos, setEditingTodo]);

const handleSubmit = (e) => {
  e.preventDefault();

  const dateTime = date && time ? new Date(`${date}T${time}`) : null;

  if (editingTodo) {
    updateTodo(editingTodo.id, title, text, dateTime);
    setEditingTodo(null);
  } else {
    addTodo(title, text, dateTime);
  }

  setTitle("");
  setText("");
  setDate("");
  setTime("");

  navigate("/list"); 
};


  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center mb-6 space-y-3"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-2/5 p-3 rounded-lg border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
        required
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Description"
        className="w-2/5 p-3 rounded-lg border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-2/5 p-3 rounded-lg border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-2/5 p-3 rounded-lg border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-amber-400 text-white font-semibold rounded-lg hover:bg-amber-500 transition"
      >
        {editingTodo ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
}
