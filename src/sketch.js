// SIMULATION STATE VARIABLES
// Description: This block defines the global variables that store
// the current state of the simulation

let grid = [];
let agent = {};
let food = {};

// Variables that control the application flow
let searchType = 'astar'; 
let searching = false;    
let agentMoving = false;  

// Simulation statistics
let collectedFood = 0;
let totalCost = 0;
let exploredNodes = 0;

// Data structures for search and movement
let agentPath = []; // Path that the agent will follow
let agentStep = 0;  // Current position of the agent
let frontier = [];  // Nodes to be explored
let visited = {};   // Already visited nodes
let parent = {};    // To reconstruct the path

// Variables for the user interface (ui) elements
let searchSpeedSlider, searchTypeSelect, resetButton;

// MAIN P5.JS FUNCTIONS
// Description: This is the heart of p5.js. `setup()` is executed once at
// startup and `draw()` is executed repeatedly (every frame), creating the
// animation.

function setup() {
  // Creates the canvas and attaches it to the <main> HTML element
  const canvas = createCanvas(cols * cellSize, rows * cellSize + 50);
  canvas.parent('main');
      
  setupUI();
    resetSimulation(); // starts the simulation
}

function draw() {
  frameRate(searchSpeedSlider.value()); // Animation speed is controlled by the slider
  background('#212121');

  // Draws all visual components
  drawGrid();
  drawSearchState();
  drawAgentAndFood();
  drawInfoPanel();

  // Controls the main animation logic
  if (searching) {
    stepSearch();
  }
  else if (agentMoving) {
    stepAgentMovement();
  }
}

// SIMULATION CONTROL
// Description: Functions that manage the simulation cycle, such as
// restarting the environment or starting a new search.

// Resets the entire simulation.
function resetSimulation() {
  searchType = searchTypeSelect.value();
  generateSolvableMap(); // The map is randomly generated
  placeFood(); // Food appears
  startSearch(); // The agent performs the search
}

// Starts a new search from the agent's current position
function startSearch() {
  searching = true;
  agentMoving = false;
      
  // Resets the data structures from the previous search
  frontier = [], visited = {}, parent = {};
  totalCost = 0, exploredNodes = 0, agentPath = [], agentStep = 0;

  // Creates the node (agent's position)
  const startNode = {
    x: agent.x, y: agent.y,
    cost: 0, // g(n) - cost to reach here
    h: manhattan(agent.x, agent.y, food.x, food.y) // h(n) - heuristic
  };
      
  const startKey = `${startNode.x},${startNode.y}`;
  frontier.push(startNode);
  visited[startKey] = { cost: 0 };
}

// AGENT MOVEMENT
// Description: Controls the agent's animation.
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
