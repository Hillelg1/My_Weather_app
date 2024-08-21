import React, { useState } from "react";
import Search from "./Search";

type WeatherData = {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
};

function WeatherApp() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState("");
  const apiKey = "252aa837ea838f7f53967dd2f02308ec";

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
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Handle form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      fetchWeather(location);
    }
  };

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  return (
    <div>
      <Search
        location={location}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      {weather && (
        <div>
          <h1>Weather in {weather.name}</h1>
          <p>Temperature: {(weather.main.temp * 9) / 5 + 32}°F</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
