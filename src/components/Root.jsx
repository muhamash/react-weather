/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import ClearSkyImage from "../assets/backgrounds/clear-sky.jpg";
import FewCloudsImage from "../assets/backgrounds/few-clouds.jpg";
import MistImage from "../assets/backgrounds/mist.jpeg";
import RainyDayImage from "../assets/backgrounds/rainy-day.jpg";
import ScatterdCloudsImage from "../assets/backgrounds/scattered-clouds.jpg";
import SnowImage from "../assets/backgrounds/snow.jpg";
import ThunderStormImage from "../assets/backgrounds/thunderstorm.jpg";
import WinterImage from "../assets/backgrounds/winter.jpg";
import Button from './common/Button';
import Header from './header/Header';
import { useFetch } from './hooks/useFetch';

export default function Root ()
{
  const { weatherData } = useFetch();
  const location = useLocation();

  function getBackgroundImage ( climate )
  {
    switch ( climate )
    {
      case "rain":
        return RainyDayImage;
      case "clouds":
        return ScatterdCloudsImage;
      case "clear":
        return ClearSkyImage;
      case "snow":
        return SnowImage;
      case "thunder":
        return ThunderStormImage;
      case "fog":
        return WinterImage;
      case "haze":
        return FewCloudsImage;
      case "mist":
        return MistImage;
      default:
        return ClearSkyImage;
    }
  }

  const navigate = useNavigate();

  const handleClickButton = () => {
    alert( 'going to parent!' )
    navigate('/')
  }
  return (
    <div
      style={ {
        backgroundImage: `url('${weatherData ? getBackgroundImage( weatherData.icon ) : getBackgroundImage()}')`,
      } }
      className="brightness-110 place-items-center bg-repeat bg-cover w-screen relative overflow-hidden h-screen"
    >
      <div className="absolute inset-0 overflow-y-auto">
        { location.pathname === "/" && <Header /> }
        <nav className="py-3 flex justify-center gap-10">
          { location.pathname !== '/' && (
            <Button
                onClick={handleClickButton}
                text="Dashboard"
                type="cart"
                addClassName="px-5 py-3 text-sm md:text-md text-white"
              />
          ) }
          { location.pathname !== '/radar' && (
            <Link to="/radar">
              <Button
                text="Radar"
                type="checkout"
                state="normal"
                addClassName="px-5 py-3 text-sm md:text-md text-white"
              />
            </Link>
          ) }
          <Button
            text="Forecast"
            type="cartG"
            state="normal"
            addClassName="px-5 py-3 text-sm md:text-md text-white"
          />
          { location.pathname !== '/map' && (
            <Link to="/map">
              <Button
                text="Map"
                type="default"
                state="normal"
                addClassName="px-5 py-3 text-sm md:text-md text-white"
              />
            </Link>
          ) }
        </nav>
        <Outlet />
      </div>
    </div>
  );
}