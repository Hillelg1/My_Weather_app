import { WeatherData } from "./Utils";
import { getImage } from "./Utils";
import { useState } from "react";
import "./cssFiles/weatherDisplay.css";
interface weatherDisplayProps {
  weatherData: WeatherData;
}

const WeatherDisplay = ({ weatherData }: weatherDisplayProps) => {
  const [clicked, setClicked] = useState<true | false>(false);
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

      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              onClick={() => (clicked ? setClicked(false) : setClicked(true))}
            >
              more info
            </button>
          </h2>

          {clicked && (
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div>
                  <p>
                    High: {Math.floor((weatherData.main.temp_max * 9) / 5 + 32)}{" "}
                    °F
                  </p>
                  <p>Wind: {weatherData.wind.speed} MPH</p>
                  <p>
                    Feels Like{" "}
                    {(Math.floor(weatherData.main.feels_like) * 9) / 5 + 32} °F
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
