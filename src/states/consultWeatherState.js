import { getCoordinatesByCity } from '../services/geocodingService.js';
import { getWeatherByCoordinates } from '../services/weatherService.js';
import { formatErrorMessage, formatWeatherInfo } from '../utils/formatUtils.js';
import logger from '../utils/logger.js';
import { isValidCity } from '../utils/inputValidator.js';
import { incrementTotalRequests, incrementSuccessfulRequests, incrementFailedRequests } from '../utils/metrics.js';

export default function consultWeatherState(rl, next) {
    // Importação dinâmica para evitar circularidade
    rl.question('Digite o nome da cidade: ', async (city) => {
        const { default: menuState } = await import('./menuState.js');  // Importação assíncrona
        
        if (!isValidCity(city)) {
            const errorMessage = '❌ Nome da cidade não pode ser vazio.';
            console.log(formatErrorMessage(errorMessage));
            logger.warn(errorMessage);
            return next(menuState);
        }

        try {
            console.log('🔎 Buscando informações...');
            incrementTotalRequests();
            const { latitude, longitude } = await getCoordinatesByCity(city);
            const { temperature, weathercode, windspeed } = await getWeatherByCoordinates(latitude, longitude);

            const weatherInfoMessage = formatWeatherInfo(city, temperature, windspeed, weathercode);
            console.log(weatherInfoMessage);

            logger.info(`Clima consultado com sucesso para a cidade: ${city}`);
            incrementSuccessfulRequests();
        } catch (error) {
            const errorMessage = `Erro ao buscar clima: ${error.message}`;
            console.error(formatErrorMessage(errorMessage));
            logger.error(errorMessage);
            incrementFailedRequests();
        }

        next(menuState);
    });
}
