"use client";
import { useEffect, useState } from "react";

type WeatherData = {
  temp: number;
  description: string;
  city: string;
  icon: string;
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.current_weather) {
              setWeather({
                temp: data.current_weather.temperature,
                description: "Current Weather",
                city: `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(
                  2
                )}`,
                icon: "https://openweathermap.org/img/wn/01d.png", // Placeholder icon
              });
            } else {
              setError("Weather data not available");
            }
          })
          .catch(() => setError("Failed to fetch weather"));
      },
      (err) => setError(`Unable to retrieve your location: ${err.message}`)
    );
  }, []);

  return (
    <div className="rounded-lg bg-card p-4 shadow text-card-foreground w-full max-w-xs flex flex-col items-center">
      <h3 className="text-lg font-bold mb-2">Weather</h3>
      {weather ? (
        <>
          <div className="flex flex-col items-center">
            <img
              src={weather.icon}
              alt={weather.description}
              className="w-16 h-16 mb-2"
            />
            <div className="text-2xl font-semibold">
              {((weather.temp * 9) / 5 + 32).toFixed(1)}°F
            </div>
            <div className="text-sm">{weather.city}</div>
            <div className="text-xs text-muted-foreground">
              {weather.description}
            </div>
          </div>
        </>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
