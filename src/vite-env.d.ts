/// <reference types="vite/client" />

type Tabs = "user" | "search";

interface Coordinates {
  lat: number;
  long: number;
}

interface WeatherInfo {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
}
