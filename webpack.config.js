const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    mode: process.env.NODE_ENV, // sets the environment mode NODE_ENV (note: this should be development based on package.json script)
    entry: './src/main/main.ts', // set entry point to main process
    target: 'electron-main',
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        include: /src/,
        use: [
          { 
            loader: 'ts-loader' 
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          }
        ] // use the ts-loader for typescript files
      }]
    },
    output: {
      path: path.resolve(__dirname, 'dist/main'), // where output files will be saved
      filename: 'bundle.js' // primary output bundle filename
    }
  }, 
  {
    mode: process.env.NODE_ENV, // sets the environment mode NODE_ENV (note: this should be development based on package.json script)
    entry: './src/renderer/app.tsx', // set entry point to renderer
    target: 'electron-renderer',
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          include: /src/,
          use: [
            { 
              loader: 'ts-loader' 
            },
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            }
          ],
          exclude: /node_modules/, // use the ts-loader for typescript files
        },
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist/renderer'), // where output files will be saved
      filename: 'app.js' // primary output bundle filename
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/renderer/index.html'
      })
    ]
  }
];