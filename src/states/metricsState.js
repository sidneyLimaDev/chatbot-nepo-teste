import { getMetrics } from '../utils/metrics.js';

export default function metricsState(rl, next) {
    const metrics = getMetrics();
    console.log('\n📊 Relatório de Métricas:');
    console.log(`🔢 Total de Requisições: ${metrics.totalRequests}`);
    console.log(`✅ Requisições Bem-Sucedidas: ${metrics.successfulRequests}`);
    console.log(`❌ Requisições com Falha: ${metrics.failedRequests}\n`);

    rl.question('Pressione qualquer tecla para voltar ao menu... ', async (answer) => {
        const { default: menuState } = await import('./menuState.js');
        next(menuState);
    });
}
