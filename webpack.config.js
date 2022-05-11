const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const devMode = process.env.NODE_ENV !== 'production';
const path = require('path');

module.exports = {
  mode: isProduction ? 'production' : 'development',
  bail: isProduction,
  // devtool: 'source-map',
  context: __dirname,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name][hash].js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(sa|sc|c)ss$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  devServer: {
    open: true,
    port: 8008,
    historyApiFallback: true,
    inline: true,
    hot: true,
    watchContentBase: true,
    compress: true,
    overlay: true,
    transportMode: 'sockjs',
    contentBase: './public',
  },
  performance: {
    hints: false,
  },
  target: 'web',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        // options: {
        //   name: "[hash].[ext]",
        // },
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: 'defaults',
                  },
                ],
                '@babel/preset-react',
              ],

            },
          },
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|j?g|svg|gif|jpg|ico)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name][hash].css',
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: './src/images/logo.png',
    }),
    // new ForkTsCheckerWebpackPlugin({
    //   async: false,
    // }),
    // new ESLintPlugin({
    //   extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
    //   formatter: require.resolve('react-dev-utils/eslintFormatter'),
    //   eslintPath: require.resolve('eslint'),
    //   failOnError: false,
    //   emitWarning: true,
    //   fix: true,
    // }),

  ],
};
