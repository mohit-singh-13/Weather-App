import { useState } from "react";
import WeatherDetails from "./WeatherDetails";
import { fetchCityWeatherInfo } from "../utils/fetchWeatherInfo";
import Loader from "./Loader";

const SearchPage = () => {
  const [city, setCity] = useState<string>("");
  const [data, setData] = useState<WeatherInfo | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const clickHandler = async () => {
    if (city === "") return;
    setLoading(true);
    await fetchCityWeatherInfo(setData, setError, city.trim());
    setCity("");
    setLoading(false);
  };

  return (
    <div className="w-full space-y-8">
      <div className="w-[90%] max-w-[550px] mx-auto text-white">
        <div className="w-full flex justify-between gap-2">
          <input
            type="text"
            name="city"
            id="city"
            className="bg-tab placeholder:text-white w-full rounded-lg px-4 py-2 outline-0 focus:outline-2 focus:outline-white/80"
            placeholder="Search for city..."
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            onKeyDown={(key) => {
              if (key.key === "Enter") clickHandler();
            }}
          />

          <button
            className="cursor-pointer px-2 py-2 bg-tab/25 hover:bg-tab/50 transition-all duration-150 rounded-lg"
            onClick={clickHandler}
          >
            Search
          </button>
        </div>

        {error && (
          <div>
            <img
              src="/not-found.png"
              alt="not-found"
              className="w-[80%] mx-auto mt-8"
            />
          </div>
        )}

        {loading && <Loader />}
      </div>

      {data && !loading && !error && <WeatherDetails weatherInfo={data} />}
    </div>
  );
};

export default SearchPage;
