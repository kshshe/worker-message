const path = require("path");

module.exports = {
  entry: {
    client: path.resolve("src/browserSide.js"),
    worker: path.resolve("src/workerSide.js")
  },
  mode: "production",
  output: {
    path: path.resolve("lib"),
    filename: "[name].worker-message.min.js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader"
      }
    ]
  }
};
