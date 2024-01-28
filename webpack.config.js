const path = require('path');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
    entry: './src/js/index.ts',
    devtool: argv.mode === 'development' ? 'eval-source-map' : undefined,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    stats: 'minimal',
    // Disable the warnings that our bundle is too big.
    performance: {
        hints: false
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
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            hash: true,
            minify: false
        })
    ],
    optimization: {
        // Setting minimize to true, causes output bunde to crash
        minimize: false,
    },
    devServer: {
        static: false,
        client: {
            logging: "warn",
            overlay: {
                errors: true,
                warnings: false,
            },
            progress: true,
        },
        compress: true,
        port: 3000,
      },
});