import consultWeatherState from './consultWeatherState.js';
import metricsState from './metricsState.js';
import { formatErrorMessage } from '../utils/formatUtils.js';

const menuOptions = {
    '1': (next) => next(consultWeatherState),
    '2': (next, rl) => {
        console.log('👋 Até mais!');
        rl.close();
    },
    '9': (next) => next(metricsState),
};

export default function menuState(rl, next) {
    console.log('📋 O que você deseja fazer?');
    console.log('[1] Consultar Clima');
    console.log('[2] Sair');
    console.log('[9] Ver Relatório de Métricas\n');
    
    rl.question('Escolha uma opção: ', (answer) => {
        const option = answer.trim();
        
        if (menuOptions[option]) {
            menuOptions[option](next, rl);
        } else {
            console.log(formatErrorMessage('Opção inválida. Tente novamente.'));
            next(menuState);
        }
    });
}
