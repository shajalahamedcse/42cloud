const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', 'jsx', '.css'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },

  context: path.resolve(__dirname, 'src'),

  entry: './index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'env', 'stage-2'],
              plugins: [
                ["import", { libraryName: "antd", style: true }]
              ]
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // {
      //   test: /\.(jpg|png|svg)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 5000
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash].[ext]'
            }
          }
        ]

      }
    ]
  },

  devServer: {
    contentBase: [path.join(__dirname, "build")],
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    public: '192.168.2.110:9000',
    allowedHosts: ['0.0.0.0'],
    historyApiFallback: true,
    proxy: {
      '/os-identity': {
        target: 'http://192.168.2.199:5000',
        pathRewrite: {
          '/os-identity': ''
        }
      },
      '/os-compute': {
        target: 'http://192.168.2.199:8774',
        pathRewrite: {
          '/os-compute': ''
        }
      }
    }
  },

  devtool: 'source-map'
};