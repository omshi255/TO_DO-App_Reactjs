import React from "react";
import TodoItem from "./TodoItem";
import { useNavigate } from "react-router-dom";

export default function TodoList({ todos, deleteTodo, toggleComplete, handleEdit }) {
  const navigate = useNavigate();
  const handleToggle = (todo) => {
    toggleComplete(todo.id); 
   
  };
  if (todos.length === 0)
    return <p className="text-center text-gray-500">No todos yet</p>;

  return (
    <div className="flex flex-col items-center space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleComplete={() => handleToggle(todo)} 
          handleEdit={(todo) => handleEdit(todo, navigate)}
        />
      ))}

      
    </div>
  );
}
