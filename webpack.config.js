'use strict';

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ids } = require('webpack');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const filename = (ext) => isDev ? `[name].[contenthash].${ext}` : `[name].${ext}`;


module.exports = {
  context: path.resolve(__dirname, ''),
  entry: {
    main: ['babel-polyfill',
      './src/index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
    filename: `./${filename('js')}`,  
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, ''),
    open: true,
    compress: true,
    hot: true,
    inline: true,
    watchContentBase: true,
    port: 3000,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd,
      },
      scriptLoading: "defer",
    }),
    new MiniCssExtractPlugin({
      filename: `./${filename('css')}`
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader',],
      },
    ]
  }
};