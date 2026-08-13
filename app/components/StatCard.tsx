type StatCardProps = {
  label: string;
  value: string;
  icon: string;
};

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-transparent rounded-2xl p-5 flex flex-col gap-1 transition-colors duration-300">
      <span className="text-2xl">{icon}</span>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-2xl font-bold text-white" dir="ltr">{value}</p>
    </div>
  );
}