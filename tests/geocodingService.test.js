import axios from 'axios';
import { getCoordinatesByCity } from '../src/services/geocodingService';

jest.mock('axios');

describe('geocodingService', () => {
    it('deve retornar as coordenadas de uma cidade', async () => {
        const mockResponse = {
            data: [{ lat: '40.7128', lon: '-74.0060' }]
        };
        axios.get.mockResolvedValue(mockResponse);

        const result = await getCoordinatesByCity('Nova York');

        expect(result).toEqual({ latitude: '40.7128', longitude: '-74.0060' });
    });

    it('deve lançar um erro se a cidade não for encontrada', async () => {
        const mockResponse = { data: [] };
        axios.get.mockResolvedValue(mockResponse);

        await expect(getCoordinatesByCity('Cidade Inexistente')).rejects.toThrow('Cidade não encontrada.');
    });

    it('deve lançar um erro de rede se ocorrer um problema com a API', async () => {
        axios.get.mockRejectedValue(new Error('Erro de rede'));

        await expect(getCoordinatesByCity('Nova York')).rejects.toThrow('Erro ao buscar coordenadas: Erro de rede');
    });
});
