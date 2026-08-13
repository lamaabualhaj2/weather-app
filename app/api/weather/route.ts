import { NextRequest, NextResponse } from "next/server";

const toFahrenheit = (celsius: number): number =>
  Math.round((celsius * 9) / 5 + 32);

async function getWeatherForCoords(
  latitude: number,
  longitude: number,
  name: string,
  country: string
) {
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&wind_speed_unit=mph&timezone=auto`
  );
  const data = await weatherRes.json();

  return {
    city: name,
    country,
    current: {
      ...data.current,
      temperature_2m_f: toFahrenheit(data.current.temperature_2m),
      apparent_temperature_f: toFahrenheit(data.current.apparent_temperature),
    },
    daily: {
      ...data.daily,
      temperature_2m_max_f: data.daily.temperature_2m_max.map(toFahrenheit),
      temperature_2m_min_f: data.daily.temperature_2m_min.map(toFahrenheit),
    },
  };
}

export async function GET(request: NextRequest) {
  const cityParam = request.nextUrl.searchParams.get("city")?.trim();
  const langParam = request.nextUrl.searchParams.get("lang") || "en";
  const latParam = request.nextUrl.searchParams.get("lat");
  const lonParam = request.nextUrl.searchParams.get("lon");

  try {
    // البحث باسم المدينة
    if (cityParam) {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityParam)}&count=5&language=${langParam}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        return NextResponse.json(
          { error: `Couldn't find "${cityParam}". Check the spelling and try again.` },
          { status: 404 }
        );
      }

      const { latitude, longitude, name, country } = geoData.results[0];
      const result = await getWeatherForCoords(latitude, longitude, name, country);
      return NextResponse.json(result);
    }

    // البحث بموقع الجهاز
    if (latParam && lonParam) {
      const latitude = parseFloat(latParam);
      const longitude = parseFloat(lonParam);

      if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
        return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
      }

      let name = "Your Location";
      let country = "";
      try {
        // مررنا langParam هون بدل ما نثبتها على "en" دايماً،
        // حتى اسم المدينة/الدولة يرجع بنفس لغة الواجهة
        const reverseRes = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${langParam}`
        );
        const reverseData = await reverseRes.json();
        name = reverseData.city || reverseData.locality || name;
        country = reverseData.countryName || "";
      } catch {
        // إذا فشل reverse geocoding، منكمل بالاسم الافتراضي
      }

      const result = await getWeatherForCoords(latitude, longitude, name, country);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "City or coordinates are required" }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}