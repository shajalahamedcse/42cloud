const path = require('path');

const proxy_host = process.env.openstack_host;
console.log(proxy_host);

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
    publicPath: '/',
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
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
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
    public: '127.0.0.1:9000',
    allowedHosts: ['0.0.0.0'],
    historyApiFallback: true,
    proxy: {
      '/os-identity': {
        target: 'http://' + proxy_host + ':5000',
        pathRewrite: {
          '/os-identity': ''
        }
      },
      '/os-compute': {
        target: 'http://' + proxy_host + ':8774',
        pathRewrite: {
          '/os-compute': ''
        }
      },
      '/os-image': {
        target: 'http://' + proxy_host + ':9292',
        pathRewrite: {
          '/os-image': ''
        }
      },
      '/os-volume': {
        target: 'http://' + proxy_host + ':8776',
        pathRewrite: {
          '/os-volume': ''
        }
      }
    }
  },

  devtool: 'source-map'
};