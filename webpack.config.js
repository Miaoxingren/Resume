var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/scripts/index.js'),
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader!jsx-loader'
        }]
    },
    devServer: {
        inline: true
    }
};
