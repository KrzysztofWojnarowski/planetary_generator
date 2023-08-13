const path = require('path');
const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/js/index.ts',
    devtool: 'inline-source-map',
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
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