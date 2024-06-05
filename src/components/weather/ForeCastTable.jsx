/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const ForecastTable = ({ forecastDay }) => {
  return (
    <div className="bg-sky-400 bg-opacity-30 mix-blend-screen drop-shadow-md rounded-md shadow-md w-[300px] h-[200px] overflow-y-scroll">
      <table className="w-full h-full table-fixed border-collapse">
        <thead className="sticky top-0 bg-gray-400 text-center text-sm">
          <tr>
            <th className="border-b-2 border-r-2 border-black">Time</th>
            <th className="border-b-2 border-black border-r-2">Temperature</th>
            <th className="border-b-2 border-black">Condition</th>
          </tr>
        </thead>
        <React.Suspense fallback={<p>Loading forecast...</p>}>
          <tbody>
            {forecastDay.hour.length > 0 ? (
              forecastDay.hour.map((forecast, index) => (
                <tr
                  className="text-sm font-thin text-center hover:shadow-md transition-all duration-200 hover:bg-green-700 hover:text-white cursor-pointer"
                  key={index}
                >
                  <td className="  p-2">{forecast.time.split(' ')[1]}</td>
                      <td className={` p-2 flex gap-1 justify-center items-center`}>
                          <div>{ forecast.temp_c }°C</div>
                          <img className='w-[40px] h-[40px]' src={forecast.condition.icon} alt="" />
                  </td>
                  <td
                    className={`leading-tight  p-2`}
                  >{forecast.condition.text}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-2">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </React.Suspense>
      </table>
    </div>
  );
};

export default ForecastTable;