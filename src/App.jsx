// import React from 'react'
import { FetchProvider } from "./components/hooks/useFetchData";
import Root from "./components/Root";

// const queryUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.9697,-77.385?key=4KCCBKNJQFYH8DKD2FMZQHBBT';

// console.log(queryUrl)



export default function App ()
{
  return (
    <div>
      <FetchProvider>
        <Root/>
      </FetchProvider>
    </div>
  )
}
