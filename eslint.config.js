import {fileURLToPath} from 'node:url';
import {includeIgnoreFile} from '@eslint/compat';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
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
			'simple-import-sort': simpleImportSort,
			'@stylistic': stylistic,
		},
		rules: {
			'eqeqeq': ['warn', 'always'],
			'no-empty': 'warn',
			'no-sparse-arrays': 'error',
			'prefer-const': 'warn',
			'simple-import-sort/exports': 'warn',
			'simple-import-sort/imports': ['warn', {
				groups: [['^\\u0000', '^node:', '^svelte$', '^@?\\w', '^', '^\\.', '^.+\\.css$']],
			}],
			'@stylistic/array-bracket-spacing': ['warn', 'never'],
			'@stylistic/comma-dangle': ['warn', 'always-multiline'],
			'@stylistic/comma-spacing': 'warn',
			'@stylistic/eol-last': 'warn',
			'@stylistic/indent': ['warn', 'tab'],
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
