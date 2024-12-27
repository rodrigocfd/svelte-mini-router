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
			'svelte/html-quotes': ['warn', {prefer: 'double'}],
			'svelte/indent': ['warn', {indent: 'tab', indentScript: true}],
			'svelte/no-spaces-around-equal-signs-in-attribute': 'warn',
			'svelte/require-each-key': 'warn',
			'svelte/valid-each-key': 'error',
			'@stylistic/array-bracket-spacing': ['warn', 'never'],
			'@stylistic/comma-dangle': ['warn', 'always-multiline'],
			'@stylistic/comma-spacing': 'warn',
			'@stylistic/eol-last': 'warn',
			'@stylistic/function-call-spacing': ['warn', 'never'],
			'@stylistic/indent': ['warn', 'tab'],
			'@stylistic/jsx-curly-spacing': ['warn', {children: true}],
			'@stylistic/jsx-equals-spacing': 'warn',
			'@stylistic/jsx-props-no-multi-spaces': 'warn',
			'@stylistic/jsx-quotes': ['warn', 'prefer-single'],
			'@stylistic/jsx-tag-spacing': ['warn', {beforeClosing: 'never'}],
			'@stylistic/key-spacing': ['warn', {beforeColon: false, afterColon: true, mode: 'minimum'}],
			'@stylistic/keyword-spacing': 'warn',
			'@stylistic/member-delimiter-style': ['warn', {
				multiline: {delimiter: 'semi', requireLast: true},
				singleline: {delimiter: 'semi', requireLast: false},
			}],
			'@stylistic/no-multi-spaces': 'warn',
			'@stylistic/no-whitespace-before-property': 'warn',
			'@stylistic/object-curly-spacing': ['warn', 'never'],
			'@stylistic/quotes': ['warn', 'single', {avoidEscape: true}],
			'@stylistic/semi': ['warn', 'always'],
			'@stylistic/space-infix-ops': 'warn',
			'@stylistic/template-curly-spacing': ['warn', 'never'],
			'@typescript-eslint/no-unused-vars': ['warn', {
				'argsIgnorePattern': '^_',
				'varsIgnorePattern': '^_',
				'caughtErrorsIgnorePattern': '^_',
			}],
		},
	},
);
