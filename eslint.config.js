import globals from 'globals';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ignores: ['build']},
	{extends: [js.configs.recommended, ...tseslint.configs.recommended]},
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
	},
	{
		files: ['**/*.{svelte}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parser: svelteParser,
			parserOptions: {
				parser: tseslint,
			},
		},
	},
	{
		plugins: {
			'@stylistic': stylistic,
		},
		rules: {
			'eqeqeq': ['warn', 'always'],
			'no-empty': 'warn',
			'no-sparse-arrays': 'error',
			'prefer-const': 'warn',
			'@stylistic/array-bracket-spacing': ['warn', 'never'],
			'@stylistic/comma-dangle': ['warn', 'always-multiline'],
			'@stylistic/indent': ['warn', 'tab'],
			'@stylistic/jsx-quotes': ['warn', 'prefer-single'],
			'@stylistic/key-spacing': ['warn', {beforeColon: false, afterColon: true, mode: 'minimum'}],
			'@stylistic/member-delimiter-style': ['warn', {
				multiline: {delimiter: 'semi', requireLast: true},
				singleline: {delimiter: 'semi', requireLast: false},
			}],
			'@stylistic/object-curly-spacing': ['warn', 'never'],
			'@stylistic/quotes': ['warn', 'single', {avoidEscape: true}],
			'@stylistic/semi': ['warn', 'always'],
			'@stylistic/template-curly-spacing': ['warn', 'never'],
			'@typescript-eslint/no-unused-vars': ['warn', {
				'argsIgnorePattern': '^_',
				'varsIgnorePattern': '^_',
				'caughtErrorsIgnorePattern': '^_',
			}],
		},
	},
);
