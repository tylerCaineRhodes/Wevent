module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'sql',
    'jest',
  ],
  rules: {
    "sql/format": [
      2,
      {
        "ignoreExpressions": true,
        "ignoreInline": true,
        "ignoreTagless": true
      }
    ],
    "sql/no-unsafe-query": [
      2,
      {
        "allowLiteral": false
      }
    ],
    "no-console": "off",
    "no-unused-vars": "off",
    "no-plusplus": "off",
    "spaced-comment": "off",
    "no-restricted-syntax": "off",
    "guard-for-in" : "off",
    "consistent-return": "off",
    "jsx-a11y/alt-text": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "no-access-state-in-setstate": "off",
    "max-len": "off",
      //React Rules
    "react/jsx-one-expression-per-line": "off",
    "react/forbid-prop-types": "off",
    "react/prop-types": "off",
    "react/no-unused-prop-types": "off",
    "react/no-deprecated": "off",
    "react/jsx-filename-extension": "off",
    "react/destructuring-assignment": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-access-state-in-setstate": "off",
    "import/extensions": "off",
    "no-array-index-key": "off",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
  },
};
