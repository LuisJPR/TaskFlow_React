type TaskStatusFilterProps = {
  value: "Todas" | "Pendientes" | "Completadas";
  onFilterChange: (value: "Todas" | "Pendientes" | "Completadas") => void;
};

export const TaskStatusFilter = ({
  value,
  onFilterChange,
}: TaskStatusFilterProps) => {
  const options: TaskStatusFilterProps["value"][] = [
    "Todas",
    "Pendientes",
    "Completadas",
  ];

  return (
    <div>
      <label 
        htmlFor="task-status-filter"
        className="mb-2 block text-sm font-medium text-gray-300"
      >
        Estado de las tareas
      </label>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onFilterChange(option)}
            aria-pressed={value === option}
            className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
              value === option
                ? "border-violet-500/50 bg-violet-500/15 text-violet-300"
                : "border-white/10 bg-[#191923] text-gray-400 hover:border-white/20 hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
