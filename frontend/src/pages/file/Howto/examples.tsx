export const fullExampleMin = {
  seed: "seed = 1234",
  lb: "lb = 0",
  ub: "up = 10",
  circuitDepth: "p = 1",
  objetive: "\\text{minimize } x + y - z",
  constraints: ["x \\leq 1", "2x + y \\leq 0", "z \\leq 0", "x + y + z = 0"],
};
export const fullExampleMax = {
  seed: "seed = 500",
  lb: "lb = -5",
  ub: "up = 10",
  circuitDepth: "p = 1",
  objetive: "\\text{maximize } x + y - z",
  constraints: ["x \\leq 1", "2x + y \\leq 0", "z \\leq 0", "x + y + z = 0"],
};
export const exampleMin = {
  seed: 'rng \\text{ } seed',
  lb: "bound",
  ub: "upper bound",
  circuitDepth: "depth",
  objetive: "\\text{minimize: } f(x_1, x_2, \\dots, x_m)",
  constraints: ["constraint \\quad 1", "constraint \\quad 2", "\\quad \\quad \\vdots", "constraint \\quad n"],
};
export const exampleMax = {
  seed: 'rng \\text{ } seed',
  lb: "lower bound",
  ub: "upper bound",
  circuitDepth: "depth",
  objetive: "\\text{minimize: } f(x_1, x_2, \\dots, x_m)",
  constraints: ["constraint \\quad 1", "constraint \\quad 2", "\\quad \\quad \\vdots", "constraint \\quad n"],
};
