module.exports = {
  extends: ['./node_modules/poetic/config/eslint/eslint-config.js'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'import/order': ['error', { alphabetize: { order: 'asc', caseInsensitive: true } }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'no-empty-function': 'off',
    'no-underscore-dangle': 'off',
    'no-useless-constructor': 'off',
    'react/static-property-placement': 'off',
  },
};
