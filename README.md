# Chatbot Interativo

Este é um chatbot simples implementado com Node.js que permite ao usuário consultar informações sobre o clima de diferentes cidades utilizando APIs externas. O projeto é estruturado como uma máquina de estados, onde o chatbot muda de estado conforme as escolhas do usuário.

## Objetivo

O objetivo deste projeto é desenvolver um chatbot funcional que interaja com o usuário, colete informações e consulte APIs públicas externas para fornecer dados como o clima de uma cidade.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **Nominatim API**: API para buscar coordenadas geográficas de uma cidade.
- **Open-Meteo API**: API para obter informações meteorológicas (clima).
- **Machine States**: Estrutura simples de máquina de estados para controlar a interação com o usuário.

## Funcionalidades

- **Saudação inicial**: O chatbot começa com uma mensagem de boas-vindas.
- **Menu interativo**: O chatbot oferece um menu com opções para o usuário escolher.
  - **Consultar clima**: O usuário pode digitar o nome de uma cidade para consultar o clima.
  - **Relatório de Métricas**:O chatbot exibe um relatório com o total de requisições feitas, incluindo as bem-sucedidas e com falha.
  - **Sair**: Encerra a interação.
- **Consulta de clima**: O chatbot solicita o nome da cidade, busca as coordenadas usando a Nominatim API e consulta a temperatura atual na cidade usando a Open-Meteo API.
- **Tratamento de erros**: O chatbot trata entradas inválidas e falhas nas requisições de API.

## Monitoramento e Métricas
O sistema de métricas permite monitorar a quantidade de requisições feitas pelo chatbot. As métricas são armazenadas em memória e são mostradas no relatório quando o usuário escolhe a opção [9].

A cada requisição de clima, as seguintes métricas são atualizadas:

- Total de Requisições: Total de interações com o bot.

- Requisições Bem-Sucedidas: Consultas de clima realizadas com sucesso.

- Requisições com Falha: Consultas de clima que falharam.

## Estrutura do Projeto
```bash
/chatbot
   |-- /src
      |-- /states             # Estados do chatbot
      |-- /services           # Serviços externos (APIs)
      |-- /utils              # Funções auxiliares (validação, logger, metrics)
      |-- chatbot.js          # Arquivo principal para rodar o chatbot
   |-- /tests                 # Testes do chatbot
      |-- chatbot.test.js     # Testes unitários
   |-- package.json           # Dependências do projeto
   |-- README.md              # Este arquivo
``` 

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior) instalado na sua máquina.

### Passos

1. Clone este repositório:
   ```bash
   git clone https://https://github.com/sidneyLimaDev/chatbot-nepo
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd chatbot
   ```
3. Execute o chatbot:
   ```bash
   npm run chat
   ```
   ou
   ```bash
   node src/chatbot.js
   ```


## Testes
O projeto inclui testes unitários para garantir que o chatbot funcione corretamente. Para rodar os testes, basta executar:
```bash
npm test
```
### Cobertura de Testes
- Estados: Verifica a transição de estados do chatbot.

- Serviços de API: Testa a integração com as APIs externas.

- Validação de entradas: Garante que o chatbot lide com entradas inválidas de maneira apropriada.

- Validação das requisições a API através das metricas.