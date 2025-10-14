import React, { useState, useEffect } from "react";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);

  // ----------- Logic Functions -----------
  const loadTodos = () => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to parse todos:", err);
      }
    }
    return [];
  };

  const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (text) => {
    if (!text.trim()) return;
    const newTodo = { id: Date.now(), text, completed: false };
    const updated = [...todos, newTodo];
    setTodos(updated);
    saveTodos(updated);
  };

  const deleteTodo = (id) => {
    const updated = todos.filter((todo) => todo.id !== id);
    setTodos(updated);
    saveTodos(updated);
  };

  const toggleComplete = (id) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
    saveTodos(updated);
  };

  const updateTodo = (id, newText) => {
    if (!newText.trim()) return;
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updated);
    saveTodos(updated);
  };

  // ----------- Load Todos on Mount -----------
  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
        updateTodo={updateTodo}
      />
    </div>
  );
}
