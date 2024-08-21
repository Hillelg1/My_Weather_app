import React, { useState } from "react";

import Autocomplete from "./AutoComplete";

type WeatherImages = {
  [key: string]: string;
};
const WeatherImage: WeatherImages = {
  "thunderstorm with light rain": "thunderStorm.png",
  "thunderstorm with rain": "thunderStorm.png",
  "thunderstorm with heavy rain": "thunderStorm.png",
  "light thunderstorm": "thunderStorm.png",
  thunderstorm: "thunderStorm.png",
  "heavy thunderstorm": "thunderStorm.png",
  "ragged thunderstorm": "thunderStorm.png",
  "thunderstorm with light drizzle": "thunderStorm.png",
  "thunderstorm with drizzle": "thunderStorm.png",
  "thunderstorm with heavy drizzle": "thunderStorm.png",

  "light intensity drizzle": "rainShower.png",
  drizzle: "rainShower.png",
  "heavy intensity drizzle": "rainShower.png",
  "light intensity drizzle rain": "rainShower.png",
  "drizzle rain": "rainShower.png",
  "heavy intensity drizzle rain": "rainShower.png",
  "shower rain and drizzle": "rainShower.png",
  "heavy shower rain and drizzle": "rainShower.png",
  "shower drizzle": "rainShower.png",

  "light rain": "rain.png",
  "moderate rain": "rain.png",
  "heavy intensity rain": "rain.png",
  "very heavy rain": "rain.png",
  "freezing rain": "Snow.png",
  "light intensity shower rain": "rainShower.png",
  "shower rain": "rainShower.png",
  "heavy intensity shower rain": "rainShower.png",
  "ragged shower rain": "rainShower.png",

  "light snow": "Snow.png",
  snow: "Snow.png",
  "heavy snow": "Snow.png",
  sleet: "Snow.png",
  "light shower sleet": "Snow.png",
  "shower sleet": "Snow.png",
  "light rain and snow": "Snow.png",
  "rain and snow": "Snow.png",
  "light shower snow": "Snow.png",
  "shower snow": "Snow.png",
  "heavy shower snow": "Snow.png",

  mist: "Mist.png",
  smoke: "Mist.png",
  haze: "Mist.png",
  "sand/dust whirls": "Mist.png",
  fog: "Mist.png",
  sand: "Mist.png",
  dust: "Mist.png",
  "volcanic ash": "Mist.png",
  squalls: "Mist.png",
  tornado: "Mist.png",

  "clear sky": "clear.png",
  "few clouds": "fewClouds.png",
  "overcast clouds": "fewClouds.png",
  "scattered clouds": "scatteredClouds.png",
  "broken clouds": "scatteredClouds.png",
};

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

  const getImage = (condition: string) => {
    return WeatherImage[condition] || "default.png";
  };

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
  const handleSelect = (city: string) => {
    fetchWeather(city);
  };

  return (
    <div>
      <Autocomplete
        onSelect={handleSelect}
        location={location}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      {weather && (
        <div>
          <h1>Weather in {weather.name}</h1>
          <p>Temperature: {Math.floor((weather.main.temp * 9) / 5 + 32)}°F</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img
            src={`../images/${getImage(weather.weather[0].description)}`}
            alt="weather image"
            className="weatherImage"
          />
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
