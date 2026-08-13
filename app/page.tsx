"use client";

import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";
import ForecastTable from "./components/ForecastTable";
import { useTheme } from "./hooks/useTheme";
import WeatherBackground from "./components/WeatherBackground";
import { translations, Language } from "./lib/translations";

type WeatherData = {
  city: string;
  country: string;
  current: {
    temperature_2m: number;
    temperature_2m_f: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    apparent_temperature_f: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_max_f: number[];
    temperature_2m_min: number[];
    temperature_2m_min_f: number[];
    weather_code: number[];
  };
};

const weatherCodeToIcon = (code: number): string => {
  if (code === 0) return "☀️";
  if (code <= 2) return "⛅";
  if (code === 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  return "⛈️";
};

const dayName = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
};

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unit, setUnit] = useState<"C" | "F">("F");
  const [language, setLanguage] = useState<Language>("en");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const { theme, toggleTheme } = useTheme();

  const t = translations[language];

  const weatherCodeToText = (code: number): string => {
    if (code === 0) return t.sunny;
    if (code <= 2) return t.partlyCloudy;
    if (code === 3) return t.cloudy;
    if (code <= 67) return t.rainy;
    return t.stormy;
  };

  const fetchWeatherByCity = async (city: string, lang: Language = language) => {
    const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}&lang=${lang}`);
    return res.json();
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
    return res.json();
  };

  // استرجاع اللغة المحفوظة عند فتح الصفحة
  useEffect(() => {
  const savedLang = localStorage.getItem("language") as Language | null;
  if (savedLang) setLanguage(savedLang);
}, []);

useEffect(() => {
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = language;
}, [language]);

  useEffect(() => {
    const loadInitialWeather = async () => {
      setIsLoading(true);
      setError("");

      const savedCity = localStorage.getItem("lastCity");
      const savedLang = (localStorage.getItem("language") as Language | null) || "en";

      if (savedCity) {
        const data = await fetchWeatherByCity(savedCity, savedLang);
        if (data.error) setError(data.error);
        else setWeather(data);
        setIsLoading(false);
        return;
      }

      if (!navigator.geolocation) {
        const data = await fetchWeatherByCity("Amman", savedLang);
        if (data.error) setError(data.error);
        else setWeather(data);
        setIsLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const data = await fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          if (data.error) setError(data.error);
          else setWeather(data);
          setIsLoading(false);
        },
        async () => {
          const data = await fetchWeatherByCity("Amman", savedLang);
          if (data.error) setError(data.error);
          else setWeather(data);
          setIsLoading(false);
        }
      );
    };

    loadInitialWeather();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const city = query.trim();
    if (!city) return;

    setIsLoading(true);
    setError("");
    try {
      const data = await fetchWeatherByCity(city);
      if (!data.error) {
        setWeather(data);
        localStorage.setItem("lastCity", city);
      } else {
        setError(data.error);
        setWeather(null);
      }
    } catch (err) {
      setError("Failed to fetch weather. Please try again.");
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "en" ? "ar" : "en";
      localStorage.setItem("language", next);
      return next;
    });
  };

  return (
    <WeatherBackground weatherCode={weather?.current.weather_code ?? 0}>
      <Navbar
        unit={unit}
        onToggleUnit={toggleUnit}
        theme={theme}
        onToggleTheme={toggleTheme}
        language={language}
        onToggleLanguage={toggleLanguage}
      />

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-10">
        <section className="text-center">
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">
            {t.title}
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            {t.subtitle}
          </p>
        </section>

       <SearchBar
  value={query}
  onChange={handleChange}
  onSubmit={handleSubmit}
  isLoading={isLoading}
  placeholder={t.searchPlaceholder}
  searchLabel={t.search}
  searchingLabel={t.searching}
/>

        {isLoading && !weather && (
          <p className="text-center text-slate-500 dark:text-slate-400">
            {t.loading}
          </p>
        )}

        {error && (
          <p className="text-center text-red-600 dark:text-red-400 font-medium">
            {error}
          </p>
        )}

        {weather && (
          <>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {weather.city}, {weather.country}
              </p>
              <p className="text-6xl font-bold text-slate-900 dark:text-white">
                {unit === "F"
                  ? `${Math.round(weather.current.temperature_2m_f)}°F`
                  : `${Math.round(weather.current.temperature_2m)}°C`}
              </p>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {weatherCodeToText(weather.current.weather_code)}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                label={t.humidity}
                value={`${weather.current.relative_humidity_2m}%`}
                icon="💧"
              />
              <StatCard
                label={t.wind}
                value={`${Math.round(weather.current.wind_speed_10m)} mph`}
                icon="🌬️"
              />
              <StatCard
                label={t.feelsLike}
                value={
                  unit === "F"
                    ? `${Math.round(weather.current.apparent_temperature_f)}°F`
                    : `${Math.round(weather.current.apparent_temperature)}°C`
                }
                icon="🌡️"
              />
            </div>

            <ForecastTable
              data={weather.daily.time.slice(0, 5).map((date, i) => ({
                day: dayName(date),
                high: unit === "F"
                  ? `${Math.round(weather.daily.temperature_2m_max_f[i])}°F`
                  : `${Math.round(weather.daily.temperature_2m_max[i])}°C`,
                low: unit === "F"
                  ? `${Math.round(weather.daily.temperature_2m_min_f[i])}°F`
                  : `${Math.round(weather.daily.temperature_2m_min[i])}°C`,
                condition: weatherCodeToText(weather.daily.weather_code[i]),
                icon: weatherCodeToIcon(weather.daily.weather_code[i]),
              }))}
            />
          </>
        )}
      </div>
    </WeatherBackground>
  );
}