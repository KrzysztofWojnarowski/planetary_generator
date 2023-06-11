const path = require('path');

module.exports = {
    mode:"development",
    devtool:"eval-source-map",
    resolve: {
        extensions: [".js"],
    },
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};