
var webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        entry: __dirname + '/src/js/trans.js'
    },
    output: {
        filename: 'trans-compiled.js'
    },
    module: {
       rules: [
           {
               test: /\.js$/,
               loader: 'babel-loader',
               exclude: /node_modules/,
               query: {
                   presets: ['es2015']
               }
           }
       ]
   },
}