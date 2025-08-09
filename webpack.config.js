const path = require('path');
const SpinSdkPlugin = require("@fermyon/spin-sdk/plugins/webpack")

module.exports = {
    entry: './src/index.tsx',
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
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        module: true,
        library: {
            type: "module",
        }
    },
    plugins: [
        new SpinSdkPlugin()
    ],
    optimization: {
        minimize: false
    },
    performance: {
        hints: false,
    }
};
