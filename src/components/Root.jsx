/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
// import { HashLoader, PacmanLoader } from 'react-spinners';
import { default as ClearSkyImage, default as FewCloudsImage } from "../assets/backgrounds/few-clouds.jpg";
import MistImage from "../assets/backgrounds/mist.jpeg";
import RainyDayImage from "../assets/backgrounds/rainy-day.jpg";
import ScatterdCloudsImage from "../assets/backgrounds/scattered-clouds.jpg";
import SnowImage from "../assets/backgrounds/sunny.jpg";
import ThunderStormImage from "../assets/backgrounds/thunderstorm.jpg";
import WinterImage from "../assets/backgrounds/winter.jpg";
import Header from './header/Header';
import { useFetch } from './hooks/useFetch';
// import Board from './weather/Board';
import { Link, Outlet } from "react-router-dom";
import Button from './common/Button';

export default function Root() {
  const [ climateImage, setClimateImage ] = React.useState( "" );
  const { weatherData, error, isLoading } = useFetch();

  // console.log(weatherData, error, isLoading)
  

  function getBackgroundImage(climate) {
    switch (climate) {
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

  return (
    <div
      style={ {
        backgroundImage: `url('${weatherData ? ( getBackgroundImage( weatherData.icon ) ) : ( getBackgroundImage() )}')`,
      } }
      className="brightness-110 place-items-center bg-repeat bg-cover w-screen relative overflow-hidden  h-screen"
    >
      <div className="absolute inset-0 overflow-y-auto">
        <Header />
        <nav className="py-3 flex justify-center gap-10">
          <Link to="/dashboard">
            <Button text="Dashboard"
              type="cart"
              state="normal"
              // onClick={ handleClick }
              addClassName='w-[100px] h-[40px] text-md text-white'
              dropdown={ true } />
          </Link>
          <Link to="/radar">
            <Button text="Radar"
              type="checkout"
              state="normal"
              // onClick={ handleClick }
              addClassName='w-[100px] h-[40px] text-md text-white'
              dropdown={ true } />
          </Link>
          <Button text="Forecast"
            type="cartG"
            state="normal"
            // onClick={ handleClick }
            addClassName='w-[100px] h-[40px] text-md text-white'
            dropdown={ true } />
          <Button text="Map"
            type="default"
            state="normal"
            // onClick={ handleClick }
            addClassName='w-[100px] h-[40px] text-md text-white'
            dropdown={ true } />
        </nav>
        <Outlet />
        {/* <main  className="">
          <ErrorBoundary fallback={ <p className="text-md bg-red-700 text-white p-3 rounded shadow-yellow-200 bg-opacity-70 mix-blend-multiply drop-shadow-md shadow-lg">Something went wrong. Reload it!</p> }>
            { isLoading ? (
              <div className="flex justify-center items-center py-20">
                <PacmanLoader size={ 120 } color="#3390c4" />
              </div>
            ) : error ? (
              <p className="text-md bg-red-700 text-white p-3 rounded shadow-yellow-200 bg-opacity-70 mix-blend-multiply drop-shadow-md shadow-lg">Error: { error.message } / May be i have got wrong inputs from the search field</p>
            ) : weatherData && Object.keys( weatherData ).length > 0 ? (
              <Board data={ weatherData } />
            ) : (
                    <div className="py-10 flex items-center justify-center">
                      <h1>Your location is didn't on api search your town or city instead!!!!</h1>
                <HashLoader size={ 150 } color="#36d7b7" />
              </div>
            ) }
          </ErrorBoundary>
        </main> */}
      </div>
    </div>
  );
}