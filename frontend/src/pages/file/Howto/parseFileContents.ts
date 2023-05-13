/**
 * 
 * p = 1
 * seed = 3456
 * lb = 0, ub = 100
 * minimize: x
 * subject to
 * 2x + y <= 100
 * 
 */

export function parseFileContents(fileContents: string) {
    const lines = fileContents.split("\n");
    const result = {};
    let mode = null;
    
    for (const line of lines) {
      if (line === "") {
        // Skip empty lines
        continue;
      } else if (line.includes(":")) {
        // Switch to new mode based on the line containing a colon
        const [newMode, newValue] = line.split(":").map((value) => value.trim());
        result[newMode] = newValue;
        mode = newMode;
      } else if (line.includes("<") || line.includes(">") || line.includes("=")) {
        // Add new constraint to existing mode based on the line containing a comparison operator
        const [variable, constraint] = line.split(/\s+/);
        result[mode] = constraint;
      } 
    }
    console.log(result)
    return result;
}