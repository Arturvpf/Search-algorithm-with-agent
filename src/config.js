// CONFIGURAÇÃO E CONSTANTES GLOBAIS
// Descrição: Este arquivo contém todas as constantes e parâmetros que 
// definem o comportamento e a aparência da simulação.

const cols = 25;
const rows = 25;
const cellSize = 18;

// Definição dos tipos de terreno
const OBSTACLE = 'obstacle';
const SAND = 'sand';
const MUD = 'mud';
const WATER = 'water';

// Custos associados a cada tipo de terreno.
const terrainCosts = {
  [SAND]: 1,
  [MUD]: 5,
  [WATER]: 10,
  [OBSTACLE]: Infinity
};


// Aparência do mapa.
const terrainColors = {
  [OBSTACLE]: '#424242',
  [SAND]:     '#DCDCCF',
  [MUD]:      '#AD6853',
  [WATER]:    '#299BD5',
};
