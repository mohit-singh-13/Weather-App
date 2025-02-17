import React, { SetStateAction } from "react";

export async function fetchUserWeatherInfo(
  coordinates: Coordinates,
  setData: React.Dispatch<SetStateAction<WeatherInfo | null>>
) {
  const { lat, long } = coordinates;

  // API call
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    );

    const data = await response.json();
    setData(data);
  } catch (err) {
    console.log("Error", err);
  }
}

export async function fetchCityWeatherInfo(
  setData: React.Dispatch<SetStateAction<WeatherInfo | null>>,
  setError: React.Dispatch<SetStateAction<boolean>>,
  city: string
) {
  // API call
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    );

    const data = await response.json();

    if (data.cod === "404") throw new Error(data.message);
    else {
      setError(false);
      setData(data);
    }
  } catch (err) {
    setError(true);
    setData(null);
    console.log(err);
  }
}
