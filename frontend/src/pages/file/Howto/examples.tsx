export const fullExampleMin = {
  objetive: "\\text{minimize } x + y - z",
  constraints: ["x \\leq 1", "2x + y \\leq 0", "z \\leq 0", "x + y + z = 0"],
};
export const fullExampleMax = {
  objetive: "\\text{maximize } x + y - z",
  constraints: ["x \\leq 1", "2x + y \\leq 0", "z \\leq 0", "x + y + z = 0"],
};
export const exampleMin = {
  objetive: "\\text{minimize: } f(x_1, x_2, \\dots, x_m)",
  constraints: ["constraint \\quad 1", "constraint \\quad 2", "\\quad \\quad \\vdots", "constraint \\quad n"],
};
export const exampleMax = {
  objetive: "\\text{maximize: } f(x_1, x_2, \\dots, x_m)",
  constraints: ["constraint \\quad 1", "constraint \\quad 2", "\\quad \\quad \\vdots", "constraint \\quad n"],
};
