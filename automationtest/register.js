const { existsSync } = require("fs-extra");
const { resolve } = require("path");

function registerTSConfig(dir) {
  const configPath = resolve(dir, "tsconfig.json");
  if (existsSync(configPath)) {
    const tsconfig = require(configPath);
    require("ts-node").register({
      transpileOnly: true,
      compilerOptions: tsconfig.compilerOptions,
    });
  } else {
    throw new Error(`Can't register TypeScript, ${configPath} doesn't exist`);
  }
}
const currentDir = process.cwd();

registerTSConfig(currentDir);

module.exports = (dir) => {
  registerTSConfig(dir);

};
