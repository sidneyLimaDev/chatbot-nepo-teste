import axios from 'axios';

export async function getCoordinatesByCity(city) {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: city,
                format: 'json',
                limit: 1
            },
            headers: {
                'User-Agent': 'chatbot-clima/1.0'
            }
        });

        if (response.data.length === 0) {
            throw new Error('Cidade não encontrada.');
        }

        const { lat, lon } = response.data[0];
        return { latitude: lat, longitude: lon };
    } catch (error) {
        throw new Error(`Erro ao buscar coordenadas: ${error.message}`);
    }
}
