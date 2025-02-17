import { Link, useLocation } from "react-router-dom";
import Heading from "./Heading";
import ButtonTab from "./ButtonTab";
import { useState } from "react";

const Header = () => {
  const path = useLocation();

  const [activeTab, setActiveTab] = useState<Tabs>(
    path.pathname === "/" ? "user" : "search"
  );

  const userClass = activeTab === "user" ? "bg-tab" : "";
  const searchClass = activeTab === "search" ? "bg-tab" : "";
  
  return (
    <div>
      <Heading />

      <div className="flex justify-between max-w-[550px] w-[90%] mx-auto my-8 mt-10">
        <Link to={"/"}>
          <ButtonTab className={userClass} onClick={() => setActiveTab("user")}>
            Your Weather
          </ButtonTab>
        </Link>

        <Link to={"/search"}>
          <ButtonTab
            className={searchClass}
            onClick={() => setActiveTab("search")}
          >
            Search Weather
          </ButtonTab>
        </Link>
      </div>
    </div>
  );
};

export default Header;
