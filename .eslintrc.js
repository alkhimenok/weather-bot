module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  env: {
    browser: false,
    es2021: true,
    node: true,
    commonjs: true,
    amd: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  plugins: ['import', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended'
  ],
  rules: {
    // default
    'global-require': 'warn',
    'no-plusplus': 'warn',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'no-bitwise': 'warn',
    'no-shadow': 'warn',
    'no-unused-vars': 'warn',
    'camelcase': 'off',
    'no-prototype-builtins': 'off',
    'require-yield': 'warn',
    'default-case': 'warn',
    'no-case-declarations': 'off',
    'no-undef': 'warn',
    'no-unused-expressions': 'warn',
    'no-use-before-define': 'warn',
    'no-return-await': 'warn',
    'no-empty-pattern': 'warn',
    'no-unsafe-optiona': 'off',
    'default-param-last': 'off',
    'no-nested-ternary': 'off',
    'no-cond-assign': 'warn',
    'getter-return': 'warn',
    'dot-notation': 'warn',
    'object-shorthand': 'warn',
    'prefer-template': 'warn',
    'spaced-comment': 'warn',
    'jsx-a11y/no-autofocus': 'off',
    'no-return-assign': 'warn',
    // import
    // prettier
    'prettier/prettier': 'warn'
  }
}
