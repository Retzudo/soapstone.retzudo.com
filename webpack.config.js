module.exports = {
  devtool: 'inline-source-map',
  entry: './frontend-js/build.js',
  output: {
    path: __dirname + '/public/js',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};
