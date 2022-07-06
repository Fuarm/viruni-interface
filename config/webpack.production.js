const TerserPlugin = require('terser-webpack-plugin');
const os = require('os');
const { join, resolve } = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// optimize-css-assets-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  output: {
    path: join(__dirname, '../dist/assets'),
    publicPath: '/',
    filename: 'scripts/[name].[contenthash:5].bundule.js',
    assetModuleFilename: 'images/[name].[hash:5][ext]',
  },
  optimization: {
    minimize: true,
    minimizer: [
      //esbuild prepack压缩
      new TerserPlugin({
        parallel: os.cpus().length - 1,
      }),
      new CssMinimizerPlugin({
        parallel: os.cpus().length - 1,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '虚拟宇宙 u-react-generator',
      filename: 'index.html',
      template: resolve(__dirname, '../src/web/index-prod.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
};
