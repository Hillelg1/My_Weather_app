import { WeatherData } from "../Utils";
import "./weatherDisplay.css";

interface weatherDisplayProps {
  weatherData: WeatherData;
}

const WeatherDisplay = ({ weatherData }: weatherDisplayProps) => {
  return (
    <div className="weather-info-container">
      <p className="name">{weatherData.name}</p>
      <p className="description">
        {weatherData.weather[0].description[0].toUpperCase() +
          weatherData.weather[0].description.slice(1)}
      </p>
      <p>Temp: {Math.floor((weatherData.main.temp * 9) / 5 + 32)} °F</p>

      <p>
        {Math.floor((weatherData.main.temp_max * 9) / 5 + 32)}° /{" "}
        {Math.floor((weatherData.main.temp_min * 9) / 5 + 32)}°
      </p>
      <p>Wind: {weatherData.wind.speed} MPH</p>
      <p>
        Feels Like {(Math.floor(weatherData.main.feels_like) * 9) / 5 + 32} °F
      </p>
    </div>
  );
};

export default WeatherDisplay;
