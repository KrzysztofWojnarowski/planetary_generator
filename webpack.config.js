const path = require('path');
const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    resolve: {
        extensions: [".js"],
    },
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyWebPackPlugin({
            patterns:

                [
                    { from: "src/assets", to: "assets" }
                ]
        }
        )
    ]
};