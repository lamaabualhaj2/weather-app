import React from "react";

type SearchBarProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading,
}) => (
  <form
    onSubmit={onSubmit}
    className="w-full max-w-xl mx-auto flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 shadow-sm transition-colors duration-200 hover:shadow-md"
  >
    <label htmlFor="city-search" className="sr-only">
      Search for a city
    </label>

    <input
      id="city-search"
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search for a city"
      disabled={isLoading}
      className="w-full h-20 sm:h-16
   bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-xl px-4 sm:px-5 text-base sm:text-lg disabled:cursor-not-allowed disabled:opacity-60"
    />

    <button
      type="submit"
      disabled={isLoading}
      className="inline-flex items-center justify-center rounded-xl bg-slate-900 dark:bg-sky-600 text-white px-5 py-3 sm:px-6 sm:py-4 text-base sm:text-lg font-medium transition-colors duration-200 hover:bg-slate-800 dark:hover:bg-sky-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
    >
      {isLoading ? "Searching..." : "Search"}
    </button>
  </form>
);

export default SearchBar;