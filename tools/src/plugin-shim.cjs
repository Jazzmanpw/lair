const createJiti = require('jiti');
const path = require('node:path');

let pluginPromise;

const jiti = createJiti(__filename, {
  fsCache: path.join(__dirname, '../../node_modules/.cache/jiti'),
});

function loadPlugin() {
  // Nx `require()`s plugin entries, so the entry itself must stay CJS.
  // `jiti` lets the shim load the TS source on both local machines and in Codex.
  pluginPromise ??= jiti.import(path.join(__dirname, 'plugin.ts'));

  return pluginPromise;
}

module.exports.createNodesV2 = [
  '**/package.json',
  async (...args) => {
    // Keep the shim thin: defer the actual plugin logic to plugin.ts.
    const plugin = await loadPlugin();
    return plugin.createNodesV2[1](...args);
  },
];
