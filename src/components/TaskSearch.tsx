import { Search } from "lucide-react";

type TaskSearchProps = {
  value: string;
  onSearchChange: (value: string) => void;
};

export const TaskSearch = ({ value, onSearchChange }: TaskSearchProps) => {
  return (
    <div className="mt-6">
      <label
        htmlFor="task-search"
        className="mb-2 block text-sm font-medium text-gray-300"
      >
        Buscar tareas
      </label>

      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#191923] px-4">
        <Search size={20} className="shrink-0 text-gray-400" />
        <input
          id="task-search"
          type="search"
          value={value}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por titulo..."
          className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-500"
        />
      </div>
    </div>
  );
};
