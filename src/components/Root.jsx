/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HashLoader, PacmanLoader } from 'react-spinners';
import { default as ClearSkyImage, default as FewCloudsImage } from "../assets/backgrounds/few-clouds.jpg";
import MistImage from "../assets/backgrounds/mist.jpeg";
import RainyDayImage from "../assets/backgrounds/rainy-day.jpg";
import ScatterdCloudsImage from "../assets/backgrounds/scattered-clouds.jpg";
import SnowImage from "../assets/backgrounds/sunny.jpg";
import ThunderStormImage from "../assets/backgrounds/thunderstorm.jpg";
import WinterImage from "../assets/backgrounds/winter.jpg";
import Header from './header/Header';
import { useFetch } from './hooks/useFetch';
import Board from './weather/Board';

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
        <nav>
          <button>
              Radar
          </button>
          <button>
            Forecast
          </button>
          <button>
              Map
          </button>
        </nav>
        <main  className="">
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
        </main>
      </div>
    </div>
  );
}