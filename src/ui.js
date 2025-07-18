// GESTÃO DA UI
// Descrição: Responsável por criar e configurar os elementos
// como botões e seletores.

function setupUI() {
    const uiContainer = createDiv();
    uiContainer.parent('main');
    uiContainer.style('display', 'flex');
    uiContainer.style('gap', '20px');
    uiContainer.style('align-items', 'center');

    // Seletor para o tipo de algoritmo
    const selectGroup = createDiv().parent(uiContainer);
    createP('Algoritmo:').parent(selectGroup);
    searchTypeSelect = createSelect().parent(selectGroup);
    searchTypeSelect.option('A*', 'astar');
    searchTypeSelect.option('Custo Uniforme', 'ucs');
    searchTypeSelect.option('Gulosa', 'greedy');
    searchTypeSelect.option('Largura (BFS)', 'bfs');
    searchTypeSelect.option('Profundidade (DFS)', 'dfs');
    searchTypeSelect.selected(searchType);
    searchTypeSelect.changed(resetSimulation); // Reinicia a simulação ao mudar

    // Slider para controlar a velocidade da animação
    const sliderGroup = createDiv().parent(uiContainer);
    createP('Velocidade:').parent(sliderGroup);
    searchSpeedSlider = createSlider(1, 60, 30).parent(sliderGroup);

    // Botão para reiniciar a simulação com um novo mapa
    resetButton = createButton('Gerar Novo Mapa').parent(uiContainer);
    resetButton.mousePressed(resetSimulation);
}
