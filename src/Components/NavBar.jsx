import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-center mb-6 space-x-4">
      <Link
        to="/add"
        className="px-4 py-2 bg-amber-400 text-white font-semibold rounded-lg hover:bg-amber-500 transition"
      >
        Add Todo
      </Link>
      <Link
        to="/list"
        className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition"
      >
        Todo List
      </Link>
    </nav>
  );
}
