import readline from 'readline';
import welcomeState from './states/welcomeState.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let currentState = welcomeState;

function runBot() {
    currentState(rl, (nextState) => {
        currentState = nextState;
        runBot();
    });
}


runBot();
