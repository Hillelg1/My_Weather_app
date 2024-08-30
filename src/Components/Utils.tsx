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
