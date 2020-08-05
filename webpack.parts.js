const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
        filename: "[name].css",
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
                    publicPath: "../" // Take the directory into account
                  },
                },
              },
        ]
    }
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
                use: "babel-loader"
            }
        ]
    }
});

exports.generateSourceMaps = ({ type }) => ({
    devtool: type

    // Source map option can be set for css/sass/less loaders
    // Css-loader known to have problem with relative paths in imports. Should set output.public path to the server url
});

exports.disableCodeSplitting = () => ({
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
    ]
});

exports.clean = path => ({
    plugins: [ new CleanWebpackPlugin() ]
});