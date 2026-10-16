import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { SummaryCard } from "./components/SummaryCard";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { TaskSearch } from "./components/TaskSearch";
import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import type { Task } from "./types/task";

import {
  Layers3,
  Clock3,
  CircleCheck,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import { TaskStatusFilter } from "./components/TaskStatusFilter";
import { TaskAttributeFilters } from "./components/TaskAttributeFilters";


export const App = () => {

  const { tasks, addTask, toggleTask, deleteTask, updateTask, totalTasks, pendingTasks, completedTasks, progress } = useTasks();

  // Estado para almacenar temporalmente la tarea a editar
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  // Estado para almacenar el texto que el usuario escriba en el buscador
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para almacenar el filtro del estado de una tarea
  const [statusFilter, setStatusFilter] = useState<"Todas" | "Pendientes" | "Completadas">("Todas");
  const [categoryFilter, setCategoryFilter] = useState<"Todas" | Task["category"]>("Todas");
  const [priorityFilter, setPriorityFilter] = useState<"Todas" | Task["priority"]>("Todas");
  // Estado para el manejo del Sidebar
  const [activeItem, setActiveItem] = useState<"resumen" | "todas" | "pendientes" | "completadas">("resumen");

  // Funcion para guardar temporalmente la tarea a editar
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
  };

  // Funcion para el buscador y filtro
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesStatus =
      statusFilter === "Todas" ||
      (statusFilter === "Pendientes" && !task.completed) ||
      (statusFilter === "Completadas" && task.completed);

    const matchesCategory =
      categoryFilter === "Todas" ||
      task.category === categoryFilter;

    const matchesPriority =
      priorityFilter === "Todas" ||
      task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  // Navegacion del Sidebar
  const handleNavigate = (
    item: "resumen" | "todas" | "pendientes" | "completadas"
  ) => {
    // Actualizamos la sección seleccionada.
    setActiveItem(item);

    // Aplicamos el filtro de estado correspondiente.
    if (item === "pendientes") {
      setStatusFilter("Pendientes");
    } else if (item === "completadas") {
      setStatusFilter("Completadas");
    } else {
      setStatusFilter("Todas");
    }

    // Limpiamos los filtros anteriores al navegar.
    setCategoryFilter("Todas");
    setPriorityFilter("Todas");
    setSearchTerm("");

    // Cancelamos cualquier edición que estuviera abierta.
    setTaskToEdit(null);
  };

  return (
    <div className="min-h-screen bg-[#101018]">
      <Navbar />

      <div className="md:flex">
        <Sidebar 
          activeItem={activeItem}
          onNavigate={handleNavigate}
        />

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {/* Titulo y descripcion */}
          <div className="border-b border-white/10 pb-6">
            <h2 className="text-2xl font-bold text-white">Mi espacio</h2>
            <p className="mt-2 text-gray-400">Organiza tus actividades de hoy.</p>
          </div>
          
          {/* Tarjetas de resumen */}
          {activeItem === "resumen" && (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                title="Total de tareas"
                value={totalTasks}
                icon={Layers3}
                color="text-violet-400"
              />

              <SummaryCard
                title="Pendientes"
                value={pendingTasks}
                icon={Clock3}
                color="text-amber-400"
              />

              <SummaryCard
                title="Completadas"
                value={completedTasks}
                icon={CircleCheck}
                color="text-emerald-400"
              />

              <SummaryCard
                title="Progreso"
                value={`${progress}%`}
                icon={ChartNoAxesColumnIncreasing}
                color="text-blue-400"
              />
            </div>
          )}

          {/* Formulario */}
          <div className="mt-6">
            <TaskForm
              onAddTask={addTask}
              taskToEdit={taskToEdit}
              onUpdateTask={updateTask}
              onCancelEdit={() => setTaskToEdit(null)}
            />
          </div>

          {/* Buscador */}
          <TaskSearch value={searchTerm} onSearchChange={setSearchTerm} />

          {/* Filtros */}
          <div className="mt-4 grid grid-cols-1 items-end gap-4 md:grid-cols-3 lg:items-end">
            {/* Filtro por estado */}
            <div className="min-w-0">
              <TaskStatusFilter
                value={statusFilter}
                onFilterChange={setStatusFilter}
              />
            </div>

            {/* Filtro por categoria y prioridad */}
            <div className="min-w-0 lg:col-span-2">
              <TaskAttributeFilters 
                category={categoryFilter}
                priority={priorityFilter}
                onCategoryChange={setCategoryFilter}
                onPriorityChange={setPriorityFilter}
              />
            </div>
          </div>
          
          <h3 className="mb-4 mt-8 text-lg font-semibold text-white">
            {activeItem === "resumen"
              ? "Tus tareas"
              : activeItem === "pendientes"
                ? "Tareas pendientes"
                : activeItem === "completadas"
                  ? "Tareas completadas"
                  : "Todas las tareas"}
          </h3>

          {/* Lista de tareas */}
          <TaskList
            tasks={filteredTasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onEditTask={handleEditTask}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
