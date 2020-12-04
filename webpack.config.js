const path = require("path");

const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  target: "node",
  entry: {
    a: path.resolve(
      __dirname,
      "./src/lambda/handler/apig-trigger/apig-a-handler.ts"
    ),
    b: path.resolve(
      __dirname,
      "./src/lambda/handler/apig-trigger/apig-b-handler.ts"
    ),
  },
  externals: [
    nodeExternals({
      modulesFromFile: {
        exclude: ["dependencies"],
        include: ["devDependencies"],
      },
    }),
  ],
  output: {
    filename: "[name]/index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs2",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
