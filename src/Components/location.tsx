import { useEffect, useState } from "react";
import { WeatherData } from "./Utils";
import WeatherDisplay from "./WeatherDisplay";
import WeatherForecast from "./WeatherForecast";
import { WeatherForecastData } from "./Utils";

function LocationWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setFull] = useState<WeatherForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeatherData, showError);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const getWeatherData = async (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    try {
      const apiKey = "252aa837ea838f7f53967dd2f02308ec";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response1 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      const data1 = await response1.json();
      setFull(data1);
    } catch (error) {
      setError("Error fetching weather data.");
    }
  };

  const showError = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("permision denied");
        break;
      // Handle other error cases...
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {weatherData && <WeatherDisplay weatherData={weatherData} />}
      {forecastData && <WeatherForecast forecastData={forecastData} />}
      {!weatherData && !forecastData && !error && <p>Loading...</p>}
    </div>
  );
}

export default LocationWeather;
