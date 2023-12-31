const {merge} = require('webpack-merge')
const common = require('./common')
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

var ZipPlugin = require('zip-webpack-plugin');

// build.version = v1

const PACKAGE = require(path.dirname(path.dirname(__dirname)) + '/package.json');
const buildVersion = 'v' + PACKAGE.version
module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        filename: 'js/[name].[contenthash].bundle.js',
        publicPath: './',
    },
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 1}
                    },
                    {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: '[id].css'
        }),

        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i
        }),

        new ZipPlugin({
            // OPTIONAL: defaults to the Webpack output path (above)
            // can be relative (to Webpack output path) or absolute
            // path: 'zip',

            // OPTIONAL: defaults to the Webpack output filename (above) or,
            // if not present, the basename of the path
            // filename: 'my_app.zip',

            filename: `${PACKAGE.name}_${buildVersion}.zip`,

            // OPTIONAL: defaults to 'zip'
            // the file extension to use instead of 'zip'
            // extension: 'ext',

            // OPTIONAL: defaults to the empty string
            // the prefix for the files included in the zip file
            // pathPrefix: 'relative/path',

            // OPTIONAL: defaults to the identity function
            // a function mapping asset paths to new paths
            // pathMapper: function (assetPath) {
            //     // put all pngs in an `images` subdir
            //     if (assetPath.endsWith('.png'))
            //         return path.join(path.dirname(assetPath), 'images', path.basename(assetPath));
            //     return assetPath;
            // },

            // OPTIONAL: defaults to including everything
            // can be a string, a RegExp, or an array of strings and RegExps
            // include: [/\.js$/],

            // OPTIONAL: defaults to excluding nothing
            // can be a string, a RegExp, or an array of strings and RegExps
            // if a file matches both include and exclude, exclude takes precedence
            // exclude: [/\.png$/, /\.html$/],

            // yazl Options

            // OPTIONAL: see https://github.com/thejoshwolfe/yazl#addfilerealpath-metadatapath-options
            fileOptions: {
                mtime: new Date(),
                mode: 0o100664,
                compress: true,
                forceZip64Format: false,
            },

            // OPTIONAL: see https://github.com/thejoshwolfe/yazl#endoptions-finalsizecallback
            zipOptions: {
                forceZip64Format: false,
            },
        })

    ],
    optimization: {
        runtimeChunk: 'single'
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
})
