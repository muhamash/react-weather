/* eslint-disable no-unused-vars */
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { PacmanLoader } from 'react-spinners';
import { default as ClearSkyImage, default as FewCloudsImage } from "../assets/backgrounds/few-clouds.jpg";
import MistImage from "../assets/backgrounds/mist.jpeg";
import RainyDayImage from "../assets/backgrounds/rainy-day.jpg";
import ScatterdCloudsImage from "../assets/backgrounds/scattered-clouds.jpg";
import SnowImage from "../assets/backgrounds/sunny.jpg";
import ThunderStormImage from "../assets/backgrounds/thunderstorm.jpg";
import WinterImage from "../assets/backgrounds/winter.jpg";
import { useFetch } from './context/useFetch';
import Header from './header/Header';
import Board from './weather/Board';

export default function Root() {
  const [climateImage, setClimateImage] = React.useState("");

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

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center py-20">
  //       <PacmanLoader size={130} color="#3390c4" />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }
  // useEffect(() => {
  //       const bgImage = getBackgroundImage(weatherData.climate);
  //       setClimateImage(bgImage);
  //   }, [weatherData.climate]);

  return (
    <div
      style={ {
        backgroundImage: `url('${weatherData ? ( getBackgroundImage( weatherData.icon ) ) : ( getBackgroundImage() )}')`,
      } }
      className="grid brightness-110 place-items-center h-screen bg-no-repeat bg-cover"
    >
      <Header/>
      <main className="">
        <ErrorBoundary fallback={<p className="text-md bg-red-700 text-white p-3 rounded shadow-yellow-200 bg-opacity-70 mix-blend-multiply drop-shadow-md shadow-lg">Something went wrong. Reload it!</p>}>
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <PacmanLoader size={130} color="#3390c4" />
            </div>
          ) : error ? (
            <p className="text-md bg-red-700 text-white p-3 rounded shadow-yellow-200 bg-opacity-70 mix-blend-multiply drop-shadow-md shadow-lg">Error: {error.message} / May be i have got wrong inputs from search field</p>
          ) : weatherData && Object.keys(weatherData).length > 0 ? (
            <Board data={weatherData} />
          ) : (
            <p>No data</p>
          )}
        </ErrorBoundary>
      </main>
    </div>
  );
}