var paths = {
  LESSON1: './Lesson-1-Our-First-Component/index.js'
}

module.exports = {
  entry: paths[process.env.LESSON],
  output: {
    filename: "./build/bundle.js",
    sourceMapFilename: "./build/bundle.map"
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
}
