import axios from 'axios';

export async function getWeatherByCoordinates(latitude, longitude) {
    try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude,
                longitude,
                current_weather: true
            }
        });

        const { temperature, weathercode, windspeed } = response.data.current_weather;

        return { temperature, weathercode, windspeed };
    } catch (error) {
        throw new Error(`Erro ao buscar clima: ${error.message}`);
    }
}
