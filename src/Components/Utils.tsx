import { useEffect, useState } from "react";
type WeatherImages = {
  [key: string]: string;
};
export const WeatherImage: WeatherImages = {
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
export const getImage = (condition: string) => {
  const imageName = WeatherImage[condition];
  return `/images/${imageName}` || "";
};

export interface WeatherData {
  name: string;
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  // Add more pro
}
export interface WeatherForecastData {
  city: {
    name: string;
  };
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      description: string;
    }[];
  }[];
}

// utils/api.js or Utils.ts

export const getLocation = () => {
  const [forecastData, setFull] = useState<WeatherForecastData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeatherData, showError);
    } else {
      setError("Geolocation is not supported by this browser.");
      console.log(error);
    }
  }, []);

  const getWeatherData = async (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
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

  return { weatherData, forecastData };
};
export const fetchWeatherData = async (
  lat: number,
  lon: number,
  apiKey: string
) => {
  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  const forecastData = await forecastResponse.json();

  return forecastData;
};
