import React, { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();
// created new context to share todo data globally

export const TodoProvider = ({ children }) => {  //context provider component to wrap the whole app and manage tools
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => { //this one will load the existing todo when app starts
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
 // save current todo arrays into local storage
  const saveToLocalStorage = (data) => {
    localStorage.setItem("todos", JSON.stringify(data)); //convert array data to json strings and save
  };

  const addTodo = (title, text, dateTime) => {
    if (!title.trim()) {
      window.alert("title should not be compty..!");
      return;
    }
    if (!text.trim()) {
      window.alert("Description shoulf not be empty...!");
      return;
    }

    const newTodo = {
      id: Date.now(),
      title,
      text,
      dateTime,
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
    window.alert("Todo added successfully!");
  };

  const deleteTodo = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this Todo?");
    if (confirmed) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      saveToLocalStorage(updatedTodos);
      window.alert("Todo deleted successfully!");
    }
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  const updateTodo = (id, title, text, dateTime) => {
    if (!title.trim()) {
      window.alert("Title is required!");
      return;
    }

    const confirmUpdate = window.confirm("Are you sure you want to update this Todo?");
    if (!confirmUpdate) return;

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title, text, dateTime } : todo
    );
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
    window.alert("Todo updated successfully!");
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleComplete,
        updateTodo,
        editingTodo,
        setEditingTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
