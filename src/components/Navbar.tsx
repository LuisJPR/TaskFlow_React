import { CheckCheck, CircleUserRound } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600">
            <CheckCheck size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              TaskFlow
            </h1>
            <p className="text-sm text-gray-400">Tu espacio de productividad</p>
          </div>
        </div>
        
        <button
          type="button"
          aria-label="Perfil de usuario"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-violet-500/50 hover:text-violet-300"
        >
          <CircleUserRound size={22} />
        </button>
      </div>
    </header>
  );
};
