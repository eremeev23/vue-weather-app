import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";
import { ResponseError, Weather, WeatherCity, WeatherQueryParams } from "@/types";

interface IState {
  locationsLat: string;
  locationsLon: string;
  cities: WeatherCity[];
  currentCity: WeatherCity | null;
  weatherData: Weather | null;
  error: ResponseError | null;
}

export const useMainStore = defineStore('mainStore', {
  state: (): IState => ({
    locationsLat: "",
    locationsLon: "",
    cities: [],
    currentCity: null,
    weatherData: null,
    error: null,
  }),

  actions: {
    setCitiesFromLocalStorage(): void {
      this.cities = JSON.parse(localStorage.getItem("weather_cities") || "[]");
    },

    async getWeatherData(params: WeatherQueryParams): Promise<false | Weather> {
      try {
        return await axios
          .get<Weather>(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: {
              units: "metric",
              appid: "924bdba454482fce947584b28d955c30",
              ...params
            }
          })
          .then(({ data }) => {
            this.currentCity = data.city;
            this.weatherData = data;
            return data;
          })
        // @ts-ignore
      } catch (e: AxiosError) {
        this.error = {
          status: e.response.data.cod,
          message: e.response.data.message
        };
        return false;
      }
    },

    saveCity(city: WeatherCity | null): void {
      if (city) {
        this.cities.push(city);
        localStorage.setItem("weather_cities", JSON.stringify(this.cities));
      }
    },

    removeCity(name: string): void {
      const removingCity = this.cities.find((city: WeatherCity) => city.name === name) || {} as WeatherCity;
      const index = this.cities.indexOf(removingCity);

      if (index >= 0) {
        this.cities.splice(index, 1);
        localStorage.setItem("weather_cities", JSON.stringify(this.cities));
      }
    }
  }
})
