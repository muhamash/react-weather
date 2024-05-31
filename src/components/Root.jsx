/* eslint-disable no-unused-vars */
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { PacmanLoader } from 'react-spinners';
import ClearSkyImage from "../assets/backgrounds/few-clouds.jpg";
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
  const [climateImage, setClimateImage] = React.useState(ClearSkyImage);
  const { data: weather, isLoading, isError } = useFetchQuery({
    queryKey: ['weatherCity'],
    url: 'dhaka'
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

  React.useEffect(() => {
    if (weather && weather.data && weather.data.days[0] && weather.data.days[0].icon) {
      const bgImage = getBackgroundImage(weather.data.days[0].icon);
      setClimateImage(bgImage);
    }
  }, [weather]);

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
      style={{ backgroundImage: `url('${climateImage}')` }}
      className="grid place-items-center h-screen bg-no-repeat bg-cover"
    >
      <Header />
      <main>
        <ErrorBoundary fallback={<p>Component has an error, you may reload it</p>}>
          <React.Suspense fallback={<p>Loading...</p>}>
            <Board data={weather} />
          </React.Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}