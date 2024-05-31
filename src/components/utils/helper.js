/* eslint-disable no-useless-catch */
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

function getFormattedDateTime({ date = new Date() }) {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = months[currentDate.getMonth()];
    const dayOfWeek = days[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes} - ${dayOfWeek}, ${dayOfMonth} ${month} '${year.toString().slice(-2)}`;
}


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

export { getFormattedDateTime, getImage, retrieveData };

