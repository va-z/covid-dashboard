const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, options) => {
  const isProd = options.mode === 'production';

  const htmlWebpackPluginConfig = {
    template: path.resolve(__dirname, './src/template.html'),
    filename: 'index.html',
    title: 'COVID-dashboard',
    favicon: path.resolve(__dirname, './src/assets/favicon.ico'),
    meta: {
      'Content-Security-Policy': {
        'http-equiv': 'x-ua-compatible',
        content: 'ie=edge',
      },
      description: {
        name: 'description',
        content: 'Detailed COVID-19 stats',
      },
    },
  };

  const config = {
    mode: isProd ? 'production' : 'development',
    devtool: !isProd && 'source-map',
    watch: !isProd,
    entry: ['@babel/polyfill', path.resolve(__dirname, './src/main.js')],
    output: {
      publicPath: '',
      path: path.resolve(__dirname, './dist'),
      filename: '[name].bundle.js',
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, './dist'),
      open: true,
      compress: true,
      hot: true,
      port: 8080,
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(?:ico|gif|png|jpe?g)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
        {
          test: /\.(scss|css)$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    optimization: {
      minimize: isProd,
      minimizer: [new OptimizeCssAssetsPlugin(), '...'],
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(htmlWebpackPluginConfig),
      new MiniCssExtractPlugin({ filename: 'style.css' }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };

  return config;
};
