import { WeatherData } from "./Utils";
import { getImage } from "./Utils";

interface weatherDisplayProps {
  weatherData: WeatherData;
}

const WeatherDisplay = ({ weatherData }: weatherDisplayProps) => {
  return (
    <div className="weather-box">
      <div className="image-container">
        <img
          src={`${getImage(weatherData.weather[0].description)}`}
          alt="weather image"
          className="weather-image"
        />
      </div>
      <p>{weatherData.name}</p>
      <p>{weatherData.weather[0].description}</p>
      <p>{Math.floor((weatherData.main.temp * 9) / 5 + 32)} °F</p>
    </div>
  );
};

export default WeatherDisplay;
