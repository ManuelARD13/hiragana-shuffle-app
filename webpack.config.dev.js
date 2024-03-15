const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
  },
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      common: path.resolve(__dirname, "./src/common/"),
      components: path.resolve(__dirname, "./src/components/"),
      context: path.resolve(__dirname, "./src/context/"),
      hooks: path.resolve(__dirname, "./src/hooks/"),
      img: path.resolve(__dirname, "./src/img/"),
      layout: path.resolve(__dirname, "./src/layout/"),
      models: path.resolve(__dirname, "./src/models/"),
      music: path.resolve(__dirname, "./src/music/"),
      sass: path.resolve(__dirname, "./src/sass/"),
      services: path.resolve(__dirname, "./src/services/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|mp3|svg)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new dotenv({ path: "./.env.local" }),
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 3006,
  },
};
