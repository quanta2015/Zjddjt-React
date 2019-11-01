module.exports = {
  rules: {
    'no-console': 0,
    'no-debugger': 'error',
    semi: 0,
    'eol-last': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/display-name': 0,
    'no-cond-assign': 0,
    'no-trailing-spaces': 0
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 7,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      legacyDecorators: true
    }
  }
}
