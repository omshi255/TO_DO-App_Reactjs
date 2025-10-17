
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoContext } from "../context/Todocontext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function TodoForm() {
  const { addTodo, updateTodo, editingTodo, setEditingTodo, todos } = useContext(TodoContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const initialValues = {
    title: "",
    text: "",
    date: "",
    time: "",
  };

  useEffect(() => {
    let todoToEdit = editingTodo;

    if (!todoToEdit && id) {
      todoToEdit = todos.find((t) => String(t.id) === String(id));
      setEditingTodo(todoToEdit || null);
    }
  }, [editingTodo, id, todos, setEditingTodo]);

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Title is required"),
    text: Yup.string()
      .min(5, "Description must be at least 5 characters")
      .required("Description is required"),
    date: Yup.date().nullable(),
    time: Yup.string().nullable(),
  });

  const handleSubmit = (values, { resetForm }) => {
    const { title, text, date, time } = values;
    const dateTime = date && time ? new Date(`${date}T${time}`) : null;

    if (editingTodo) {
      updateTodo(editingTodo.id, title, text, dateTime);
      setEditingTodo(null);
    } else {
      addTodo(title, text, dateTime);
    }

    resetForm();
    navigate("/list");
  };

  return (
    <div className="flex flex-col items-center mb-6 space-y-3">
      <Formik
        enableReinitialize
        initialValues={
          editingTodo
            ? {
                title: editingTodo.title,
                text: editingTodo.text,
                date: editingTodo.dateTime
                  ? new Date(editingTodo.dateTime).toISOString().split("T")[0]
                  : "",
                time: editingTodo.dateTime
                  ? new Date(editingTodo.dateTime).toTimeString().slice(0, 5)
                  : "",
              }
            : initialValues
        }
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col items-center space-y-3 w-full">
            <div className="w-2/5 flex flex-col">
              <Field
                type="text"
                name="title"
                placeholder="Title"
                className="p-3 rounded-lg border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="w-2/5 flex flex-col">
              <Field
                as="textarea"
                name="text"
                placeholder="Description"
                className="p-3 rounded-lg border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <ErrorMessage
                name="text"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="w-2/5 flex flex-col">
              <Field
                type="date"
                name="date"
                className="p-3 rounded-lg border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>

            <div className="w-2/5 flex flex-col">
              <Field
                type="time"
                name="time"
                className="p-3 rounded-lg border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-amber-400 text-white font-semibold rounded-lg hover:bg-amber-500 transition"
            >
              {editingTodo ? "Update Todo" : "Add Todo"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
