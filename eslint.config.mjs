// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import tsParser from '@typescript-eslint/parser'
import eslintPluginVue from 'eslint-plugin-vue'
import eslintPluginNuxt from 'eslint-plugin-nuxt'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import { rules as eslintPluginTypeScriptRules } from '@typescript-eslint/eslint-plugin'

export default withNuxt([
  {
    // Define your custom parser options
    languageOptions: {
      ecmaVersion: 'latest', // Enables parsing of modern ECMAScript features
      sourceType: 'module',
      parser: tsParser, // Use the imported TypeScript parser object      
    },

    // Define rules and extend plugins
    plugins: {
      vue: eslintPluginVue,
      '@typescript-eslint': eslintPluginTypeScriptRules,
      nuxt: eslintPluginNuxt,
      prettier: eslintPluginPrettier,
    },

    // Add custom ESLint rules
    rules: {
      'nuxt/no-cjs-in-config': 'error', // Enforces no CommonJS in Nuxt config files
      'vue/multi-word-component-names': 'off', // Allow single-word component names
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // Warn about console in production
      '@typescript-eslint/no-unused-vars': ['warn'], // Warn about unused TypeScript variables
      'prettier/prettier': 'error', // Enforce Prettier rules
    },

    // Specify which files to lint
    files: ['*.ts', '*.vue'], // Apply rules to TypeScript and Vue files

    // TypeScript project settings
    settings: {
      'import/resolver': {
        typescript: {}, // Helps ESLint resolve TypeScript paths
      },
    },
  },
])
