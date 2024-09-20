import { useState } from "react";
import { WeatherForecastData } from "../Utils";
import { getImage } from "../Utils";
import "./weatherForecast.css";
interface WeatherForecastProps {
  forecastData: WeatherForecastData | null;
}

const WeatherForecast = ({ forecastData }: WeatherForecastProps) => {
  if (!forecastData || !forecastData.list || !forecastData.city) {
    return <p>Loading forecast...</p>;
  }
  const [active, setActive] = useState<string | null>(null);
  const todayDate = new Date().toLocaleDateString();
  console.log(todayDate);
  // Helper function to format the date
  const formatDate = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleDateString();
  const handleClick = (date: string) => {
    if (!(active === date)) setActive(date);
    else setActive(null);
  };
  // Group by day
  const groupedByDay = forecastData.list.reduce((acc: any, entry: any) => {
    const date = formatDate(entry.dt);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {});
  return (
    <div>
      <h2>5-Day Forecast for {forecastData.city.name}</h2>
      {Object.keys(groupedByDay).map((date, index) => (
        <div key={index} className="day-forecast">
          <button
            onClick={() => handleClick(date)}
            className="forecastButton btn btn-dark"
          >
            {todayDate == date ? "Today" : date}
          </button>
          <div
            className={`forecast-details ${active === date ? "show" : "hide"}`}
          >
            {active == date &&
              groupedByDay[date].map((entry: any) => (
                <div className="card hour-forecast-card">
                  <div className="card-body">
                    <img
                      src={`${getImage(entry.weather[0].description)}`}
                      alt="forecast"
                      className="forecast-image card-img-top weather-image"
                    />
                    <h6 className="card-title">
                      {new Date(entry.dt * 1000).toLocaleTimeString()}
                    </h6>
                    <p className="card-text">
                      {Math.floor((entry.main.temp * 9) / 5 + 32)}°F
                    </p>
                    <p className="card-text">{entry.weather[0].description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
