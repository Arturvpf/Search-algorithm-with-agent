// GLOBAL CONFIGURATION AND CONSTANTS
// Description: This file contains all constants and parameters that
// define the behavior and appearance of the simulation.

const cols = 25;
const rows = 25;
const cellSize = 18;

// Terrain type definition
const OBSTACLE = 'obstacle';
const SAND = 'sand';
const MUD = 'mud';
const WATER = 'water';

// Costs associated with each terrain type.
const terrainCosts = {
  [SAND]: 1,
  [MUD]: 5,
  [WATER]: 10,
  [OBSTACLE]: Infinity
};


// Map appearance.
const terrainColors = {
  [OBSTACLE]: '#424242',
  [SAND]:     '#DCDCCF',
  [MUD]:      '#AD6853',
  [WATER]:    '#299BD5',
};
