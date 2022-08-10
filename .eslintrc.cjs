const path = require('path');
module.exports = {
  root: true,
  env: {
    'browser': true,
    'node': true,
    'es2021': true,
    'vue/setup-compiler-macros': true // for vue3
  },
  extends: [
    'eslint:recommended', // eslint recommended
    'plugin:vue/vue3-recommended', // vue3 recommended || essential
    'airbnb-base', // airbnb || standard
    'plugin:@typescript-eslint/recommended', // ts recommended
    'plugin:import/recommended', // import recommended
    'plugin:import/typescript', // ts import
    'plugin:promise/recommended', // promise recommended
    'prettier', // prettier
    'plugin:prettier/recommended' // prettier recommended
  ],
  parser: 'vue-eslint-parser', // for vue ast
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser', // for ts
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'vue', // vue
    '@typescript-eslint', // ts
    'prettier' // prettier
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: path.resolve(__dirname, './tsconfig.json'),
        alwaysTryTypes: true
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    // prettier
    'prettier/prettier': ['error'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    // vue
    'vue/multi-word-component-names': 'off',
    // import
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  }
};
