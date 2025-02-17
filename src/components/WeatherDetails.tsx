const WeatherDetails = ({ weatherInfo }: { weatherInfo: WeatherInfo }) => {
  return (
    <div className="max-w-[650px] mx-auto text-white space-y-5 pb-16">
      {/* city name and flag */}
      <div className="name flex items-center justify-center gap-2">
        <p className="text-[2rem]">{weatherInfo?.name}</p>
        <img
          className="w-[30px]"
          src={`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`}
        />
      </div>

      {/* weather description */}
      <p className="text-center text-3xl capitalize">{weatherInfo?.weather?.[0]?.description}</p>

      {/* weather icon */}
      <img
        src={`https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`}
        className="place-self-center h-20 w-20"
      />

      {/* temperature */}
      <p className="text-center text-5xl font-bold">{`${weatherInfo?.main?.temp} °C`}</p>

      {/* three parameters */}
      <div className="parameter-container flex justify-between flex-col gap-3 items-center sm:flex-row">
        <Parameters
          parameterInfo={`${weatherInfo?.wind?.speed} m/s`}
          src="/wind.png"
          title="Windspeed"
        />

        <Parameters
          parameterInfo={`${weatherInfo?.main?.humidity} %`}
          src="/humidity.png"
          title="Humidity"
        />

        <Parameters
          parameterInfo={`${weatherInfo?.clouds?.all} %`}
          src="/cloud.png"
          title="Clouds"
        />
      </div>
    </div>
  );
};

const Parameters = ({
  parameterInfo,
  src,
  title,
}: {
  parameterInfo: string;
  src: string;
  title: string;
}) => {
  return (
    <div className="parameter flex flex-col items-center gap-2 w-[100%] sm:w-[30%] max-w-[200px] bg-tab rounded-sm py-5">
      <img src={src} alt={title} loading="lazy" className="w-[50px]" />

      <p className="uppercase tracking-wider text-2xl font-thin">{title}</p>
      <p className="text-2xl">{parameterInfo}</p>
    </div>
  );
};

export default WeatherDetails;
