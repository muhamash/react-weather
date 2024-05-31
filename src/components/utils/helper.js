/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
const getBackgroundImage = ( climate ) =>
{
    switch ( climate )
    {
        case "Rain":
            return RainyDayImage;
        case "Clouds":
            return ScatteredCloudsImage;
        case "Clear":
            return ClearSkyImage;
        case "Snow":
            return SnowImage;
        case "Thunder":
            return ThunderStormImage;
        case "Fog":
            return WinterImage;
        case "Haze":
            return FewCloudsImage;
        case "Mist":
            return MistImage;
        default:
            return ClearSkyImage;
    }
};

// function getFormattedDateTime() {
//     const months = [
//         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ];
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//     const currentDate = new Date();
//     const year = currentDate.getFullYear();
//     const month = months[currentDate.getMonth()];
//     const dayOfWeek = days[currentDate.getDay()];
//     const dayOfMonth = currentDate.getDate();
//     const hours = String(currentDate.getHours()).padStart(2, '0');
//     const minutes = String(currentDate.getMinutes()).padStart(2, '0');

//     return `${hours}:${minutes} - ${dayOfWeek}, ${dayOfMonth} ${month} '${year.toString().slice(-2)}`;
// }

// console.log(getFormattedDateTime());

const retrieveData = async ( url ) =>
{
    try
    {
        const response = await axios.get( url );
        if ( !response.ok )
        {
            console.log( response, response.data, response.data.days )
            return response.data.days[0];
        }
    }
    catch ( err )
    {
        throw err
    }
};

export { getBackgroundImage, retrieveData };
