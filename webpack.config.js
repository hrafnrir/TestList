/*eslint-env node*/

const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimize = true;
    config.minimizer = [new CssMinimizerWebpackPlugin(), new TerserPlugin()];
  }

  return config;
};

const plugins = [
  new CleanWebpackPlugin(),
  new HTMLWebpackPlugin({
    template: "./index.html",
    minify: {
      collapseWhitespace: isProd,
    },
    inject: "body",
  }),
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "src/favicon.ico"),
        to: path.resolve(__dirname, "public"),
      },
    ],
  }),
  new MiniCssExtractPlugin({
    filename: isProd ? "style.[contenthash].css" : "style.css",
  }),
];

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

const options = (ext) => {
  const config = {
    presets: [
      "@babel/preset-env",
      ["@babel/preset-react", { runtime: "automatic" }],
    ],
    cacheDirectory: true,
  };

  if (isDev && ext === "jsx") config.plugins = ["react-refresh/babel"];

  return config;
};

module.exports = {
  plugins,
  context: path.resolve(__dirname, "src"),
  mode: isDev ? "development" : "production",
  entry: {
    main: "./index.js",
  },
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "public"),
  },
  optimization: optimization(),
  target: isDev ? "web" : "browserslist",
  devServer: {
    port: 3000,
    open: isDev,
    historyApiFallback: isDev,
  },
  devtool: isDev ? "source-map" : false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[contenthash][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: options("js"),
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: options("jsx"),
        },
      },
    ],
  },
};
