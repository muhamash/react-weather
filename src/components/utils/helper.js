/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-catch */
import axios from 'axios';
import { useMapEvents } from 'react-leaflet';
/* eslint-disable no-undef */
const getImage = ( climate ) =>
{
    switch ( climate )
    {
        case "rain":
            return RainyDayImage;
        case "clouds":
            return ScatteredCloudsImage;
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
};

function getFormattedDateTime ( datetimeEpoch ) {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    
    const currentDate = new Date(datetimeEpoch * 1000);

    if ( isNaN( currentDate ) )
    {
        console.log(typeof  datetimeEpoch, typeof currentDate)
        throw new Error('Invalid date');
    }

    const year = currentDate.getFullYear();
    const month = months[currentDate.getMonth()];
    const dayOfWeek = days[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes} - ${dayOfWeek}, ${dayOfMonth} ${month} '${year.toString().slice(-2)}`;
}


// console.log(getFormattedDateTime());

const retrieveData = async ( city ) =>
{
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city.queryKey[ 1 ]}?key=4KCCBKNJQFYH8DKD2FMZQHBBT`;

    // const url = `https://api.weatherapi.com/v1/forecast.json?key=d909ba40570e4ce287c191712240206&q=${city.queryKey[ 1 ]}&days=1&aqi=no&alerts=no`;

    console.log( url, city )
    try
    {
        const response = await axios.get( url );
        if ( response.status === 200 )
        {
            console.log( "weather data response", response.data );
            const data = response.data
            // console.log(data.forecast.forecastday[0].day.condition.text)
            return response.data;
        }
        else
        {
            throw new Error( `Something went wrong in retrieve function: ${response.statusText}` );
        }
    } catch ( error )
    {
        throw error;
    }
};

const reverseGeocode = async (latitude, longitude) => {
    console.log(latitude, longitude);
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
    
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const address = response.data.address;
            console.log(address)
            const city = address.city || address.town || address.village || address.suburb || address.hamlet || 'Unknown location';
            return city;
        } else {
            throw new Error('Reverse geocoding failed');
        }
    } catch (error) {
        throw error;
    }
};


const temp = ( t ) =>
{
    const celsius = ( ( t - 32 ) * 5 ) / 9;
    return celsius.toFixed(1)
};

// const tempInFahrenheit = 86;
// const tempInCelsius = temp(tempInFahrenheit);
// console.log( `Temperature in Celsius: ${tempInCelsius.toFixed( 2 )}°C` );
const mapEvents = (props) => {
  useMapEvents({
    mousemove: (event) => {
      props.setMouseCoords(event.latlng);
    },
    drag: (event) => {
      props.setMapCenter(event.target.getCenter());
    },
  });
  return null;
};

const layerTitles = [
    {
        id: 1,
        name: 'windLayer',
    },
    {
        id: 2,
        name: 'radarLayer',
    },
    {
        id: 3,
        name: 'precipitationLayer',
    },
    {
        id: 4,
        name: 'pressureLayer',
    },
    {
        id: 5,
        name: 'temperatureLayer',
    },
    {
        id: 6,
        name: 'rainLayer'
    }
]

export { getFormattedDateTime, getImage, layerTitles, mapEvents, retrieveData, reverseGeocode, temp };

