// MAP GENERATION
// Description: Responsible for generating a random map, but ensuring it
// is always solvable (i.e., there are no inaccessible areas).

// Generates a map using a variation of Prim's algorithm to ensure
// that all paths are connected.
function generateSolvableMap() {
  grid = Array(rows).fill(0).map(() => Array(cols).fill(OBSTACLE));
      
  // The agent appears at a random position
  agent = {
    x: floor(random(1, cols - 1)),
    y: floor(random(1, rows - 1))
  };
      
  const walls = [];
  grid[agent.y][agent.x] = SAND; // The agent starts on sand
      
  // Adds adjacent walls to the starting point to the wall list
  getNeighbors(agent).forEach(wall => walls.push(wall));
  while (walls.length > 0) {
    const randomIndex = floor(random(walls.length));
    const wall = walls.splice(randomIndex, 1)[0];
        
    // Checks how many neighbors of the wall are already passages
    const passages = getNeighbors(wall).filter(n => grid[n.y][n.x] !== OBSTACLE);

    // If the wall separates an explored area from an unexplored one, turn it into a passage
    if (passages.length === 1) {
      let r = random(); // Randomly selects terrain type
      if (r < 0.6){
        grid[wall.y][wall.x] = SAND;
      }
      else if (r < 0.8){
        grid[wall.y][wall.x] = MUD;
      }
      else{
        grid[wall.y][wall.x] = WATER;
      }
           
      // Adds new adjacent walls to the list
      getNeighbors(wall).forEach(n => {
        if (grid[n.y][n.x] === OBSTACLE){
          walls.push(n);
          if (random() < 0.1){
            let x = random();
            grid[n.y][n.x] = (x < 0.6) ? SAND : (x < 0.8) ? MUD : WATER;
          }
        }
      });
    }
  }
}

// Position food in a valid cell
function placeFood() {
  do {
    food = {
      x: floor(random(cols)),
      y: floor(random(rows))
    };
  } while (grid[food.y][food.x] === OBSTACLE || (food.x === agent.x && food.y === agent.y)
  );
}