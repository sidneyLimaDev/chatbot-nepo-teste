// formatUtils.js

export function formatErrorMessage(message) {
    return `❌ Erro: ${message}\n`;
}

export function formatSuccessMessage(message) {
    return `✅ Sucesso: ${message}\n`;
}

export function formatWeatherInfo(city, temperature, windspeed, weathercode) {
    return `
🌎 Cidade: ${city}
🌡️ Temperatura atual: ${temperature}°C
💨 Velocidade do vento: ${windspeed} km/h
🔢 Código de clima: ${weathercode}
--------------------------------------
    `.trim();  // Adiciona o trim para remover a linha extra no final
}
