import js from '@eslint/js';
import {includeIgnoreFile} from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import {fileURLToPath} from 'node:url';
import ts from 'typescript-eslint';
const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
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
