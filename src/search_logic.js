// SEARCH ALGORITHMS LOGIC
// Description: The core of the project. `stepSearch` executes one search step
// per frame, animating the process. `applySearchStrategy` implements the
// priority logic for each algorithm.


// Executes one step of the search animation.
function stepSearch() {
  if (frontier.length === 0) {
    console.log("Search finished: no possible path.");
    searching = false;
    return;
  }
  
  applySearchStrategy(); // Orders the frontier according to the algorithm
  const currentNode = frontier.pop(); // Removes the highest priority node
  
  const currentKey = `${currentNode.x},${currentNode.y}`;
  if (currentNode.cost > visited[currentKey].cost){
    return;
  }
  
  exploredNodes++;
  
  // The agent defines the food position as the goal state
  if (currentNode.x === food.x && currentNode.y === food.y) {
    totalCost = currentNode.cost;
    agentPath = reconstructPath(currentNode); // Defines a path
    searching = false;
    agentMoving = true;
    lastMoveTime = millis();
    return;
  }
  
  // Expands the current node, exploring its neighbors
  for (const neighborPos of getNeighbors(currentNode)) {
    const terrainType = grid[neighborPos.y][neighborPos.x];
    if (terrainType === OBSTACLE){
      continue; // Ignores obstacles
    }
    
    let newCost;
    if (searchType === 'bfs') {
      // For BFS, each step has cost 1, ignoring terrain.
      newCost = currentNode.cost + 1;
    } else {
        // For other algorithms (UCS, A*), use the real terrain cost.
        newCost = currentNode.cost + terrainCosts[terrainType];
    }
    const neighborKey = `${neighborPos.x},${neighborPos.y}`;

    // If the neighbor was never visited or if we found a cheaper path
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

// Orders according to the chosen algorithm.
// This function differentiates the search algorithms.
function applySearchStrategy() {
  if (searchType === 'bfs') {
      frontier.sort((a, b) => b.cost - a.cost); 
      return;
  }
  if (searchType === 'dfs'){
    return; // DFS uses stack (LIFO).
  }
  // Sorts so that the best element is at the end of the array (to use `pop()`)
  frontier.sort((a, b) => {
    if (searchType === 'ucs'){
       return b.cost - a.cost; // Uniform Cost: prioritizes lower g(n)
    }
    if (searchType === 'greedy'){
      return b.h - a.h; // Greedy: prioritizes lower h(n)
    }
    if (searchType === 'astar'){
      return (b.cost + b.h) - (a.cost + a.h); // A*: prioritizes lower f(n) = g(n) + h(n)
    }
  });
}


// PATHFINDING UTILITY FUNCTIONS
// Description: Support functions used by the search algorithms.

// Reconstructs the path from destination to origin
function reconstructPath(destination) {
  const path = [];
  let current = destination;
  while (current) {
    path.push(current);
    current = parent[`${current.x},${current.y}`];
  }
  return path.reverse(); // Reverses to have the path from origin to destination
}

// Returns valid neighbors (up, down, left, right) of a position.
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

// Calculates Manhattan Distance
function manhattan(x1, y1, x2, y2) {
  return abs(x1 - x2) + abs(y1 - y2);
}