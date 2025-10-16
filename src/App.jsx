import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";
import Navbar from "./Components/NavBar";

export default function App () {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));   //change
  }, [todos]);

  const addTodo = (title, text, dateTime) => {
    if (!title.trim() || !text.trim()) return;
    const newTodo = { id: Date.now(), title, text, dateTime, completed: false };
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) =>
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

  const updateTodo = (id, title, text, dateTime) =>
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, text, dateTime } : todo
      )
    );

  const handleEdit = (todo, navigate) => {
    setEditingTodo({ ...todo, update: updateTodo });
    navigate("/add"); // navigate to form when editing
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-6">
        <Navbar />
        <Routes>
          <Route
            path="/add"
            element={
              <TodoForm
                addTodo={addTodo}
                editingTodo={editingTodo}
                setEditingTodo={setEditingTodo}
              />
            }
          />
          <Route
            path="/list"
            element={
              <TodoList
                todos={todos}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
                handleEdit={handleEdit}
              />
            }
          />
          <Route path="*" element={<Navigate to="/list" />} />
        </Routes>
      </div>
    </Router>
  );
}
