const path = require('path');


const common = {
    //mode: 'development',
    mode: 'production',
    resolve: {
        extensions: ['.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};



module.exports = [
    {
        ...common,
        entry: path.resolve(__dirname, './src/ts/index.ts'),
        output: {
            filename: 'trans-compiled.js',
            path: path.resolve(__dirname, 'dist'),
        },
    },
];