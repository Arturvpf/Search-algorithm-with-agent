// GERAÇÃO DO MAPA
// Descrição: Responsável por gerar um mapa aleatório, mas garantindo que
// seja sempre solucionável (i.e., não há áreas inacessíveis).

// Gera um mapa usando uma variação do algoritmo de Prim() para garantir
// que todos os caminhos estejam conectados.
function generateSolvableMap() {
  grid = Array(rows).fill(0).map(() => Array(cols).fill(OBSTACLE));
      
  // O agente aparece em uma posição aleatória
  agent = {
    x: floor(random(1, cols - 1)),
    y: floor(random(1, rows - 1))
  };
      
  const walls = [];
  grid[agent.y][agent.x] = SAND; // O agente começa em areia
      
  // Adiciona as paredes adjacentes ao ponto inicial à lista de paredes
  getNeighbors(agent).forEach(wall => walls.push(wall));
  while (walls.length > 0) {
    const randomIndex = floor(random(walls.length));
    const wall = walls.splice(randomIndex, 1)[0];
        
    // Verifica quantos vizinhos da parede já são passagens
    const passages = getNeighbors(wall).filter(n => grid[n.y][n.x] !== OBSTACLE);

    // Se a wall separar uma área explorada de uma não explorada, transforma-a em passagem
    if (passages.length === 1) {
      let r = random(); // Sorteia o tipo de terreno
      if (r < 0.6){
        grid[wall.y][wall.x] = SAND;
      }
      else if (r < 0.8){
        grid[wall.y][wall.x] = MUD;
      }
      else{
        grid[wall.y][wall.x] = WATER;
      }
           
      // Adiciona as novas paredes adjacentes à lista
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

// Posicionar a comida numa célula válida
function placeFood() {
  do {
    food = {
      x: floor(random(cols)),
      y: floor(random(rows))
    };
  } while (grid[food.y][food.x] === OBSTACLE || (food.x === agent.x && food.y === agent.y)
  );
}