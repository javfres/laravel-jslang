const path = require('path');

module.exports = {
  entry: __dirname + '/src/js/trans.js',
  output: {
    filename: 'trans-compiled.js',
    path: path.resolve(__dirname, 'dist'),
  },
};