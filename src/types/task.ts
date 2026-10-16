export type Task = {
  id: string;
  title: string;
  description: string;
  category: "Trabajo" | "Estudio" | "Personal" | "Otros";
  priority: "Baja" | "Media" | "Alta";
  dueDate: string;
  completed: boolean;
  createdAt: string;
};
