const babelConfig = require('./babel.config');
const babel = require('babel-jest').default;

module.exports = babel.createTransformer(babelConfig);
