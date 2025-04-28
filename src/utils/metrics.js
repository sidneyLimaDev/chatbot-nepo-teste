import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const METRICS_FILE_PATH = path.resolve(__dirname, '../../logs/metrics.json');

// Garante que o diretório logs exista antes de tentar usar o arquivo
function ensureDirectoryExists() {
  const logsDir = path.dirname(METRICS_FILE_PATH);
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
}

// Carrega as métricas do arquivo ou retorna as métricas padrão se o arquivo não existir
function loadMetrics() {
  ensureDirectoryExists();

  try {
    if (fs.existsSync(METRICS_FILE_PATH)) {
      const data = fs.readFileSync(METRICS_FILE_PATH, 'utf8');
      return JSON.parse(data);
    } ão
    return {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
    };
  } catch (error) {
    console.error(`Erro ao carregar métricas: ${error.message}`);
    return {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
    };
  }
}

// Salva as métricas no arquivo JSON
function saveMetrics(metrics) {
  ensureDirectoryExists();

  try {
    fs.writeFileSync(METRICS_FILE_PATH, JSON.stringify(metrics, null, 2));
  } catch (error) {
    console.error(`Erro ao salvar métricas: ${error.message}`);
  }
}

// Incrementa o total de requisições
function incrementTotalRequests() {
  let metrics = loadMetrics();
  metrics.totalRequests += 1;
  saveMetrics(metrics);
}

// Incrementa as requisições bem-sucedidas
function incrementSuccessfulRequests() {
  let metrics = loadMetrics();
  metrics.successfulRequests += 1;
  saveMetrics(metrics);
}

// Incrementa as requisições com falha
function incrementFailedRequests() {
  let metrics = loadMetrics();
  metrics.failedRequests += 1;
  saveMetrics(metrics);
}

// Retorna uma cópia das métricas
function getMetrics() {
  return loadMetrics();
}

// Reseta as métricas
function resetMetrics() {
  const metrics = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
  };
  saveMetrics(metrics);
}

export {
  incrementTotalRequests,
  incrementSuccessfulRequests,
  incrementFailedRequests,
  getMetrics,
  resetMetrics
};