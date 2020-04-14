const path = require("path")
const webpack = require("webpack")

module.exports = [
  {
    entry: path.resolve(__dirname, "app/entry.js"),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: { presets: ["@babel/env", "@babel/preset-react"] }
        }
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    },
    output: {
      path: path.resolve(__dirname, "dist/"),
      publicPath: "/dist/",
      filename: "renderer-bundle.js"
    },
    plugins: [],
    target: "electron-renderer"
  },
  {
    entry: path.resolve(__dirname, "app/main.js"),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: { presets: ["@babel/env"] }
        }
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    },
    output: {
      path: path.resolve(__dirname, "dist/"),
      publicPath: "/dist/",
      filename: "main-bundle.js"
    },
    plugins: [],
    target: "electron-main",
    node: {
      __dirname: false,
      __filename: false
    }
  }
];
