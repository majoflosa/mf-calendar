const path = require('path');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const env = process.env.NODE_ENV;

module.exports = {
    entry: ['@babel/polyfill', './src/js/index.js'],
    output: {
        path: path.resolve( __dirname, 'dist'),
        filename: 'js/main.js',
    },
    resolve: {
        extensions: ['.js', '.json'],
    },
    devtool: 'source-map',
    devServer: {
        publicPath: '/',
        contentBase: './dist',
        watchContentBase: true,
        historyApiFallback: true,
        open: true,
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
            { 
                test: /\.s(a|c)ss$/, 
                exclude: /node_modules/, 
                use: [
                    { loader: MiniCssExtractPlugin.loader, options: { hmr: env === 'development'} }, 
                    'css-loader', 
                    'postcss-loader', 
                    'sass-loader'
                ] 
            },
        ],
    },
    plugins: [
        new SVGSpritemapPlugin('./src/svg/*.svg', {
            output: {
                filename: 'svg/icons.svg',
            },
            sprite: {
                prefix: false,
                generate: {
                    title: false,
                },
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new OptimizeCSSAssetsPlugin()
    ]
};
