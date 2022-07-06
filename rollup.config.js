import commonjs from '@rollup/plugin-commonjs'
import globals from './rollup.globals.js'
import json from '@rollup/plugin-json'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import pkg from './package.json'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import sucrase from '@rollup/plugin-sucrase'
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
  external: [
  ],
  plugins: [
    json(),
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['jsx']
    }),
    resolve({
      extensions: ['.js',  '.jsx']
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    nodeResolve({
      browser: true,
      dedupe: ['bn.js', 'buffer'],
      extensions: ['.js', 'ts'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' ),
      preventAssignment: true
    })
  ]
}
