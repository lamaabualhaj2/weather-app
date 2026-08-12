type ForecastDay = {
  day: string;
  high: string;
  low: string;
  condition: string;
  icon: string;
};

type ForecastTableProps = {
  data: ForecastDay[];
};

export default function ForecastTable({ data }: ForecastTableProps) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-transparent rounded-2xl overflow-hidden transition-colors duration-300">
      <div className="grid grid-cols-3 px-6 py-3 text-sm text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
        <span>Day</span>
        <span>High/Low</span>
        <span>Condition</span>
      </div>

      {data.map((item) => (
        <div
          key={item.day}
          className="grid grid-cols-3 items-center px-6 py-4 border-b border-slate-200 dark:border-slate-700 last:border-0 text-slate-900 dark:text-white"
        >
          <span>{item.day}</span>
          <span className="text-slate-500 dark:text-slate-400">
            {item.high} / {item.low}
          </span>
          <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            {item.condition} <span className="text-lg">{item.icon}</span>
          </span>
        </div>
      ))}
    </div>
  );
}