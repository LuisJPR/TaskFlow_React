import type { LucideIcon } from "lucide-react";

type SummaryCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
};

export const SummaryCard = ({
  title,
  value,
  icon: Icon,
  color,
}: SummaryCardProps) => {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#191923] p-5 transition-colors hover:border-white/20">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">{title}</span>
        <div className={`rounded-xl bg-white/5 p-2 ${color}`}>
          <Icon size={22} />
        </div>
      </div>

      <p className="mt-5 text-3xl font-bold tracking-tight text-white">
        {value}
      </p>
    </article>
  );
};
