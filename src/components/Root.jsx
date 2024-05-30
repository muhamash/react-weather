/* eslint-disable no-unused-vars */
import React from 'react';
import { useWeatherContext } from './context/useWeatherProvider';
import Header from './header/Header';
import Board from './weather/Board';


export default function Root ()
{
  const { data, error, loading } = useWeatherContext();
  console.log( data );

  return (
    <div className="grid place-items-center h-screen bg-no-repeat bg-cover">
      <Header />
      <main>
        <React.Suspense fallback={<p>loading...</p>}>
          <Board />
        </React.Suspense>
      </main>
    </div>
  );
}
