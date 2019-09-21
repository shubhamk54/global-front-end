const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");


const devMode = process.env.NODE_ENV !== 'production';

const htmlConfig = {
    template: "./index.html",
    minify: {
        removeComments: false,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
    },
    inject: true,
};

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname, './app/src'),
    devtool: 'source-map',
    entry: {
        app: ['@babel/polyfill', './index.jsx'],
    },
    output: {
        path: path.resolve(__dirname, './app/dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js',
    },
    devServer: {
        contentBase: './app/src',
        historyApiFallback: true,
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader?name=/fonts/[name].[ext]',
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                // Look for Sass files and process them according to the
                // rules specified in the different loaders
                test: /\.(sa|sc)ss$/,

                // Use the following loaders from right-to-left, so it will
                // use sass-loader first and ending with MiniCssExtractPlugin
                use: [
                    {
                        // Extracts the CSS into a separate file and uses the
                        // defined configurations in the 'plugins' section
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        // Interprets CSS
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    {
                        // Adds support for Sass files, if using Less, then
                        // use the less-loader
                        loader: 'sass-loader'
                    },
                ]
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'file-loader',
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'assets/img/favicon.ico', to: 'assets/img/favicon.ico' },
            { from: 'constants.js', to: './' },
        ]),
        new HtmlWebPackPlugin(htmlConfig),
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
        }),
    ],
    resolve: {
        alias: {
            Store: path.resolve(__dirname, 'app/src/store/'),
            Containers: path.resolve(__dirname, 'app/src/containers/'),
            Components: path.resolve(__dirname, 'app/src/components/'),
            Assets: path.resolve(__dirname, 'app/src/assets'),
        },
        extensions: ['.js', '.jsx', '.json', '*'],
    },
};
