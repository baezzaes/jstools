import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  { ignores: ['.playwright-cli/**', 'output/playwright/**'] },
  ...nextVitals,
  ...nextTypescript,
]

export default eslintConfig
