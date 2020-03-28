const path = require('path')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'
const pkg = require('./package.json')

module.exports = env => {
  return {
    stats: 'minimal',
    mode: 'development',
    entry: {
      app: './src/index.js',
    },
    resolve: {
      extensions: ['.mjs', '.js', '.svelte', '.json', '.css'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        routes: path.resolve(__dirname, 'src/routes/'),
        "components": path.resolve(__dirname, 'src/components/'),
        tests: path.resolve(__dirname, 'src/tests/'),
        "stores": path.resolve(__dirname, 'src/stores/'),
        pages: path.resolve(__dirname, 'src/pages/'),
      },
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      port: 9001,
      open: true,
      overlay: {
        warnings: true,
        errors: true,
      },
    },
    output: {
      path: __dirname + '/build',
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            enforce: true,
          },
        },
      },
    },
    module: {
      rules: [{
          test: /\.svelte$/,
          exclude: /node_modules/,
          use: {
            loader: 'svelte-loader',
            options: {
              emitCss: true,
              hotReload: true,
            },
          },
        },
        {
          test: /('.mjs|.js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader?cacheDirectory=true',
          },
        },
/* */
{
          test: /\.css$/, //对目录里面非node_modules，src/common目录下面的css文件开启模块化，页面里引用时候以模块方式引用
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[path]__[name]__[local]___[hash:base64:5]',
                }
              }
            }
          ],
          exclude: [ //排除这两个文件夹下面的css文件
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src/assets/css')
          ]
        },  //对node_modules,src/common目录下面的css文件以全局方式引用，应用到页面
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
          include: [ //样式只应用到这两个文件夹下面的css文件中
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src/assets/css')
          ]

        },
        {
          test: /\.(gif|png|jpe?g|svg|woff|ttf|woff2)$/,
          use: [{
            loader: 'url-loader',
            options: {
              outputPath: 'images/', // 指定图片输入的文件夹images
              publicPath: '/', // 指定获取图片的路径/images/
              limit: 4000,
              name: '[path][name].[ext]',
            },
          }, ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
      }),
      new HtmlWebpackPlugin({
        title: pkg.name,
        template: './index.html',
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: !!(env && env.analyze),
      }),
    ],
    devtool: prod ? false : 'source-map',
  }
}