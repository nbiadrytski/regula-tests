import { defineFlatConfig } from 'eslint-define-config';
import playwright from 'eslint-plugin-playwright';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default defineFlatConfig([
    {
        files: ['**/*.ts'],
        ignores: ['node_modules/**', 'dist/**', 'playwright-report/**', 'test-results/**'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname
            },
            globals: {
                ...globals.node,
                ...globals.browser
            }
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            playwright,
            prettier: prettierPlugin
        },
        rules: {
            ...typescriptPlugin.configs.recommended.rules,
            ...playwright.configs.recommended.rules,
            '@typescript-eslint/no-floating-promises': 'error',
            'playwright/no-skipped-test': 'warn',
            'playwright/no-page-pause': 'warn',
            'prettier/prettier': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
        }
    }
]);


