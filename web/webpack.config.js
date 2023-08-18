const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const appdir = path.resolve(__dirname, '../');

module.exports = {
  target: 'web',
  entry: [
    path.resolve(__dirname, './src/index.js'),
    path.resolve(appdir, './app.json')
  ],
  output: {
    filename: 'bloom.bundle.js',
    // publicPath: '/prod/',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HTMLPlugin({
      title: 'Bloom | Visual Editor',
      template: path.resolve(__dirname, 'dist/index.html')
    })],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|oft)$/i,
        type: 'asset/resource',
      }
    ]
  }
}
