# Quantum-Linear-Programming-Solver [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.7972044.svg)](https://doi.org/10.5281/zenodo.7972044)

Final project of my computer science degree. I got a score of **9.5/10**. 
A quantum algorithm capable of solving integer linear programming problems using Qiskit.
It has two parts:
- Backend: Written in Python, uses Qiskit for quantum algorithm QAOA (Quantum Approximate Optimization Algoritm)
- Frontend: Written in Typescript using React. Provides a graphical interface where the user can enter ILP problems with restrictions and visualize the solutions (including quantum associated quantum circuit)

# Images

The project implements a grammar to recognize mathematical formulas:
![solver1](./files/solver1.png)

It also can read those formulas from files:
![solver3](./files/solver3.png)

And you can customize optimization paremeters:
![solver4](./files/solver4.png)

# Examples
Write a formula like:
```python
**minimize** x_0 + x_1 + 2(x_0 + x_1 + s_0 - 1)^2
**subject to** 0 <= x_0 <= 1, 0 <= x_1 <= 1, 0 <= s_0 <= 1
```
Click on **Run** (see first image).

# Installation
You need to install Docker to use this app, see [https://www.docker.com/](https://www.docker.com/).

1. git clone https://github.com/sanchezhs/TFG.git && cd TFG
2. cd frontend && npm install && npm run build
3. cd ..
4. docker−compose up −d −−build
5. In the browser, go to localhost:3000
