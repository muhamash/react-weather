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
import Header from './header/Header';
import useFetchQuery from './hooks/useFetchData';
import Board from './weather/Board';

export default function Root() {
  const [climateImage, setClimateImage] = React.useState("");
  const { data: weather, isLoading, isError } = useFetchQuery({
    queryKey: ['weatherCity'],
    url: 'Thakurgaon'
  });

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <PacmanLoader size={130} color="#3390c4" />
      </div>
    );
  }

  if (isError) {
    return <p>Error: {isError.message}</p>;
  }

  return (
    <div
      style={ {
        backgroundImage: `url('${getBackgroundImage( weather.days[ 0 ].icon )}')`,
        // backdropFilter: 'brightness(.5)',
        // filter: 'brightness(50%)',
      } }
      className="grid brightness-110 place-items-center h-screen bg-no-repeat bg-cover"
    >
      <Header />
      <main className="">
        <ErrorBoundary fallback={<p>Component has an error, you may reload it</p>}>
          <React.Suspense fallback={<p>Loading...</p>}>
            <Board data={weather} />
          </React.Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}