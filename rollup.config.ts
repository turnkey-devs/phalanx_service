import "reflect-metadata"

/**
 * Rollup Config.
 */
import * as path from 'path'

import rollupPluginJSON from "@rollup/plugin-json"
import rollupPluginNodeResolve from "@rollup/plugin-node-resolve"

import { defineConfig, type Plugin, type RollupOptions } from "rollup"
import rollupPluginAutoExternal from "rollup-plugin-auto-external"

import rollupPluginCommonJS from '@rollup/plugin-commonjs'
import rollupPluginProgressBar from 'rollup-plugin-progressbar'
import { defineRollupSwcOption, swc as rollupPluginSwc } from 'rollup-plugin-swc3'

import { typescriptPaths as rollupPluginTsconfigPaths } from 'rollup-plugin-typescript-paths'

const tsconfig = `./tsconfig.build.json`

const entry = `src/index.ts`

const multiEntry = [`src/cli_entry.ts`, `src/index.ts`]
// const multiEntry = []

const outDirectory = `dist/`

const disablePeer = false

/**
 * Get new instances of all the common plugins.
 */
function getPlugins() {
  return [
    rollupPluginProgressBar({}),
    rollupPluginAutoExternal({
      packagePath: `./package.json`,
    }),

    rollupPluginTsconfigPaths({
      tsConfigPath: tsconfig,
    }),
    rollupPluginNodeResolve({
      rootDir: `.`,
    }),
    rollupPluginCommonJS({}),
    rollupPluginSwc(
      defineRollupSwcOption(
        {
          tsconfig,
          minify: true,
          jsc: {
            loose: false,
            externalHelpers: false,
            baseUrl: ``,
            target: `es2021`,
            transform: {
              decoratorMetadata: true,
              legacyDecorator: true,
              useDefineForClassFields: true,
            },
            parser: {
              syntax: `typescript`,
              // topLevelAwait: true,
              decorators: true,
              dynamicImport: true,
              // tsx: false,
            },
          },
          // module: {
          //   type: `commonjs`,
          //   allowTopLevelThis: false,
          //   ignoreDynamic: true,
          //   importInterop: `swc`,
          //   lazy: true,
          //   preserveImportMeta: true,
          //   strict: true,
          //   strictMode: true,
          //   noInterop: true,
          // },
        },
      )),
    rollupPluginJSON({
      preferConst: true,
    }),
  ] as Plugin[]
}

const commonConfig = () => defineConfig({
  input: entry,

  // output: {
  //   sourcemap: false,
  //   exports: `auto`,
  // },

  // external: [],

  treeshake: {
    annotations: true,
    moduleSideEffects: [
      `reflect-metadata`, //! NOTE: FIX TypeError: Reflect.hasOwnMetadata is not a function
    ],
    propertyReadSideEffects: false,
    unknownGlobalSideEffects: false,
  },
} as RollupOptions)

const cjs = defineConfig({
  ...commonConfig(),

  output: [
    {
      ...commonConfig().output,
      // Preserve path
      entryFileNames: `[name].cjs`,
      preserveModulesRoot: `src`,
      preserveModules: true,
      dir: outDirectory,

      // Bundled
      // file: package_.main,
      // file: `index.cjs`,
      // entryFileNames: `[name].cjs`,
      // dir: outDirectory,

      format: `cjs`,
    },
  ],

  plugins: [
    ...getPlugins(),
  ],
})

const esm = defineConfig({
  ...commonConfig(),

  output: [
    {
      ...commonConfig().output,
      // Preserve path
      entryFileNames: `[name].mjs`,
      preserveModulesRoot: `src`,
      preserveModules: true,
      dir: outDirectory,

      // Bundled
      // file: package_.module,
      // file: `index.mjs`,
      // entryFileNames: `[name].mjs`,
      // dir: outDirectory,

      format: `esm`,
      esModule: true,
      strict: true,
    },
  ],

  plugins: [
    ...getPlugins(),
  ],
})

const configs = multiEntry.length > 0
  ? multiEntry.flatMap(
    currentEntry => ([
      { ...cjs, input: currentEntry },
      { ...esm, input: entry },
    ]),
  )
  : [
    cjs,
    esm,
  ]

export default configs
