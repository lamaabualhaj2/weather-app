import React from "react";

type Suggestion = {
  name: string;
  country: string;
};

type SearchBarProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  placeholder?: string;
  searchLabel?: string;
  searchingLabel?: string;
  suggestions?: Suggestion[];
  onSelectSuggestion?: (name: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading,
  placeholder = "Search for a city",
  searchLabel = "Search",
  searchingLabel = "Searching...",
  suggestions = [],
  onSelectSuggestion,
}) => (
  <div className="relative w-full max-w-xl mx-auto">
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 shadow-sm transition-colors duration-200 hover:shadow-md"
    >
      <label htmlFor="city-search" className="sr-only">
        Search for a city
      </label>

      <input
        id="city-search"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isLoading}
        autoComplete="off"
        className="w-full h-20 sm:h-16 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-xl px-4 sm:px-5 text-base sm:text-lg disabled:cursor-not-allowed disabled:opacity-60"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center justify-center rounded-xl bg-slate-900 dark:bg-sky-600 text-white px-5 py-3 sm:px-6 sm:py-4 text-base sm:text-lg font-medium transition-colors duration-200 hover:bg-slate-800 dark:hover:bg-sky-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
      >
        {isLoading ? searchingLabel : searchLabel}
      </button>
    </form>

    {suggestions.length > 0 && (
      <ul className="absolute z-20 mt-2 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden">
        {suggestions.map((s, i) => (
          <li key={`${s.name}-${i}`}>
            <button
              type="button"
              onClick={() => onSelectSuggestion?.(s.name)}
              className="w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-colors"
            >
              {s.name}
              {s.country ? `, ${s.country}` : ""}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default SearchBar;