// LÓGICA DOS ALGORITMOS DE BUSCA
// Descrição: O núcleo do projeto. `stepSearch` executa um passo de busca
// por frame, animando o processo. `applySearchStrategy` implementa a lógica de
// prioridade de cada algoritmo.


// Executa um passo da animação de busca.
function stepSearch() {
  if (frontier.length === 0) {
    console.log("Busca finalizada: sem caminho possível.");
    searching = false;
    return;
  }
  
  applySearchStrategy(); // Ordena a fronteira de acordo com o algoritmo
  const currentNode = frontier.pop(); // Retira o nó de maior prioridade
  
  const currentKey = `${currentNode.x},${currentNode.y}`;
  if (currentNode.cost > visited[currentKey].cost){
    return;
  }
  
  exploredNodes++;
  
  // O agente define a posição da comida como estado objetivo
  if (currentNode.x === food.x && currentNode.y === food.y) {
    totalCost = currentNode.cost;
    agentPath = reconstructPath(currentNode); // Define um caminho
    searching = false;
    agentMoving = true;
    lastMoveTime = millis();
    return;
  }
  
  // Expande o nó atual, explorando os seus vizinhos
  for (const neighborPos of getNeighbors(currentNode)) {
    const terrainType = grid[neighborPos.y][neighborPos.x];
    if (terrainType === OBSTACLE){
      continue; // Ignora obstáculos
    }
    
    let newCost;
    if (searchType === 'bfs') {
      // Para BFS, cada passo tem custo 1, ignorando o terreno.
      newCost = currentNode.cost + 1;
    } else {
        // Para os outros algoritmos (UCS, A*), usa-se o custo real do terreno.
        newCost = currentNode.cost + terrainCosts[terrainType];
    }
    const neighborKey = `${neighborPos.x},${neighborPos.y}`;

    // Se o vizinho nunca foi visitado ou se encontrámos um caminho mais barato
    if (!visited[neighborKey] || newCost < visited[neighborKey].cost) {
        visited[neighborKey] = { cost: newCost };
        parent[neighborKey] = currentNode;

        const neighborNode = {
          x: neighborPos.x, y: neighborPos.y,
          cost: newCost,
          h: manhattan(neighborPos.x, neighborPos.y, food.x, food.y)
        };
        frontier.push(neighborNode);
    }
  }
}

// Ordena de acordo com o algoritmo escolhido.
// Esta função diferencia os algoritmos de busca.
function applySearchStrategy() {
  if (searchType === 'bfs') {
      frontier.sort((a, b) => b.cost - a.cost); 
      return;
  }
  if (searchType === 'dfs'){
    return; // DFS usa pilha (LIFO).
  }
  // Ordena de forma que o melhor elemento fique no final do array (para usar `pop()`)
  frontier.sort((a, b) => {
    if (searchType === 'ucs'){
       return b.cost - a.cost; // Custo Uniforme: prioriza menor g(n)
    }
    if (searchType === 'greedy'){
      return b.h - a.h; // Gulosa: prioriza menor h(n)
    }
    if (searchType === 'astar'){
      return (b.cost + b.h) - (a.cost + a.h); // A*: prioriza menor f(n) = g(n) + h(n)
    }
  });
}


// FUNÇÕES UTILITÁRIAS DE PATHFINDING
// Descrição: Funções de apoio que são usadas pelos algoritmos de busca.

// Reconstrói o caminho do destino até à origem
function reconstructPath(destination) {
  const path = [];
  let current = destination;
  while (current) {
    path.push(current);
    current = parent[`${current.x},${current.y}`];
  }
  return path.reverse(); // Inverte para ter o caminho da origem ao destino
}

// Retorna os vizinhos válidos (cima, baixo, esquerda, direita) de uma posição.
function getNeighbors(pos) {
  const dirs = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
  const result = [];
  for (const d of dirs) {
    const nx = pos.x + d.x;
    const ny = pos.y + d.y;
    if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        result.push({ x: nx, y: ny });
    }
  }
  return result;
}

// Calcula a Distância de Manhattan
function manhattan(x1, y1, x2, y2) {
  return abs(x1 - x2) + abs(y1 - y2);
}