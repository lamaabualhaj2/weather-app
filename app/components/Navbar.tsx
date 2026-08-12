type NavbarProps = {
  unit: "C" | "F";
  onToggleUnit: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  language: "en" | "ar";
  onToggleLanguage: () => void;
};

export default function Navbar({
  unit,
  onToggleUnit,
  theme,
  onToggleTheme,
  language,
  onToggleLanguage,
}: NavbarProps) {
  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-2">
        <span className="text-2xl">⛅</span>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">
          {language === "ar" ? "تطبيق الطقس" : "Weather App"}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleLanguage}
          className="text-sm font-medium text-slate-900 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg px-3 py-1.5 transition-colors"
        >
          {language === "en" ? "عربي" : "English"}
        </button>

        <button
          onClick={onToggleTheme}
          aria-label="Toggle dark mode"
          className="text-sm font-medium text-slate-900 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg px-3 py-1.5 transition-colors"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <button
          onClick={onToggleUnit}
          className="text-sm font-medium text-slate-900 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg px-3 py-1.5 transition-colors"
        >
          °{unit}
        </button>
      </div>
    </header>
  );
}