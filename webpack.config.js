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
            filename: "bundle.js"
        },
        plugins: [],
        target: "electron-renderer"
    },
    // {
    //     entry: path.resolve(__dirname, "app/entry.js"),
    //     module: {
    //         rules: [
    //             {
    //                 test: /\.(js|jsx)$/,
    //                 exclude: /(node_modules|bower_components)/,
    //                 loader: "babel-loader",
    //                 options: { presets: ["@babel/env", "@babel/preset-react"] }
    //             }
    //         ]
    //     },
    //     resolve: {
    //         extensions: ["*", ".js", ".jsx"]
    //     },
    //     output: {
    //         path: path.resolve(__dirname, "dist/"),
    //         publicPath: "/dist/",
    //         filename: "bundle.js"
    //     },
    //     plugins: [],
    //     target: "electron-renderer"
    // },
];
