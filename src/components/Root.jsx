/* eslint-disable no-unused-vars */
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { PacmanLoader } from 'react-spinners';
import Header from './header/Header';
import useFetchQuery from './hooks/useFetchData';
import Board from './weather/Board';


export default function Root ()
{
  const { data: weather, isLoading, isError } = useFetchQuery( {
    queryKey: [ 'london' ],
    url: 'london'
  } );
  console.log( weather );

  if ( isLoading ) return <div className="flex justify-center items-center py-20">
    <PacmanLoader size={130} color="#3390c4" />
  </div>
  if ( isError )return <p>Error: { isError }, { isError.message }</p>
    
  return (
    <div className="grid place-items-center h-screen bg-no-repeat bg-cover">
      <Header />
      <main>
        <ErrorBoundary fallback={ <p>component has an error</p> }>
          <React.Suspense fallback={ <p>loading...</p> }>
            <Board data={ weather } />
          </React.Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
