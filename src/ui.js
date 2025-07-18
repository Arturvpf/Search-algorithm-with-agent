// UI MANAGEMENT
// Description: Responsible for creating and configuring elements
// such as buttons and selectors.

function setupUI() {
    const uiContainer = createDiv();
    uiContainer.parent('main');
    uiContainer.style('display', 'flex');
    uiContainer.style('gap', '20px');
    uiContainer.style('align-items', 'center');

    // Selector for algorithm type
    const selectGroup = createDiv().parent(uiContainer);
    createP('Algoritmo:').parent(selectGroup);
    searchTypeSelect = createSelect().parent(selectGroup);
    searchTypeSelect.option('A*', 'astar');
    searchTypeSelect.option('Custo Uniforme', 'ucs');
    searchTypeSelect.option('Gulosa', 'greedy');
    searchTypeSelect.option('Largura (BFS)', 'bfs');
    searchTypeSelect.option('Profundidade (DFS)', 'dfs');
    searchTypeSelect.selected(searchType);
    searchTypeSelect.changed(resetSimulation); // Restarts simulation when changed

    // Slider to control animation speed
    const sliderGroup = createDiv().parent(uiContainer);
    createP('Velocidade:').parent(sliderGroup);
    searchSpeedSlider = createSlider(1, 60, 30).parent(sliderGroup);

    // Button to restart simulation with a new map
    resetButton = createButton('Gerar Novo Mapa').parent(uiContainer);
    resetButton.mousePressed(resetSimulation);
}
