import axios from 'axios';

export const geocode = async (location) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
                q: location,
                format: 'json',
                limit: 1
            }
        });
        const data = response.data;
        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
        }
        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
};
