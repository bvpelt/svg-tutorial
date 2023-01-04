const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * When passed a string, Glob will attempt to find each file that matches the
 * path given and return each path to the file as string[]
 */
const glob = require('glob')

module.exports = {
    entry: glob.sync('./src/index.js').reduce((acc, path) => {
       /**
         * The "[name]" placeholder in the "output" property will be replaced
         * with each key name in our "entry" object. We need to make sure the
         * keys are a path to the "index.js" file but without the actual file
         * name. This is why we replace the file name, "index.js", with a string
         */
       const entry = path.replace('/index.js', '')
       /**
        * Here we start building our object by placing the "entry" variable from
        * the previous line as a key and the entire path including the file name
        * as the value
        */
       acc[entry] = path
       return acc 
    }, {} ),
    
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: true,
    },
    mode: 'development',

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
        }),
    ],

    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        usedExports: true,
      },
};