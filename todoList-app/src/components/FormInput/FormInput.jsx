// 1) Crear el state task
// 2) Crear el formulario con las etiquetas form
// 3) Crear el input para llenar los datos
// 4) Crear el input del botón
// 5) Crear el handleFromSubmit
// 6) Crear el handleInputChange
// 6) Instalar la librería uuid cuando creamos el objeto del task
// 7) Primero probar con un console.log los task que se crean, luego
// 8) Volver al TaskListContainer para desarrollar el handleAddTask

import { useState } from "react";
import { v4 as uuid } from "uuid";
export const FormInput = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleFromSubmit = (e) => {
    e.preventDefault(); // prevenimos la recarga de la página luego del evento
    const newTask = {
      
      task,
      
    };
    // console.log(newTask);
    // setTask(""); // Agregar el value en el input para usarlo
    addTask(newTask);
  };

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  return (
    <form className="d-flex col" onSubmit={handleFromSubmit}>
      <input
        type="text"
        className="form-control border border-2 border-black"
        placeholder="Ingrese el texto aquí"
        onChange={handleInputChange}
      />
      <input type="submit" className="btn btn-primary mx-2" value="Agregar" />
    </form>
  );
};
