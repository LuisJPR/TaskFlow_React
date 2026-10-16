import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import type { Task } from "../types/task";

type TaskFormProps = {
  onAddTask: (taskData: Omit<Task, "id" | "createdAt" | "completed">) => void; // Contiene la tarea a guardar
  taskToEdit: Task | null; // Contiene la tarea que se quiere editar, o null cuando creamos una nueva
  onUpdateTask: (
    taskId: string,
    taskData: Omit<Task, "id" | "createdAt" | "completed">,
  ) => void; // Permite guardar los cambios de una tarea existente
  onCancelEdit: () => void; // Permite salir del modo edición sin guardar
};

export const TaskForm = ({
  onAddTask,
  taskToEdit,
  onUpdateTask,
  onCancelEdit,
}: TaskFormProps) => {
  // Estado para almacenar lo que escribe el usuario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Estudio");
  const [priority, setPriority] = useState("Media");
  const [dueDate, setDueDate] = useState("");
  // Estado para controlar si el formulario esta visible
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Evita cargar datos cuando no hay ninguna tarea seleccionada
    if (!taskToEdit) return;

    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setCategory(taskToEdit.category);
    setPriority(taskToEdit.priority);
    setDueDate(taskToEdit.dueDate);

    // Abre el modal cuando recibimos una tarea para editar
    setIsOpen(true);
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Evita que el navegador recargue la pagina
    e.preventDefault();

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      category: category as Task["category"],
      priority: priority as Task["priority"],
      dueDate,
    };

    if (taskToEdit) {
      // Actualizamos la tarea existente
      onUpdateTask(taskToEdit.id, taskData);
    } else {
      // Creamos una tarea nueva
      onAddTask(taskData);
    }

    closeForm();
  };

  const closeForm = () => {
    // Cerramos el modal
    setIsOpen(false);
    // Salimos del modo edicion, si lo habia
    onCancelEdit();

    // Limpiamos los campos
    setTitle("");
    setDescription("");
    setCategory("Estudio");
    setPriority("Media");
    setDueDate("");
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Mis tareas</h3>
          <p className="mt-1 text-sm text-gray-400">
            Organiza tus actividades y mantén el control.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
        >
          <Plus size={18} />
          Nueva tarea
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            // Permite cerrar el modal al pulsar el fondo
            if (event.target === event.currentTarget) {
              closeForm();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-form-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#191923] p-5 shadow-2xl sm:p-7"
          >
            {/* Encabezado */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3
                  id="task-form-title"
                  className="text-xl font-semibold text-white"
                >
                  Nueva tarea
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  Completa los datos de tu actividad.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Cerrar formulario"
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Título *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej. Terminar proyecto de React"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#101018] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-violet-500"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Descripción
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Añade detalles sobre la tarea..."
                  rows={3}
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#101018] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Categoría
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#101018] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
                  >
                    <option value="Trabajo">Trabajo</option>
                    <option value="Estudio">Estudio</option>
                    <option value="Personal">Personal</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="priority"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Prioridad
                  </label>
                  <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#101018] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
                  >
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="dueDate"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Fecha límite
                  </label>
                  <input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#101018] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
                    style={{ colorScheme: "dark" }}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
                >
                  Crear tarea
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
};
