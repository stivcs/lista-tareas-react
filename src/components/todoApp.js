import { useState } from "react";
import Todo from "./todo";

import "./todoApp.css";

export default function TodoApp() {
  const [title, setTitle] = useState(""); //creamos el hooke de estado para el titulo de la tarea
  const [todos, setTodos] = useState([]); // hooke de estado para el arreglo de todas las tareas
  // const [editItem, setEditItem] = useState(null);

  function handleChange(e) {
    setTitle(e.target.value); //le damos el valor al titulo o la tarea
  }

  function handleSubmit(e) {
    e.preventDefault(); //se previene que el evento siga con sus eventos normales

    const newTodo = {  //estamos creando una nueva tarea
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    };

    const actTodo = [...todos]; //obtenemos el arreglo de todas las tareas
    actTodo.push(newTodo); //agregamos al final la nueva tarea

    setTodos(actTodo); //actualizamos todo el arreglo de tareas
    setTitle(""); // hace que se borre despues de agregar
  }

  function handleDelete(id) {
    const tempTodos = todos.filter((item) => item.id !== id);

    setTodos([...tempTodos]);
  }

  function handleUpdate(id, value) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.title = value;
    setTodos([...temp]);
  }

  function handleCheckboxChange(id, status) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.completed = status;

    console.log("Holis");
    setTodos([...temp]);
  }

  return (
    <div className="container">
      <div className="todoContainer">
        <form onSubmit={handleSubmit} className="todoCreateForm">
          <input
            onChange={handleChange}
            value={title}
            className="todoInput"
          />
          <input value="Create todo" type={"submit"} className="buttonCreate" />
        </form>

        <div className="todosContainer">
          {todos.map((item) => (  //iteramos sobre todos los elementos de un arreglo
            <Todo
              key={item.id}
              item={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onComplete={handleCheckboxChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}