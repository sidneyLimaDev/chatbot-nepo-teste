import menuState from './menuState.js';

export function welcomeState(rl, next) {
    console.log('👋 Olá! Bem-vindo ao Chatbot do Clima!');
    console.log('--------------------------------------\n');
    next(menuState);
}

export default welcomeState;
