const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map', // 'inline-source-map' (slower rebuilds)

    entry: {
        // 'webpack-hot-middleware/client',
        reactapp: './src/config/environments/client'
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    output: {
        path: path.join(__dirname, 'public', 'cdn-generated'),
        filename: '[name].js',
        publicPath: '/public/cdn-generated/'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new AssetsPlugin({fullPath: false}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jquery': 'jquery',
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (m) => /node_modules\/(?:react|react-dom|react-loadable)/.test(m.context)
        })

        // new CircularDependencyPlugin({
        //     // exclude detection of files based on a RegExp
        //     // exclude: /a\.js/,
        //     // add errors to webpack instead of warnings
        //     // failOnError: true
        // })
    ],

    module: {
        loaders: [{
            test: /\.js(x|)?$/,
            loader: 'babel-loader',
            exclude: path.join(__dirname, 'node_modules')
        },{
            test: /\.png$/,
            loader: 'file'
        },{
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file'
        }]
    }
}