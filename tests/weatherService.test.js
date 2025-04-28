const axios = require('axios');
const { getWeatherByCoordinates } = require('../src/services/weatherService');

jest.mock('axios');

describe('weatherService', () => {
    it('deve retornar informações do clima corretamente', async () => {
        const mockResponse = {
            data: {
                current_weather: {
                    temperature: 22,
                    weathercode: 1,
                    windspeed: 15
                }
            }
        };
        axios.get.mockResolvedValue(mockResponse);

        const result = await getWeatherByCoordinates('40.7128', '-74.0060');

        expect(result).toEqual({ temperature: 22, weathercode: 1, windspeed: 15 });
    });

    it('deve lançar um erro de rede se ocorrer um problema com a API', async () => {
        axios.get.mockRejectedValue(new Error('Erro de rede'));

        await expect(getWeatherByCoordinates('40.7128', '-74.0060')).rejects.toThrow('Erro ao buscar clima: Erro de rede');
    });
});
