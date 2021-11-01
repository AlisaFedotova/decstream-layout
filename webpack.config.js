const webpack = require("webpack");
const path = require('path');
const {merge} = require('webpack-merge');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devServer = require('./webpack/dev_server.conf');

module.exports = (env, argv) => {
  const devMode = (argv || {}).mode !== 'production';

  return merge([
    {
      entry: './src/main.ts',
      devtool: devMode ? 'inline-source-map' : false,
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle-[contenthash].js',
        clean: true,
      },
      performance: {
        hints: false
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
          'project_config': devMode ? path.resolve('./src/config/project_config') : path.resolve('./src/config/project_config_prod'),
        }
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            enforce: devMode ? 'post' : 'pre',
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
              configFile: devMode ? 'tsconfig.json' : 'tsconfig.prod.json',
              transpileOnly: !devMode,
            },
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {},
              },
              'css-loader',
              'postcss-loader',
              'sass-loader',
            ],
          },
          {
            test: /\.svg$/,
            use: [
              { loader: 'svg-sprite-loader', options: {} },
              'svg-transform-loader',
              'svgo-loader'
            ],
          },
          {
            test: /\.(gif|png|jpg|jpeg|svg)?$/,
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: 'Revision',
          template: 'src/index.html',
          filename: devMode ? 'index.html' : 'revision.html',
        }),
        new HtmlWebpackPlugin({
          template: 'src/members.html',
          filename: 'members.html'
        }),
        new HtmlWebpackPlugin({
          template: 'src/member.html',
          filename: 'member.html'
        }),
        new HtmlWebpackPlugin({
          template: 'src/auth.html',
          filename: 'auth.html'
        }),
        new HtmlWebpackPlugin({
          template: 'src/JKH.html',
          filename: 'JKH.html'
        }),
        new HtmlWebpackPlugin({
          template: 'src/JKH-no-device.html',
          filename: 'JKH-no-device.html'
        }),
        new HtmlWebpackPlugin({
          template: 'src/components.html',
          filename: 'components.html'
        }),
        new HtmlWebpackPlugin({
          template: 'src/graph.html',
          filename: 'graph.html'
        }),
        new HtmlWebpackPlugin({
          template: 'src/guard.html',
          filename: 'guard.html'
        }),
        new HtmlWebpackPlugin({
          template: 'src/spinner.html',
          filename: 'spinner.html'
        }),
        new HtmlWebpackPlugin({
          template: 'src/devices.html',
          filename: 'devices.html'
        }),
        new HtmlWebpackPlugin({
          template: 'src/device.html',
          filename: 'device.html'
        }),
        new MiniCssExtractPlugin({
          filename: 'style-[contenthash].min.css',
        }),
        new webpack.ProvidePlugin({
          'projConfig': 'project_config',
        }),
        new SpriteLoaderPlugin(),
      ],
      optimization: {
        minimize: !devMode,
        minimizer: devMode ? [] : [
          new CssMinimizerPlugin(),
        ]
      },
    },
    devServer(),
  ]);
};
