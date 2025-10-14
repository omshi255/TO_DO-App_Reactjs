import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, deleteTodo, toggleComplete, updateTodo }) {
  if (todos.length === 0) return <p>No tasks yet!</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
}
