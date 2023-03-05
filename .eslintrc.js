module.exports = {

	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['@typescript-eslint'],

  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": 0,
    'no-mixed-operators': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'no-console': 0,
  },
};
