// Parâmetros do grid
const cols = 30;
const rows = 30;
const cellSize = 20;

// Tipos de terreno
const OBSTACLE = 0;
const SAND = 1;
const MUD = 2;
const WATER = 3;
const terrainCosts = [Infinity, 1, 5, 10];
const terrainColors = [
  '#333',    // Obstáculo
  '#ffe082', // Areia
  '#a1887f', // Atoleiro
  '#81d4fa'  // Água
];

let grid = [];
let agent = {};
let food = {};

// Estados para animação e busca
let searchType = 'bfs';
let searching = false;
let searchQueue = [];
let searchVisited = [];
let searchParent = {};
let searchPath = [];
let searchFrontier = [];
let agentMoving = false;
let agentPath = [];
let agentStep = 0;
let comidaColetada = 0;
let moveCooldown = 0;

function setup() {
  createCanvas(cols * cellSize, rows * cellSize);
  gerarMapa(); 
  placeAgentAndFood();
  setupUI();
  iniciarBusca();
}

function setupUI() {
  const select = document.getElementById('searchType');
  select.onchange = () => {
    searchType = select.value;
    reiniciar();
  };
}

function draw() {
  background('#222');
  drawGrid();
  drawAgentAndFood();
  drawSearchStates();
  drawInfo();
  if (searching) {
    animarBusca();
  } else if (agentMoving) {
    animarMovimentoAgente();
  }
}

function iniciarBusca() {
  // Resetar estados
  searching = true;
  agentMoving = false;
  searchQueue = [];
  searchVisited = [];
  searchParent = {};
  searchPath = [];
  searchFrontier = [];
  agentPath = [];
  agentStep = 0;
  moveCooldown = 0;
  if (searchType === 'bfs') iniciarBFS();
  else if (searchType === 'dfs') iniciarDFS();
  else if (searchType === 'ucs') iniciarUCS();
  else if (searchType === 'greedy') iniciarGreedy();
  else if (searchType === 'astar') iniciarAStar();
}

// ---------- BFS ----------
function iniciarBFS() {
  searchQueue = [{ x: agent.x, y: agent.y }];
  searchVisited = Array(rows).fill().map(() => Array(cols).fill(false));
  searchVisited[agent.y][agent.x] = true;
  searchParent = {};
  searchFrontier = [{ x: agent.x, y: agent.y }];
}

// ---------- DFS ----------
function iniciarDFS() {
  searchQueue = [{ x: agent.x, y: agent.y }];
  searchVisited = Array(rows).fill().map(() => Array(cols).fill(false));
  searchVisited[agent.y][agent.x] = true;
  searchParent = {};
  searchFrontier = [{ x: agent.x, y: agent.y }];
}

// ---------- UCS ----------


// ---------- Gulosa ----------


// ---------- A* ----------


function animarBusca() {
  if (searchQueue.length === 0) {
    searching = false;
    return;
  }
  let atual;
  if (searchType === 'bfs') {
    atual = searchQueue.shift();
  } else if (searchType === 'dfs') {
    atual = searchQueue.pop();
  } else if (searchType === 'ucs') {
    searchQueue.sort((a, b) => a.cost - b.cost);
    atual = searchQueue.shift();
  } else if (searchType === 'greedy') {
    searchQueue.sort((a, b) => a.h - b.h);
    atual = searchQueue.shift();
  } else if (searchType === 'astar') {
    searchQueue.sort((a, b) => (a.cost + a.h) - (b.cost + b.h));
    atual = searchQueue.shift();
  }
  searchFrontier = [...searchQueue];
  if (atual.x === food.x && atual.y === food.y) {
    // Encontrou o objetivo
    searchPath = reconstruirCaminho(atual);
    searching = false;
    agentMoving = true;
    agentPath = [...searchPath];
    agentStep = 0;
    return;
  }
  for (let viz of vizinhos(atual)) {
    if (!searchVisited[viz.y][viz.x] && grid[viz.y][viz.x] !== OBSTACLE) {
      if (searchType === 'ucs' || searchType === 'astar') {
      } else if (searchType === 'greedy') {
        
      } else {
        searchQueue.push({ x: viz.x, y: viz.y });
      }
      searchVisited[viz.y][viz.x] = true;
      searchParent[`${viz.x},${viz.y}`] = { x: atual.x, y: atual.y };
    }
  }
}

function reconstruirCaminho(dest) {
  let path = [dest];
  let atual = dest;
  while (searchParent[`${atual.x},${atual.y}`]) {
    atual = searchParent[`${atual.x},${atual.y}`];
    path.push(atual);
  }
  return path.reverse();
}

function vizinhos(pos) {
  let dirs = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
  ];
  let res = [];
  for (let d of dirs) {
    let nx = pos.x + d.x;
    let ny = pos.y + d.y;
    if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
      res.push({ x: nx, y: ny });
    }
  }
  return res;
}

function drawSearchStates() {
  // Visitados
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (searchVisited[y] && searchVisited[y][x]) {
        fill('rgba(200,200,200,0.3)');
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
  // Fronteira
  for (let pos of searchFrontier) {
    fill('rgba(33,150,243,0.5)');
    noStroke();
    rect(pos.x * cellSize, pos.y * cellSize, cellSize, cellSize);
  }
  // Caminho final
  if (searchPath.length > 0) {
    for (let pos of searchPath) {
      fill('rgba(255,235,59,0.7)');
      noStroke();
      rect(pos.x * cellSize, pos.y * cellSize, cellSize, cellSize);
    }
  }
}

function animarMovimentoAgente() {
  if (agentStep >= agentPath.length) {
    agentMoving = false;
    // Coletou comida
    comidaColetada++;
    food = randomEmptyCell();
    iniciarBusca();
    return;
  }
  if (moveCooldown > 0) {
    moveCooldown--;
    return;
  }
  let pos = agentPath[agentStep];
  agent.x = pos.x;
  agent.y = pos.y;
  // Velocidade depende do custo do terreno
  let custo = terrainCosts[grid[pos.y][pos.x]];
  moveCooldown = map(custo, 1, 10, 2, 10); // mais lento em terrenos caros
  agentStep++;
}

function drawInfo() {
  fill('#fff');
  textSize(16);
  textAlign(LEFT, TOP);
  text(`Comidas coletadas: ${comidaColetada}`, 10, 5);
}

function reiniciar() {
  gerarMapa(); 
  placeAgentAndFood();
  comidaColetada = 0;
  iniciarBusca();
  loop();
}

function gerarMapa() {
  grid = [];
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      let r = random();
      let tipo;
      if (r < 0.15) tipo = OBSTACLE;
      else if (r < 0.45) tipo = SAND;
      else if (r < 0.75) tipo = MUD;
      else tipo = WATER;
      row.push(tipo);
    }
    grid.push(row);
  }
}

function placeAgentAndFood() {
  agent = randomEmptyCell();
  food = randomEmptyCell();
}

function randomEmptyCell() {
  let x, y;
  do {
    x = floor(random(cols));
    y = floor(random(rows));
  } while (grid[y][x] === OBSTACLE);
  return { x, y };
}

function drawGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      fill(terrainColors[grid[y][x]]);
      stroke('#444');
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function drawAgentAndFood() {
  // Comida
  fill('#ff5252');
  ellipse(
    food.x * cellSize + cellSize / 2,
    food.y * cellSize + cellSize / 2,
    cellSize * 0.6
  );
  // Agente
  fill('#00e676');
  ellipse(
    agent.x * cellSize + cellSize / 2,
    agent.y * cellSize + cellSize / 2,
    cellSize * 0.7
  );
}
