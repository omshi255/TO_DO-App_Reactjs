
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function TodoForm({ addTodo, editingTodo, setEditingTodo }) {

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setText(editingTodo.text);
      if (editingTodo.dateTime) {
        const dt = new Date(editingTodo.dateTime);
        setDate(dt.toISOString().split("T")[0]);
        setTime(dt.toTimeString().split(" ")[0].slice(0, 5));
      }
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateTime = date && time ? new Date(`${date}T${time}`) : null;

    if (editingTodo) {
      editingTodo.update(editingTodo.id, title, text, dateTime);
      setEditingTodo(null);
    } else {
      addTodo(title, text, dateTime);
    }

    setTitle("");
    setText("");
    setDate("");
    setTime("");
     navigate("/todos");
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
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Description"
        className="w-2/5 p-3 rounded-lg border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
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
