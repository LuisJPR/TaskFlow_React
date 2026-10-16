import { useEffect, useState } from "react";
import type { Task } from "../types/task";

export const useTasks = () => {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      // Buscamos las tareas guardadas en el navegador
      const savedTasks = localStorage.getItem("taskflow-tasks");
      // Si existen, las convertimos de texto a un arreglo
      // Si no existem empezamos con una lista vacia
      return savedTasks ? (JSON.parse(savedTasks) as Task[]) : [];
    } catch (error) {
      console.error("Error al recuperar las tareas:", error);
      return [];
    }
  });

  // Guardamos las tareas cada vez que cambia su estado.
  useEffect(() => {
    // Convertimos las tareas a texto y las guardamos
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Funcion para agregar tareas
  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "completed">) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  // Funcion para marcar tarea como completada
  const toggleTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // Funcion para eliminar una tarea
  const deleteTask = (taskId: string) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar esta tarea?",
    );

    if (!confirmed) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  };

  // Funcion para editar una tarea
  const updateTask = (
    taskId: string,
    taskData: Omit<Task, "id" | "createdAt" | "completed">,
  ) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, ...taskData } : task,
      ),
    );
  };

  // Total de tareas registradas
  const totalTasks = tasks.length;

  // Tareas que todavia no se han completado
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  // Tareas que ya se completaron
  const completedTasks = tasks.filter((task) => task.completed).length;

  // Porcentaje de progreso general
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Exponemos los datos y las operaciones que necesita la interfaz.
  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    totalTasks,
    pendingTasks,
    completedTasks,
    progress
  };
};
