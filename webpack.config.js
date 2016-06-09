module.exports = {
  entry: './src/app.js',
  output: {
    path: './dist/',
    filename: 'bundle.js'
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};