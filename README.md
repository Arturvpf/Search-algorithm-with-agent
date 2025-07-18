# Search Algorithm with Agent

This project simulates an autonomous agent that collects food in a 2D environment, navigating through terrains with different costs and avoiding obstacles. The goal is to visualize how different search algorithms behave in various situations.

## About the Project

The simulation takes place on a randomly generated grid. In each round, the agent needs to find the path to the food using one of the available algorithms. The environment includes terrains with different costs that affect the agent's movement, and the search execution is shown in an animated, step-by-step manner.

After collecting the food, a new position is randomly generated and the process repeats automatically.

## Search Algorithms

- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- Uniform Cost Search (UCS)
- Greedy Search
- A* (A-star)

## Terrain Types

Each grid cell can contain:

- Obstacle (non-traversable)
- Sand (low cost)
- Mud (medium cost)
- Water (high cost)

## Project Structure

```
Search-algorithm-with-agent/
├── index.html              # Main page
├── style.css               # Visual interface styling
├── README.md               # Documentation
└── src/                    # Simulation source code
    ├── config.js           # Global parameters
    ├── drawing.js          # Graphic rendering
    ├── map_generator.js    # Random map generation
    ├── search_logic.js     # Algorithm implementation and search animation
    ├── sketch.js           # General simulation control
    └── ui.js               # User interface and interactions
```

## How to Run

### Online Access (Recommended)

The project can be accessed directly through the browser via the link below!

**[Click here to open the project](https://arturvpf.github.io/Search-algorithm-with-agent/)**

### Local Execution

1. Clone the repository:

```bash
git clone https://github.com/Arturvpf/Search-algorithm-with-agent.git
cd Search-algorithm-with-agent
```

2. Open the folder in Visual Studio Code.

3. With the **Live Server** extension installed, right-click on the `index.html` file and choose **"Open with Live Server"**.

4. The project will automatically load in the browser.

## Technologies

* HTML, CSS and JavaScript
* [p5.js](https://p5js.org/) (for animation)
* No external dependencies or additional installation required

## Features

* Automatic generation of environments with different terrains
* Interface to choose the search algorithm
* Animation of search execution (visited nodes, frontier, final path)
* Agent speed varies with terrain type
* New food appears automatically after each collection

## Team

Project developed for the Intelligent Systems course (UFPE):

* **Andreywid Yago Lima de Souza** — General algorithm integration and testing
* **Artur Vinícius Pereira Fernandes** — General algorithm integration and testing
* **Felipe Mateus Falcão Barreto** — Environment generation and accessibility control
* **João Pedro Mafaldo de Paula** — Movement logic and food collection
* **Matheus Ayres dos Santos** — Search animation and visual interface