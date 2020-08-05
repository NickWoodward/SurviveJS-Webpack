const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const glob = require("glob");

const parts = require("./webpack.parts");

const PATHS = {
    app: path.join(__dirname, "src"),
};

const commonConfig = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                title: "Webpack demo",
            }),
        ],
    },
    parts.loadFonts(),
    parts.loadSVGs({
        options: {
            extract: true,
            spriteFilename: 'spritesheet.svg'
        }
    })
]);

const productionConfig = merge([
    {
        optimization: {
          splitChunks: {
            chunks: "initial",
          },
        },
    },

    parts.extractCSS({
        use: ["css-loader", parts.autoprefix()],
    }),
    // Purifycss deprecated, but purgecss requires dynamic classes to be whitelisted
    // Use glob to match all but certain css files?
    parts.purgeCSS({
        paths: glob.sync(`${PATHS}/**/*.js`, { nodir: true }),
        whitelist: ["body", "pure-button", "test", "title"],
    }),
    parts.loadImages({
        options: {
            limit: 105000,
            name: "[name].[ext]",
        },
    }),
    parts.loadJS({ include: PATHS.app }),
    parts.generateSourceMaps({ type: "source-map" }),
    parts.clean()
]);

const developmentConfig = merge([
    parts.devServer({
        // Customise host/port if needed
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),
    parts.loadImages(),
    parts.generateSourceMaps({ type: "cheap-module-eval-source-map" }),
    // parts.disableCodeSplitting()
]);

module.exports = (mode) => {
    if (mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }

    return merge(commonConfig, developmentConfig, { mode });
};
