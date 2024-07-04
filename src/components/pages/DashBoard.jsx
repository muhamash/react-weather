/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
// import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HashLoader, PacmanLoader } from 'react-spinners';
import Board from '../weather/Board';

export default function DashBoard ({ weatherData, error, isLoading })
{
    // const [ climateImage, setClimateImage ] = React.useState( "" );
    // const { weatherData, error, isLoading } = useFetch();
    return (
        <main className="">
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
                    <div className="py-10 flex flex-col gap-5 items-center justify-center">
                        <h1>Your location is not integrated on the api, you might search your town or city instead!!!!</h1>
                        <HashLoader size={ 150 } color="#36d7b7" />
                    </div>
                ) }
            </ErrorBoundary>
        </main>
    );
}
