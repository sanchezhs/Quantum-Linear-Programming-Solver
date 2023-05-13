export const fullExampleMin = {
  comment: "",
  circuitDepth: "p = 1",
  type: "\\text{minimize }",
  objective: "10x + 20y - 30z",
  constraints: ["x \\leq 1", "2x + y \\leq 0", "z \\leq 0", "x + y + z = 0"],
};
export const fullExampleMax = {
  comment: "",
  circuitDepth: "p = 1",
  type: "\\text{maximize }",
  objective: "10x + 20y - 30z",
  constraints: ["x \\leq 1", "2x + y \\leq 0", "z \\leq 0", "x + y + z = 0"],
};
export const exampleMin = {
  comment: "",
  circuitDepth: "\\text{Circuit depth} = p > 0",
  type: "\\text{minimize: }",
  objective: "f(x_1, x_2, \\dots, x_m)",
  constraints: ["constraint \\quad 1", "constraint \\quad 2", "\\quad \\quad \\vdots", "constraint \\quad n"],
};
export const exampleMax = {
  comment: "",
  circuitDepth: "\\text{Circuit depth} = p > 0",
  type: "\\text{minimize: }",
  objective: "f(x_1, x_2, \\dots, x_m)",
  constraints: ["constraint \\quad 1", "constraint \\quad 2", "\\quad \\quad \\vdots", "constraint \\quad n"],
};
