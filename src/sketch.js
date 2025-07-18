// VARIÁVEIS DE ESTADO DA SIMULAÇÃO
// Descrição: Este bloco define as variáveis globais que guardam
// o estado atual da simulação

let grid = [];
let agent = {};
let food = {};

// Variáveis que controlam o fluxo da aplicação
let searchType = 'astar'; 
let searching = false;    
let agentMoving = false;  

// Estatísticas da simulação
let collectedFood = 0;
let totalCost = 0;
let exploredNodes = 0;

// Estruturas de dados para a busca e movimento
let agentPath = []; // Caminho que o agente irá seguir
let agentStep = 0;  // Posição atual do agente
let frontier = [];  // Nós a serem explorados
let visited = {};   // Nós já visitados
let parent = {};    // Para reconstruir o caminho

// Variáveis para os elementos da interface da (ui)
let searchSpeedSlider, searchTypeSelect, resetButton;

// FUNÇÕES PRINCIPAIS DO P5.JS
// Descrição: Este é o coração do p5.js. `setup()` é executado uma vez no
// início e `draw()` é executado repetidamente (a cada frame), criando a
// animação.

function setup() {
  // Cria o canvas e anexa-o ao elemento <main> do HTML
  const canvas = createCanvas(cols * cellSize, rows * cellSize + 50);
  canvas.parent('main');
      
  setupUI();
    resetSimulation(); // inicia a simulação
}

function draw() {
  frameRate(searchSpeedSlider.value()); // A velocidade da animação é pelo slider
  background('#212121');

  // Desenha todos os componentes visuais
  drawGrid();
  drawSearchState();
  drawAgentAndFood();
  drawInfoPanel();

  // Controla a lógica principal da animação
  if (searching) {
    stepSearch();
  }
  else if (agentMoving) {
    stepAgentMovement();
  }
}

// CONTROLE DA SIMULAÇÃO
// Descrição: Funções que gerem o ciclo da simulação, como
// reiniciar o ambiente ou iniciar uma nova busca.

// Reseta toda a simulação.
function resetSimulation() {
  searchType = searchTypeSelect.value();
  generateSolvableMap(); // O mapa é gerado aleatoriamente
  placeFood(); // Uma comida aparece
  startSearch(); // O agente realiza a busca
}

// Inicia uma nova busca a partir da posição atual do agente
function startSearch() {
  searching = true;
  agentMoving = false;
      
  // Reseta as estruturas de dados da busca anterior
  frontier = [], visited = {}, parent = {};
  totalCost = 0, exploredNodes = 0, agentPath = [], agentStep = 0;

  // Cria o nó (posição do agente)
  const startNode = {
    x: agent.x, y: agent.y,
    cost: 0, // g(n) - custo para chegar até aqui
    h: manhattan(agent.x, agent.y, food.x, food.y) // h(n) - heurística
  };
      
  const startKey = `${startNode.x},${startNode.y}`;
  frontier.push(startNode);
  visited[startKey] = { cost: 0 };
}

// MOVIMENTO DO AGENTE
// Descrição: Controla a animação do agente.
let lastMoveTime = 0;
const Agent_Speed = 80;
function stepAgentMovement() {
  if (!agentPath || agentStep >= agentPath.length) {
    collectedFood++;
    placeFood();
    startSearch();
    return;
  }

  const pos = grid[agent.y][agent.x];
  const cost = terrainCosts[pos]; 
  const requiredDelay = cost * Agent_Speed;

  if (millis() - lastMoveTime > requiredDelay) {
    const nextPos = agentPath[agentStep];
    agent.x = nextPos.x;
    agent.y = nextPos.y;
    agentStep++;
    lastMoveTime = millis();
  }
}
