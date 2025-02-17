// import { fetchUserWeatherInfo } from "../utils/fetchUserWeatherInfo";
import React, { SetStateAction } from "react";

const AccessLocation = ({
  setPermission,
}: {
  setPermission: React.Dispatch<SetStateAction<boolean>>;
}) => {
  function showPosition(position: GeolocationPosition) {
    const userCoordinates = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    setPermission(true);
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("No geolocation support is available on your device");
    }
  }

  return (
    <div className="w-[90%] max-w-[550px] mx-auto text-white flex flex-col gap-7 items-center py-5">
      <img
        src="/location.png"
        alt="location"
        loading="lazy"
        className="w-20 h-20"
      />

      <div className="flex flex-col text-center gap-2">
        <h3 className="text-3xl font-bold">Grant Location Access</h3>
        <p className="text-[0.95rem]">
          Allow Access To Get Weather Information
        </p>
      </div>

      <button
        className="px-6 py-2 rounded-md bg-gray-400/25 uppercase cursor-pointer text-sm"
        onClick={getLocation}
      >
        Grant Access
      </button>
    </div>
  );
};

export default AccessLocation;
