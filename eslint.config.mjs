import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt().append({
    files: ['**/*.vue'],
    rules: {
        'vue/multi-word-component-names': 'off',
    },
})
