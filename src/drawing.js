// DRAWING AND VISUALIZATION FUNCTIONS
// Description: All functions responsible for drawing elements on screen.

// Draws the terrain grid with their respective colors.
function drawGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      fill(terrainColors[grid[y][x]]);
      stroke('#21212119'); // Background color outline
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

// Draws search states: visited nodes and frontier.
function drawSearchState() {
    // Visited nodes (red area)
    fill('rgba(24,90,0,0.45)');
    noStroke();
    for (const key in visited) {
      const [x, y] = key.split(',').map(Number);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
    
    // Nodes in frontier (blue area)
    fill('rgba(65,255,11,0.7)');
    noStroke();
    for (const pos of frontier) {
      rect(pos.x * cellSize, pos.y * cellSize, cellSize, cellSize);
    }

    // Final path (white line)
    if (!searching && agentPath && agentPath.length > 0) {
      strokeWeight(5); // Line thickness
      stroke('rgba(255, 255, 255, 0.9)'); // Line color
      noFill();
      beginShape();
      for (const pos of agentPath) {
          vertex(pos.x * cellSize + cellSize / 2, pos.y * cellSize + cellSize / 2);
      }
      endShape();
      strokeWeight(1); // Restores line thickness
    }
}

// Draws the agent and food.
function drawAgentAndFood() {
    // Food
    fill('#D32F2F');
    stroke('#000');
    strokeWeight(2.5);
    ellipse(food.x * cellSize + cellSize / 2, food.y * cellSize + cellSize / 2, cellSize * 0.7);

    // Agent
    fill('#64DD17');
    stroke('#000');
    strokeWeight(2.5);
    ellipse(agent.x * cellSize + cellSize / 2, agent.y * cellSize + cellSize / 2, cellSize * 0.8);
}

// Draws the information panel.
function drawInfoPanel() {
    fill(0, 0, 0, 150);
    noStroke();
    rect(0, 0, width, 30);

    // Draws the text
    fill('#FFFFFF');
    textSize(16);
    textAlign(LEFT, CENTER);
    text(`Food: ${collectedFood}`, 10, 15);
    text(`Explored Nodes: ${exploredNodes}`, 180, 15);
    if (!searching && totalCost > 0) {
      text(`Final Cost: ${totalCost}`, 380, 15);
    }
}