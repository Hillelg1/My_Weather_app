import React, { useState } from "react";
import Autocomplete from "./AutoComplete";
import LocationWeather from "./location";
import { WeatherData } from "./Utils";
import WeatherDisplay from "./WeatherDisplay";
import WeatherForecast from "./WeatherForecast";
import { WeatherForecastData } from "./Utils";
function WeatherApp() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const apiKey = "252aa837ea838f7f53967dd2f02308ec";
  const [forecast, setForecast] = useState<WeatherForecastData | null>(null);
  // Function to fetch weather data
  const fetchWeather = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setWeather(data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response1 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}&units=metric`
      );
      const data1 = await response1.json();
      setForecast(data1);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Handle form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Handle input change

  const handleSelect = (city: string) => {
    fetchWeather(city);
  };

  return (
    <div>
      <Autocomplete
        onSelect={handleSelect}
        onSearchSubmit={handleSearchSubmit}
      />
      {!weather && <LocationWeather />}

      {weather && (
        <>
          <WeatherDisplay weatherData={weather} />
          {forecast && <WeatherForecast forecastData={forecast} />}
        </>
      )}
    </div>
  );
}

export default WeatherApp;
