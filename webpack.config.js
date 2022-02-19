const path = require("path");
const dotenv = require("dotenv");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, options) => {
  dotenv.config({
    path: env.dev ? "./dev.env" : "./.env",
  });

  return {
    mode: "development",
    entry: "./src/client/index.tsx",
    output: {
      path: path.resolve(__dirname, "build/client"),
      filename: "[name].js",
      publicPath: "/",
    },
    devtool: "inline-source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { sourceMap: false } },
            { loader: "sass-loader", options: { sourceMap: false } },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: "file-loader",
          options: {
            outputPath: "img",
            name: "[name].[ext]",
            esModule: false,
          },
        },
      ],
    },
    devServer: {
      host: "127.0.0.1",
      port: 9000,
      open: true,
      hot: true,
      proxy: {
        "/api": {
          target: "http://127.0.0.1:9001",
          changeOrigin: true,
        },
      },
      historyApiFallback: true,
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new HtmlWebpackPlugin({
        template: "./src/public/views/index.html",
        filename: "./index.html",
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
    ],
  };
};
