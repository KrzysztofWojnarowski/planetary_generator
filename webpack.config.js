const path = require('path');

module.exports = {
    resolve: {
        extensions: [".js"]
    },
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};