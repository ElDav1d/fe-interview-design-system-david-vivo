import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export type TokenGroup = {
  [name: string]: { value: string };
};

export type Tokens = {
  [group: string]: TokenGroup;
};

export const generateCSSFromTokens = (tokens: Tokens): string => {
  let css = ":root {\n";
  for (const [group, values] of Object.entries(tokens)) {
    for (const [name, { value }] of Object.entries(values)) {
      css += createCSSVariable(group, name, value);
    }
  }
  css += "}\n";
  return css;
};

const createCSSVariable = (
  group: string,
  name: string,
  value: string
): string => {
  const varName = `--${group}-${formatTokenName(name)}`;
  return `  ${varName}: ${value};\n`;
};

const formatTokenName = (name: string): string => {
  return name.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
};

const validateTokens = (tokens: any): tokens is Tokens => {
  if (typeof tokens !== "object" || tokens === null) {
    return false;
  }
  for (const [groupName, group] of Object.entries(tokens)) {
    if (typeof group !== "object" || group === null) {
      throw new Error(`Invalid token group '${groupName}': must be an object`);
    }
    for (const [tokenName, token] of Object.entries(group as any)) {
      if (!validateToken(token)) {
        throw new Error(
          `Invalid token '${groupName}.${tokenName}': must be an object with a 'value' string property`
        );
      }
    }
  }
  return true;
};

const validateToken = (token: any): token is { value: string } => {
  if (typeof token !== "object" || token === null) {
    return false;
  }
  if (!("value" in token) || typeof token.value !== "string") {
    return false;
  }
  for (const key of Object.keys(token)) {
    if (key !== "value") {
      if (typeof token[key] !== "string") {
        return false;
      }
    }
  }
  return true;
};

export const buildTokens = (): void => {
  // Get the current file path and directory name in an ES module context
  // (since __filename and __dirname are not available by default)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Build the absolute path to the design tokens JSON file and read/parse its contents
  const tokensPath = path.join(__dirname, "../design-tokens.json");
  const rawTokens = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));

  if (!validateTokens(rawTokens)) {
    throw new Error("Invalid tokens format");
  }

  // Cast the validated tokens, generate the CSS variables string, and determine the output path
  const tokens: Tokens = rawTokens;
  const css = generateCSSFromTokens(tokens);
  const outPath = path.join(__dirname, "../src/styles/variables.css");

  // Ensure the directory exists
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, css);
  console.log("✅ variables.css newly generated!");
};

// Allow the script to be run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildTokens();
}
