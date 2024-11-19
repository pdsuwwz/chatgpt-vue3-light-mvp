import globals from 'globals'
import { defineFlatConfig } from 'eslint-define-config'

import * as parserTypeScript from '@typescript-eslint/parser'
import pluginTypeScript from '@typescript-eslint/eslint-plugin'

import * as parserVue from 'vue-eslint-parser'
import pluginVue from 'eslint-plugin-vue'
import js from '@eslint/js'

import stylistic from '@stylistic/eslint-plugin'

function renameRules(rules, map) {
  return Object.fromEntries(
    Object.entries(rules).map(([key, value]) => {
      for (const [from, to] of Object.entries(map)) {
        if (key.startsWith(`${ from }/`))
          return [to + key.slice(from.length), value]
      }
      return [key, value]
    })
  )
}

export default defineFlatConfig([
  {
    ignores: [
      'public',
      'build',
      'dist',
      'node_modules',
      'coverage',
      'src/assets/**'
    ]
  },
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/template-curly-spacing': ['error', 'always'],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/indent': ['error', 2, {
        SwitchCase: 1
      }],
      '@stylistic/object-curly-newline': ['error', {
        'ObjectExpression': {
          // 如果对象有属性，则要求换行。空对象则忽略
          'minProperties': 1,
          // 保持一致性
          'consistent': true
        }
      }],
      '@stylistic/object-property-newline': 'error',
      '@stylistic/key-spacing': ['error', {
        'beforeColon': false,
        'afterColon': true
      }],
      '@stylistic/type-annotation-spacing': ['error', {
        'before': true,
        'after': true,
        'overrides': {
          'colon': {
            'before': false,
            'after': true
          }
        }
      }],
      '@stylistic/no-trailing-spaces': ['error'],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'none',
          requireLast: false
        },
        singleline: {
          delimiter: 'semi',
          requireLast: true
        }
      }]
    }
  },
  {
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
        ...globals.node,
        ...globals.es2021,
        ...globals.browser
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2022,
        sourceType: 'module'
      },
      sourceType: 'module'
    },
    rules: {
      'accessor-pairs': ['error', {
        enforceForClassMembers: true,
        setWithoutGet: true
      }],
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      'comma-spacing': ['error', {
        after: true,
        before: false
      }],
      'constructor-super': 'error',
      'default-case-last': 'error',
      'dot-notation': ['error', {
        allowKeywords: true
      }],
      'eqeqeq': ['error', 'always'],
      'new-cap': ['error', {
        capIsNew: false,
        newIsCap: true,
        properties: true
      }],
      'no-alert': 'error',
      'no-array-constructor': 'error',
      'no-async-promise-executor': 'error',
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': ['error', 'always'],
      'no-console': ['error', {
        allow: ['log', 'warn', 'error']
      }],
      'no-const-assign': 'error',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-delete-var': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': ['error', {
        allowEmptyCatch: true
      }],
      'no-empty-character-class': 'error',
      'no-empty-pattern': 'error',
      'no-eval': 'error',
      'no-ex-assign': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-boolean-cast': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-implied-eval': 'error',
      'no-import-assign': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-iterator': 'error',
      'no-labels': ['error', {
        allowLoop: false,
        allowSwitch: false
      }],
      'no-lone-blocks': 'error',
      'no-loss-of-precision': 'error',
      'no-misleading-character-class': 'error',
      'no-multi-str': 'error',
      'no-new': 'off',
      'no-new-func': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-new-wrappers': 'error',
      'no-obj-calls': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',
      'no-proto': 'error',
      'no-prototype-builtins': 'error',
      'no-redeclare': ['error', {
        builtinGlobals: false
      }],
      'no-regex-spaces': 'error',
      'no-restricted-globals': [
        'error',
        {
          message: 'Use `globalThis` instead.',
          name: 'global'
        },
        {
          message: 'Use `globalThis` instead.',
          name: 'self'
        }
      ],
      'no-restricted-properties': [
        'error',
        {
          message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.',
          property: '__proto__'
        },
        {
          message: 'Use `Object.defineProperty` instead.',
          property: '__defineGetter__'
        },
        {
          message: 'Use `Object.defineProperty` instead.',
          property: '__defineSetter__'
        },
        {
          message: 'Use `Object.getOwnPropertyDescriptor` instead.',
          property: '__lookupGetter__'
        },
        {
          message: 'Use `Object.getOwnPropertyDescriptor` instead.',
          property: '__lookupSetter__'
        }
      ],
      'no-restricted-syntax': [
        'error',
        'DebuggerStatement',
        'LabeledStatement',
        'WithStatement',
        'TSEnumDeclaration[const=true]',
        'TSExportAssignment'
      ],
      'no-self-assign': ['error', {
        props: true
      }],
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-this-before-super': 'error',
      'no-throw-literal': 'error',
      'no-undef': 'error',
      'no-undef-init': 'error',
      'no-unexpected-multiline': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unneeded-ternary': ['error', {
        defaultAssignment: false
      }],
      'no-unreachable': 'error',
      'no-unreachable-loop': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unused-expressions': ['error', {
        allowShortCircuit: true,
        allowTaggedTemplates: true,
        allowTernary: true
      }],
      'no-unused-vars': ['error', {
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all'
      }],
      'no-use-before-define': ['error', {
        classes: false,
        functions: false,
        variables: false
      }],
      'no-useless-backreference': 'error',
      'no-useless-call': 'error',
      'no-useless-catch': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'no-with': 'error',
      'space-infix-ops': 'error',
      'object-curly-spacing': ['error', 'always'],
      'object-shorthand': [
        'error',
        'always',
        {
          avoidQuotes: true,
          ignoreConstructors: false
        }
      ],
      'one-var': ['error', {
        initialized: 'never'
      }],
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
          allowUnboundThis: true
        }
      ],
      'prefer-const': [
        'error',
        {
          destructuring: 'all',
          ignoreReadBeforeAssign: true
        }
      ],
      'prefer-exponentiation-operator': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': ['error', {
        disallowRedundantWrapping: true
      }],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'sort-imports': [
        'error',
        {
          allowSeparatedGroups: false,
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
        }
      ],

      // https://cn.eslint.org/docs/rules/no-trailing-spaces
      'no-trailing-spaces': 2, // 禁用行尾空白
      'comma-style': ['error', 'last'],
      'comma-dangle': ['error', 'never'],
      'no-multi-spaces': 1,
      'no-multiple-empty-lines': [
        2,
        {
          max: 2
        }
      ],
      // https://cn.eslint.org/docs/rules/eol-last
      'eol-last': 2,
      'quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true
        }
      ]
    }
  },
  {
    files: ['**/*.vue', '**/*.?([cm])ts', '**/*.?([cm])tsx'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      'import/core-modules': [
        'uno.css'
      ]
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript
    },
    rules: {
      ...renameRules(
        pluginTypeScript.configs['eslint-recommended'].overrides[0].rules,
        {
          '@typescript-eslint': 'ts'
        }
      ),
      ...pluginTypeScript.configs.recommended.rules,
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 1,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/consistent-type-imports': ['error', {
        fixStyle: 'separate-type-imports',
        disallowTypeAnnotations: false
      }]
    }
  },
  {
    files: ['*.d.ts'],
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-duplicates': 'off',
      'unused-imports/no-unused-vars': 'off'
    }
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: parserTypeScript,
        ecmaVersion: 2022,
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
          jsx: true
        },
        extraFileExtensions: ['.vue']
      }
    },
    plugins: {
      vue: pluginVue
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs['vue3-essential'].rules,
      ...pluginVue.configs['vue3-strongly-recommended'].rules,
      ...pluginVue.configs['vue3-recommended'].rules,
      'vue/no-v-html': 'off',
      'vue/multi-word-component-names': 0,
      'vue/singleline-html-element-content-newline': 'off',
      'vue/require-default-prop': 'off',
      'vue/html-closing-bracket-spacing': 'error',
      'vue/no-unused-components': 1,
      'vue/no-mutating-props': 0,
      'vue/v-on-event-hyphenation': ['warn', 'always', {
        autofix: true
      }],
      'vue/block-order': ['error', {
        'order': ['script', 'template', 'style']
      }],
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/script-setup-uses-vars': 'error',
      'vue/html-self-closing': ['error', {
        html: {
          void: 'never',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }]
    }
  }
])
