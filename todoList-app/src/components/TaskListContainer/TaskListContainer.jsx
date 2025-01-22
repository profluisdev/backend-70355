
import { useEffect, useState } from "react";
import { FormInput } from "../FormInput/FormInput";
import { TaskList } from "../TaskList/TaskList";

export const TaskListContainer = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = async (task) => {
    const newTask = await fetch("http://localhost:8080/api/task", {
      method: "POST",
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({task})

    })
    setTasks([...tasks, task]);
  };

  const handleChangeStatus = async (id) => {
    console.log(id);
    await fetch(`http://localhost:8080/api/task/${id}`, {
      method: "PUT",
      headers: {
         'Content-Type': 'application/json'
      },

    })
    // Buscamos la posición indice de la tarea
    const index = tasks.findIndex((task) => task.id === id);
    // Hacemos una copia de las tareas para no modificar la original 
    const updateTask = [...tasks];
    // console.log(updateTask[index])
    // Modificamos el estado de la tarea
    updateTask[index] = {
      ...updateTask[index],
      status: !updateTask[index].status 
    }
    setTasks([...updateTask]);
  };

  const handleDeleteTask = (id) => {
    const taskFilter = tasks.filter((task) => task.id !== id);
    setTasks(taskFilter);
  };

  const getTasks = async () => {
    const tasks = await fetch("http://localhost:8080/api/task");
    const data = await tasks.json();
    setTasks(data.payload)
    console.log(data);
  }

  // Traer los task del localStorage
  useEffect(() => {
    getTasks()
    // let lsTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // if (lsTasks.length > 0) {
    //   setTasks(lsTasks);
    // }
  }, []);

  // Guardar los task cuando se modifique el localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
  }, [tasks]);

  return (
    <div className="d-flex flex-column col-6">
      <FormInput addTask={handleAddTask} />
      <TaskList tasks={tasks} changeStatus={handleChangeStatus} deleteTask={handleDeleteTask}/>
    </div>
  );
};
