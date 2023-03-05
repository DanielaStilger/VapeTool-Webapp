/* config-overrides.js */
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TSCONFIG_PATH = path.resolve(__dirname, 'tsconfig.json');

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.resolve.plugins = [
        new TsconfigPathsPlugin({
            configFile: TSCONFIG_PATH
        })
    ];
    return config;
}