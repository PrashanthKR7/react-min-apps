const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/*
 * Default webpack configuration for development
 */
var config = {
  devtool: "eval-source-map", //'inline-source-map'
  // entry:  __dirname + "/app/_ShoppingListMiniApp/AnimatedShoppingList.js",
  // entry:  __dirname + "/app/_ShoppingListMiniApp/DnDMain.js",
  // entry: __dirname + "/app/App.js",
  // entry:  __dirname + "/app/_RoutingMiniApp/RoutingApp.js",
  // entry:  __dirname + "/app/_BankFluxMiniApp/FluxApp.js",
   entry:  __dirname + "/app/_AirCheapApp/App.js",
  // entry:  __dirname + "/app/_DigitalClockMiniApp/App.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: "./public",
    historyApiFallback: true,
    inline: true
  },
  plugins: [
  /*   new CleanWebpackPlugin(["public"]),
    new HtmlWebpackPlugin({
      title: "React to-do list",
      template: "index.html"
    }) */
  ]
};

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === "production") {
  config.devtool = false;
  config.plugins = [
    new MiniCssExtractPlugin({
      filename: "styles.css"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify("production") }
    })
  ];
}

module.exports = config;
