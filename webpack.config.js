var Webpack = require('webpack'),
    path = require('path'),
    pkg = require('./package.json');

var eslintrcPath = path.resolve(__dirname, '.eslintrc'),
    nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    buildPath = path.resolve(__dirname, 'src', 'build'),
    mainPath = path.resolve(__dirname, 'src', 'index.js');

// Raise tread pool size to prevent bundling stuck issue
process.env.UV_THREADPOOL_SIZE = 100;

var config = {
    devtool: 'eval',
    watch: true,
    entry: {
        app: [
            'webpack-hot-middleware/client',
            mainPath
        ],
        vendors: pkg.vendors
    },
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    module: {
        preLoaders: [
            {
                test: /\.js(x)?$/,
                loader: 'eslint',
                exclude: nodeModulesPath
            }
        ],
        loaders: [
            {
                test: /\.js(x)?$/,
                loader: 'babel',
                exclude: nodeModulesPath
            },
            {
                test: /\.(css|scss)$/,
                loaders: ['style', 'css', 'sass', 'postcss', 'cssnext-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d\.\d\.\d)?$/,
                loader: 'url?limit=8192'
            },
            {
                test : /\.(woff|woff2|ttf|eot)(\?v=\d\.\d\.\d)?$/,
                loader: 'url'
            }
        ]
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js'),
        new Webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss']
    },
    eslint: {
        configFile: eslintrcPath
    },
    postcss: function () {
        return [
            require('autoprefixer')({ browsers: ['last 2 versions'] }),
            require('precss'),
            require('postcss-import')({path: ['node_modules', './src']})
        ];
    }
};

module.exports = config;
