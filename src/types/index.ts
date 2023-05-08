export type Coords = {
  lat: string;
  lon: string
}

type WeatherListItemWeather = {
  id: number;
  main: string;
  description: string;
  icon: string
}

type WeatherListItemWind = {
  speed: number;
  deg: number;
  gust: number;
}

export type WeatherListItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number
  },
  weather: WeatherListItemWeather[];
  clouds: {
    all: number
  },
  wind: WeatherListItemWind;
  visibility: number;
  pop: number;
  rain: undefined | { "3h": string};
  sys: object;
  dt_txt: string
}

export type WeatherCity = {
  id: number;
  name: string;
  coord: Coords;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number
}

export interface Weather {
  cod: number;
  message: number;
  cnt: number;
  list: WeatherListItem[];
  city: WeatherCity
}

export interface ResponseError {
  status: number;
  message: string;
}


