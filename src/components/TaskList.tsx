import { Circle, CircleCheck, Trash2 } from "lucide-react";
import type { Task } from "../types/task";

type TaskListProps = {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
};

export const TaskList = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <section className="mt-6 rounded-2xl border border-dashed border-white/10 bg-[191923]/50 px-6 py-12 text-center">
        <h3 className="text-lg font-semibold text-white">
          Todavía no tienes tareas
        </h3>
        <p className="mt-2 text-sm text-gray-400">
          Crea tu primera tarea para empezar a organizarte.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {tasks.map((task) => (
        <article
          key={task.id}
          className="rounded-2xl border border-white/10 bg-[#191923] p-5"
        >
          {/* Titulo y descripcion */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className={`font-semibold ${task.completed ? "text-gray-500 line-through" : "text-white"}`}
              >
                {task.title}
              </h3>

              {task.description && (
                <p className="mt-2 text-sm text-gray-400">{task.description}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => onToggleTask(task.id)}
              aria-pressed={task.completed}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                task.completed
                  ? "bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20"
                  : "bg-amber-400/10 text-amber-300 hover:bg-amber-400/20"
              }`}
            >
              {task.completed ? (
                <CircleCheck size={15} />
              ) : (
                <Circle size={15} />
              )}

              {task.completed ? "Completada" : "Pendiente"}
            </button>
          </div>

          {/* Etiquetas */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-lg bg-white/5 px-3 py-1.5 text-gray-300">
              {task.category}
            </span>

            <span className="rounded-lg bg-white/5 px-3 py-1.5 text-gray-300">
              Prioridad: {task.priority}
            </span>

            {task.dueDate && (
              <span className="rounded-lg bg-white/5 px-3 py-1.5 text-gray-300">
                Fecha límite: {task.dueDate}
              </span>
            )}
          </div>

          {/* Botones */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onDeleteTask(task.id)}
              aria-label={`Eliminar tarea ${task.title}`}
              className="inline-flex items-center gap-2 rounded-lg border border-red-400/20 px-3 py-2 text-sm text-red-300 transition-colors hover:bg-red-400/10"
            >
              <Trash2 size={16} />
              Eliminar
            </button>

            <button
              type="button"
              onClick={() => onEditTask(task)}
              className="inline-flex items-center gap-2 rounded-lg border border-violet-400/20 px-3 py-2 text-sm text-violet-300 transition-colors hover:bg-violet-400/10"
            >
              Editar
            </button>
          </div>
        </article>
      ))}
    </section>
  );
};
