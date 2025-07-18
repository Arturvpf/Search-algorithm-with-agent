// FUNÇÕES DE DESENHO E VISUALIZAÇÃO
// Descrição: Todas as funções responsáveis por desenhar elementos na tela.

// Desenha a grelha de terrenos com as suas respetivas cores.
function drawGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      fill(terrainColors[grid[y][x]]);
      stroke('#21212119'); // Contorno da cor do fundo
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

// Desenha os estados da busca: nós visitados e fronteira.
function drawSearchState() {
    // Nós visitados (área vermelha)
    fill('rgba(24,90,0,0.45)');
    noStroke();
    for (const key in visited) {
      const [x, y] = key.split(',').map(Number);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
    
    // Nós na fronteira (área azul)
    fill('rgba(65,255,11,0.7)');
    noStroke();
    for (const pos of frontier) {
      rect(pos.x * cellSize, pos.y * cellSize, cellSize, cellSize);
    }

    // Caminho final (linha branca)
    if (!searching && agentPath && agentPath.length > 0) {
      strokeWeight(5); // Espessura de linha
      stroke('rgba(255, 255, 255, 0.9)'); // Cor da linha
      noFill();
      beginShape();
      for (const pos of agentPath) {
          vertex(pos.x * cellSize + cellSize / 2, pos.y * cellSize + cellSize / 2);
      }
      endShape();
      strokeWeight(1); // Restaura a espessura da linha
    }
}

// Desenha o agente e a comida.
function drawAgentAndFood() {
    // Comida
    fill('#D32F2F');
    stroke('#000');
    strokeWeight(2.5);
    ellipse(food.x * cellSize + cellSize / 2, food.y * cellSize + cellSize / 2, cellSize * 0.7);

    // Agente
    fill('#64DD17');
    stroke('#000');
    strokeWeight(2.5);
    ellipse(agent.x * cellSize + cellSize / 2, agent.y * cellSize + cellSize / 2, cellSize * 0.8);
}

// Desenha o painel de informações.
function drawInfoPanel() {
    fill(0, 0, 0, 150);
    noStroke();
    rect(0, 0, width, 30);

    // Desenha o texto
    fill('#FFFFFF');
    textSize(16);
    textAlign(LEFT, CENTER);
    text(`Comidas: ${collectedFood}`, 10, 15);
    text(`Nós Explorados: ${exploredNodes}`, 180, 15);
    if (!searching && totalCost > 0) {
      text(`Custo Final: ${totalCost}`, 380, 15);
    }
}