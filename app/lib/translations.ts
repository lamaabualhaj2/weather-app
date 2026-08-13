export const translations = {
  en: {
    title: "Weather App",
    subtitle: "Search for a city to view its weather.",
    searchPlaceholder: "Search for a city",
    search: "Search",
    searching: "Searching...",
    loading: "Loading weather...",
    humidity: "Humidity",
    wind: "Wind",
    feelsLike: "Feels Like",
    day: "Day",
    highLow: "High/Low",
    condition: "Condition",
    sunny: "Sunny",
    partlyCloudy: "Partly Cloudy",
    cloudy: "Cloudy",
    rainy: "Rainy",
    stormy: "Stormy",
  },
  ar: {
    title: "تطبيق الطقس",
    subtitle: "ابحث عن مدينة لمشاهدة طقسها.",
    searchPlaceholder: "ابحث عن مدينة",
    search: "بحث",
    searching: "جاري البحث...",
    loading: "جاري تحميل الطقس...",
    humidity: "الرطوبة",
    wind: "الرياح",
    feelsLike: "الإحساس الحراري",
    day: "اليوم",
    highLow: "الأعلى/الأدنى",
    condition: "الحالة",
    sunny: "مشمس",
    partlyCloudy: "غائم جزئياً",
    cloudy: "غائم",
    rainy: "ممطر",
    stormy: "عاصف",
  },
};

export type Language = "en" | "ar";

// أسماء الأيام بالعربي والإنجليزي — getDay() بيرجع 0 للأحد لغاية 6 للسبت
const dayNamesEn = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const dayNamesAr = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

export function dayName(dateStr: string, language: Language): string {
  const dayIndex = new Date(dateStr).getDay();
  return language === "ar" ? dayNamesAr[dayIndex] : dayNamesEn[dayIndex];
}