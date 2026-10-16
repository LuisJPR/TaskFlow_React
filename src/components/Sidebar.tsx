import { LayoutDashboard, ListTodo, Clock3, CircleCheck } from "lucide-react";

// Definimos las opciones del menú.
// Cada opción tiene una etiqueta y un identificador único.
const menuItems = [
  {
    label: "Resumen",
    id: "resumen",
    icon: LayoutDashboard,
  },
  {
    label: "Todas las tareas",
    id: "todas",
    icon: ListTodo,
  },
  {
    label: "Pendientes",
    id: "pendientes",
    icon: Clock3,
  },
  {
    label: "Completadas",
    id: "completadas",
    icon: CircleCheck,
  },
] as const;

// Tipado de las propiedades que recibe el Sidebar.
type SidebarProps = {
  activeItem: (typeof menuItems)[number]["id"];
  onNavigate: (item: SidebarProps["activeItem"]) => void;
};

export const Sidebar = ({ activeItem, onNavigate }: SidebarProps) => {
  return (
    <aside className="w-full border-b border-white/10 p-4 md:min-h-[calc(100vh-73px)] md:w-64 md:border-r md:border-b-0">
      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
        Menú principal
      </p>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-violet-600/15 text-violet-300"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
