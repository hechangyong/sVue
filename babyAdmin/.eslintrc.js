module.exports = {
  root: true,
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-redeclare": [2, {"builtinGlobals": true}],
    // "space-before-function-paren": ["error", "ignore"],
    "space-before-function-paren": ["error", {"anonymous": "ignore", "named": "ignore", "asyncArrow": "always"}],

    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }],
    'no-undef': 'off',
    'camelcase': 'off',
    semi: 0,// ["error", "always"],//强行加分号
    indent: 0//强行缩进
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
