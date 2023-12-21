import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'curly': ['error', 'multi-line'],
    'no-alert': 'warn',
    'unused-imports/no-unused-vars': 'warn',
    'node/prefer-global/buffer': 'off',
    'node/prefer-global/process': 'off',
  },
  settings: {
    nuxt: {
      rootDir: ['apps/*/'],
    },
  },
})
