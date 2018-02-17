import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import { resolve } from 'path';
import SimpleProgressWebpackPlugin from 'simple-progress-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';
import WebpackChunkHash from 'webpack-chunk-hash';

const distPath = resolve(__dirname, 'dist');
const { ifProduction } = getIfUtils(process.env.NODE_ENV);
const srcPath = resolve(__dirname, 'src');

module.exports = function webpackConfig() {
    return {
        context: srcPath,
        entry: resolve(__dirname, 'src'),
        devtool: ifProduction('source-map', 'eval-source-map'),
        devServer: {
            contentBase: distPath,
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    minimize: {
                                        browsers: ['last 2 versions', '> 5%'],
                                        discardComments: {
                                            removeAll: ifProduction(true, false),
                                        },
                                    },
                                },
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        require('stylelint')({}),
                                        require('postcss-import')(),
                                        require('postcss-reporter')({
                                            clearReportedMessages: true,
                                        }),
                                    ],
                                    sourceMaps: true,
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/,
                    enforce: 'pre',
                    options: {
                        fix: true,
                        formatter: require('eslint-formatter-pretty'),
                    },
                },
                {
                    test: /\.js$/,
                    loaders: ['babel-loader'],
                    exclude: /node_modules/,
                },
                {
                    test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                    },
                },
            ],
        },
        plugins: removeEmpty([
            new webpack.DefinePlugin({
                'process.env': process.env,
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new CompressionPlugin({
                algorithm: 'gzip',
                asset: '[path].gz[query]',
                cache: true,
                test: /\.(html|css|js)$/,
            }),
            new CopyWebpackPlugin([
                {
                    from: resolve(srcPath, 'assets'),
                    to: 'assets',
                },
            ]),
            ifProduction(new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })),
            new SimpleProgressWebpackPlugin(),
            new CleanWebpackPlugin([resolve(distPath, '*')]),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inlineManifestWebpackName: 'webpackManifest',
                template: resolve(__dirname, 'src', 'index.html'),
                minify: ifProduction({
                    collapseWhitespace: true,
                    removeComments: true,
                }),
            }),
            ifProduction(new UglifyJsPlugin({ sourceMap: true })),
            new ExtractTextPlugin({
                allChunks: true,
                filename: '[name].[hash].css',
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                reportFilename: '../dist/stats/bundle-info.html',
            }),
            ifProduction(
                new webpack.HashedModuleIdsPlugin(),
                new WebpackChunkHash(),
                new ChunkManifestPlugin({
                    filename: 'chunk-manifest.json',
                    manifestVariable: 'webpackManifest',
                    inlineManifest: true,
                })
            ),
        ]),
        output: {
            filename: ifProduction('[name].[chunkhash].js', '[name].[hash].js'),
            path: distPath,
        },
    };
};
