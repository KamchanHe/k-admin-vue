module.exports = {
  root: true,
  env: {
    'browser': true,
    'node': true,
    'es2021': true,
    'vue/setup-compiler-macros': true // deal with defineProp is not defined
  },
  extends: [
    'eslint:recommended', // eslint recommended
    'airbnb-base', // airbnb || standard
    'airbnb-typescript/base', // ts airbnb
    'plugin:vue/vue3-recommended', // vue3 recommended || essential
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
    },
    extraFileExtensions: ['.vue'],
    project: ['./tsconfig.json'] // for airbnb-typescript
  },
  plugins: [
    'vue', // vue
    '@typescript-eslint', // ts
    'import', // import
    'promise', // promise
    'prettier' // prettier
  ],
  settings: {
    // for why import/no-unresolved disabled
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    // for why import/no-unresolved disabled
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    // prettier
    'prettier/prettier': ['error'],
    // vue
    'vue/multi-word-component-names': 'off',
    // import
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // to fix airbnb eslint: Missing file extension "ts" for (import/extensions)
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    // eslint
    'quotes': ['error', 'single'], // single quotes
    'semi': ['error', 'always'], // always semi;
    'no-param-reassign': 'off', // off disabled edit function params
    // ts
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
  }
};
