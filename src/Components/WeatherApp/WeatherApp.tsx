import { useState } from "react";
import { getLocation } from "../Utils";
import { WeatherData } from "../Utils";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import { WeatherForecastData } from "../Utils";
import { WeatherImage } from "../Utils";
import Autocomplete from "../Autocomplete/AutoComplete";
function WeatherApp() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const [forecast, setForecast] = useState<WeatherForecastData | null>(null);
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

  const handleSearchSubmit = (city: string) => {
    fetchWeather(city);
  };

  const handleSelect = (city: string) => {
    fetchWeather(city);
  };
  const getClass = (weather: string) => {
    const className = WeatherImage[weather] || "defaultWeather";
    return className.replace(".png", "");
  };
  const { weatherData, forecastData } = getLocation();
  return (
    <div className={`weather-app-container`}>
      <div
        className={`weather-box ${
          weather ? getClass(weather.weather[0].description) : ""
        } ${weatherData ? getClass(weatherData.weather[0].description) : ""}`}
      >
        <Autocomplete
          onSearchSubmit={handleSearchSubmit}
          onSelect={handleSelect}
        />
        {weather && <WeatherDisplay weatherData={weather} />}

        {!weather && (
          <div>
            {weatherData && <WeatherDisplay weatherData={weatherData} />}
            {!weatherData && !forecastData && (
              <div>
                <p className="loading">Loading Location...</p>
                <div className="spinner-border m-5" role="status"></div>
              </div>
            )}
          </div>
        )}
      </div>
      {(forecast || forecastData) && (
        <>
          <WeatherForecast forecastData={forecast ? forecast : forecastData} />
        </>
      )}
    </div>
  );
}

export default WeatherApp;
