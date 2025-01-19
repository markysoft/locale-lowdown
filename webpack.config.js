const path = require('path');
const SpinSdkPlugin = require("@fermyon/spin-sdk/plugins/webpack")
const WasiExtPlugin = require("@fermyon/wasi-ext/plugin")

module.exports = {
    entry: './src/spin.ts',
    experiments: {
        outputModule: true,
    },
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
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'dist.js',
        module: true,
        library: {
            type: "module",
        }
    },
    plugins: [
        new SpinSdkPlugin(),
        new WasiExtPlugin()
    ],
    optimization: {
        minimize: false
    },
};