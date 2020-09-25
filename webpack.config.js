const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  devtool: 'sourcemap',
  entry: {
    index: path.resolve(__dirname, 'src/index'),
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    library: '',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      }
    ]
  },
  externals: [
    nodeExternals(),
    'react',
  ],
};
