export const fullExampleMin = {
  comment: "",
  circuitDepth: "p = 1",
  type: "minimize",
  objective: "10x + 20y - 30z",
  constraints: ["x <= 1", "2x + y <= 0", "z <= 0", "x + y + z = 0"],
};
export const fullExampleMax = {
  comment: "",
  circuitDepth: "p = 1",
  type: "maximize",
  objective: "10x + 20y - 30z",
  constraints: ["x <= 1", "2x + y <= 0", "z <= 0", "x + y + z = 0"],
};
export const exampleMin = {
  comment: "",
  circuitDepth: "Circuit depth = p > 0",
  type: "minimize",
  objective: "f(x1, x2, ..., xm)",
  constraints: ["constraint 1", "constraint 2", "...", "constraint n"],
};
export const exampleMax = {
  comment: "",
  circuitDepth: "Circuit depth = p > 0",
  type: "maximize",
  objective: "f(x1, x2, ..., xm)",
  constraints: ["constraint 1", "constraint 2", "...", "constraint n"],
};
