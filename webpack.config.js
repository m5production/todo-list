const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports ={
  mode: 'development',
  target: 'web',
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(sc|c)ss$/i,
        use: [
          "style-loader", 
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg)$/i,
        type: 'asset/resource',
        generator:{
          filename: path.join('assets', 'img', '[name][ext]')
        } 
      },
      {
        test: /\.(ttf|woff2*|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: path.join('assets', 'fonts', '[name][ext]'),
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ]
  },
}