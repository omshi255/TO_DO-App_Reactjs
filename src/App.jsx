import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar.jsx";
import TodoList from "./Components/TodoList.jsx";
import TodoForm from "./Components/TodoForm.jsx";
import { TodoProvider } from "./context/Todocontext.jsx";

export default function App() {
  return (
    <TodoProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/add" element={<TodoForm />} />
            <Route path="/list" element={<TodoList />} />
            <Route path="*" element={<TodoList />} />
          </Routes>
        </div>
      </Router>
    </TodoProvider>
  );
}
