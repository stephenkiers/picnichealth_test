const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
    // devtool: 'cheap-module-source-map',

    entry: {
        reactapp: './src/config/environments/client'
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    output: {
        path: path.join(__dirname, 'public', 'cdn-generated'),
        filename: '[name]-[hash].js',
        publicPath: '/public/cdn-generated/'
    },

    plugins: [
        new webpack.DefinePlugin({
            // A common mistake is not stringifying the "production" string.
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            },
            sourceMap: false,
            comments: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new AssetsPlugin({fullPath: false}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jquery': 'jquery',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        })

    ],

    module: {
        rules: [
            { test: /\.js(x|)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/ },
            { test: /\.png$/,
                loader: 'file' },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file'}
        ]
    }
}