const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require("cssnano");
const CompressionPlugin = require("compression-webpack-plugin");

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        open: "chrome",
        overlay: true,
    },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
});

exports.extractCSS = ({ include, exclude, use = [] }) => {
    // Extract CSS to a file
    const plugin = new MiniCssExtractPlugin({
        // Use content hash, not chunkhash (as chunkhash would change with the application, not just the css content)
        filename: "[name].[contentHash:4].css",
    });

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,
                    use: [MiniCssExtractPlugin.loader].concat(use),
                },
            ],
        },
        plugins: [plugin],
    };
};

// Purify CSS was not maintained, PurgeCSS an alternative, or DropCSS
exports.purgeCSS = ({ paths, whitelist }) => ({
    plugins: [new PurgecssPlugin({ paths, whitelist })],
});

exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
        plugins: () => [require("autoprefixer")()],
    },
});

//TODO: optimize images using imagemin-webpack
exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                include,
                exclude,
                use: [
                    {
                        loader: "url-loader",
                        options,
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.9],
                                speed: 4,
                            },
                        },
                    },
                ],
            },
        ],
    },
});

exports.loadFonts = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "./fonts/[name].[ext]",
                        publicPath: "../", // Take the directory into account
                    },
                },
            },
        ],
    },
});

exports.loadSVGs = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.svg$/,
                include,
                exclude,
                use: [
                    {
                        loader: "svg-sprite-loader",
                        options,
                    },
                    "svgo-loader",
                ],
            },
        ],
    },
    plugins: [new SpriteLoaderPlugin()],
});

exports.loadJS = ({ include, exclude }) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                use: "babel-loader",
            },
        ],
    },
});

exports.generateSourceMaps = ({ type }) => ({
    devtool: type,

    // Source map option can be set for css/sass/less loaders
    // Css-loader known to have problem with relative paths in imports. Should set output.public path to the server url
});

exports.disableCodeSplitting = () => ({
    plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })],
});

exports.clean = (path) => ({
    plugins: [new CleanWebpackPlugin()],
});

exports.attachRevision = () => ({
    plugins: [
        new webpack.BannerPlugin({
            banner: new GitRevisionPlugin().version(),
        }),
    ],
});

exports.minifyJS = () => ({
    // Terser is used by default in production, but this allows configuration
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                // test: /** regex */
                // include
                // exclude
                // terserOptions: { https://github.com/terser/terser#minify-options }
            }),
        ],
    },
});

exports.minifyCSS = ({ options }) => ({
    plugins: [
        new OptimizeCssAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: options,
            canPrint: false
        })
    ]
});

exports.compress = () => ({
    plugins: [new CompressionPlugin()]
});