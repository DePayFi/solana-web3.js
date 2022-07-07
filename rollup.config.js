import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import globals from './rollup.globals.js'
import json from '@rollup/plugin-json'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import pkg from './package.json'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'es',
      globals: globals,
      file: 'dist/esm/index.js'
    },
    {
      format: 'umd',
      name: pkg.moduleName,
      globals: globals,
      file: 'dist/umd/index.js'
    },
  ],
  external: ['borsh', 'bigint-buffer', 'js-sha3'],
  treeshake: {
    moduleSideEffects: false,
  },
  plugins: [
    nodePolyfills(),
    json(),
    resolve({
      extensions: ['.js','.jsx','.ts']
    }),
    commonjs(),
    nodeResolve({
      browser: true,
      dedupe: ['bn.js', 'buffer'],
      extensions: ['.js','.ts'],
      preferBuiltins: false
    }),
    babel({
      exclude: '**/node_modules/**',
      extensions: ['.js','.ts'],
      babelHelpers: 'bundled'
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('product'),
      'process.env.BROWSER': JSON.stringify('true'),
      'process.env.npm_package_version': JSON.stringify(
        process.env.npm_package_version,
      )
    })
  ]
}
