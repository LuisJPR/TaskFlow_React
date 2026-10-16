import type { Task } from "../types/task";

type CategoryFilter = "Todas" | Task["category"];
type PriorityFilter = "Todas" | Task["priority"];

type TaskAttributeFiltersProps = {
  category: CategoryFilter;
  priority: PriorityFilter;
  onCategoryChange: (value: CategoryFilter) => void;
  onPriorityChange: (value: PriorityFilter) => void;
};

export const TaskAttributeFilters = ({
  category,
  priority,
  onCategoryChange,
  onPriorityChange,
}: TaskAttributeFiltersProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Categoria */}
      <div>
        <label
          htmlFor="category-filter"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Categoría
        </label>

        <select
          id="category-filter"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as CategoryFilter)}
          className="w-full rounded-xl border border-white/10 bg-[#191923] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
        >
          <option value="Todas">Todas las categorías</option>
          <option value="Trabajo">Trabajo</option>
          <option value="Estudio">Estudio</option>
          <option value="Personal">Personal</option>
          <option value="Otros">Otros</option>
        </select>
      </div>

      {/* Prioridad */}
      <div>
        <label
          htmlFor="priority-filter"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Prioridad
        </label>

        <select
          id="priority-filter"
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value as PriorityFilter)}
          className="w-full rounded-xl border border-white/10 bg-[#191923] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
        >
          <option value="Todas">Todas las prioridades</option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
      </div>
    </div>
  );
};
