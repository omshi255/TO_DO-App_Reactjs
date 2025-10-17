import React, { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../context/Todocontext";

export default function TodoList() {
  const { todos, deleteTodo, toggleComplete, setEditingTodo } = useContext(TodoContext);

  if (todos.length === 0)
    return <p className="text-center text-gray-500 mt-10">No todos yet</p>;

  return (
    <div className="flex flex-col items-center space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          handleEdit={setEditingTodo}
        />
      ))}
    </div>
  );
}
