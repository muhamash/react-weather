// import React from 'react'
import Root from "./components/Root";
import FavoriteProvider from "./components/context/FavoriteProvider";
import { FetchProvider } from './components/context/FetchProvider';
// const queryUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.9697,-77.385?key=4KCCBKNJQFYH8DKD2FMZQHBBT';

// console.log(queryUrl)



export default function App ()
{
  return (
    <div>
      <FetchProvider>
        <FavoriteProvider>
          <Root />
        </FavoriteProvider>
      </FetchProvider>
    </div>
  );
}
