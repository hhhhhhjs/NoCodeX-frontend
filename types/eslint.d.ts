declare module '@eslint/js' {
  import type { Linter } from 'eslint'
  
  export interface Config {
    recommended: Linter.Config
  }
  
  const configs: Config
  export default configs
}

declare module 'eslint-plugin-vue' {
  import type { Linter } from 'eslint'
  
  export interface VueConfigs {
    'flat/recommended': Linter.Config[]
  }
  
  const configs: VueConfigs
  export default { configs }
}

declare module 'vue-eslint-parser' {
  export const parseForESLint: any
}

declare module 'eslint-config-prettier' {
  import type { Linter } from 'eslint'
  
  const config: Linter.Config
  export default config
}

declare module 'eslint-plugin-prettier' {
  import type { ESLint } from 'eslint'
  
  const plugin: ESLint.Plugin
  export default plugin
}

declare module 'typescript-eslint' {
  import type { Linter } from 'eslint'
  
  export interface TypeScriptESLint {
    configs: {
      recommended: Linter.Config[]
    }
    parser: any
  }
  
  const tseslint: TypeScriptESLint
  export default tseslint
}
