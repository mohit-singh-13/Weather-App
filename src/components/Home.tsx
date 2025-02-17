import { useEffect, useState } from "react";
import Loader from "./Loader";
import { getFromSessionStorage } from "../utils/getFromSessionStorage";
import AccessLocation from "./AccessLocation";
import { fetchUserWeatherInfo } from "../utils/fetchWeatherInfo";
import WeatherDetails from "./WeatherDetails";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [permission, setPermission] = useState<boolean>(true);
  const [data, setData] = useState<WeatherInfo | null>(null);

  useEffect(() => {
    const result = getFromSessionStorage();
    setLoading(false);

    if (result) {
      fetchUserWeatherInfo(result, setData);
    } else {
      setPermission(false);
    }
  }, [permission]);

  if (loading) {
    return <Loader />;
  }

  if (!permission) {
    return <AccessLocation setPermission={setPermission} />;
  }

  return <div>{data && <WeatherDetails weatherInfo={data} />}</div>;
};

export default Home;
