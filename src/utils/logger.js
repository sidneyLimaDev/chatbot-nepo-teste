import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Corretamente converte URL para caminho de sistema de arquivos usando fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho correto para o diretório de logs
const LOG_DIRECTORY = path.resolve(__dirname, '../../logs');
const LOG_FILE_PATH = path.join(LOG_DIRECTORY, 'app.log');

// Função para obter o timestamp atual
function getTimestamp() {
  return new Date().toISOString();
}

// Garante que o diretório de logs exista
function ensureLogDirectoryExists() {
  try {
    if (!fs.existsSync(LOG_DIRECTORY)) {
      fs.mkdirSync(LOG_DIRECTORY, { recursive: true });
    }
  } catch (error) {
    console.error(`Erro ao criar diretório de logs: ${error.message}`);
    // Exibe o caminho que está tentando criar para depuração
    console.error(`Caminho do diretório: ${LOG_DIRECTORY}`);
  }
}

// Função para gravar logs no arquivo
function logToFile(message) {
  try {
    const logMessage = `${message}\n`;
    ensureLogDirectoryExists(); // Garante que o diretório exista antes de gravar

    // Usa writeFileSync para evitar callbacks assíncronos que podem causar problemas
    fs.appendFileSync(LOG_FILE_PATH, logMessage);
  } catch (err) {
    console.error('❌ Erro ao gravar o log no arquivo:', err);
  }
}

// Função para gravar logs no console e no arquivo
function log(level, message) {
  const formattedMessage = `[${getTimestamp()}] [${level.toUpperCase()}] ${message}`;
  if (process.env.NODE_ENV !== 'test') {
    console.log(formattedMessage);
  }

  try {
    logToFile(formattedMessage);
  } catch (error) {
    console.error(`Falha ao registrar log: ${error.message}`);
  }
}

// Exporta funções para os diferentes níveis de log
export default {
  info: (message) => log('info', message),
  warn: (message) => log('warn', message),
  error: (message) => log('error', message),
  debug: (message) => log('debug', message),
};