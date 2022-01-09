module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-shadow': 'off',
    'prettier/prettier': 0,
    '@typescript-eslint/no-shadow': ['error'],
  },
};
