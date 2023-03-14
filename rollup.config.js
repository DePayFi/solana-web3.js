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
      file: 'dist/esm/index.js',
      banner: `
var _global$1 = (typeof global !== "undefined" ? global :
  typeof self !== "undefined" ? self :
  typeof window !== "undefined" ? window : {});
if(_global$1.XMLHttpRequest == undefined) { Object }
if(_global$1.location == undefined) { _global$1.location = {} }
      `
    },
    {
      format: 'umd',
      name: pkg.moduleName,
      globals: globals,
      file: 'dist/umd/index.js',
      banner: `
var _global$1 = (typeof global !== "undefined" ? global :
  typeof self !== "undefined" ? self :
  typeof window !== "undefined" ? window : {});
if(_global$1.XMLHttpRequest == undefined) { Object }
if(_global$1.location == undefined) { _global$1.location = {} }
      `
    },
  ],
  external: [
  ],
  treeshake: {
    moduleSideEffects: false,
  },
  plugins: [
    commonjs({
      transformMixedEsModules: true
    }),
    json(),
    nodePolyfills(),
    resolve(),
    babel({
      exclude: '**/node_modules/**',
      extensions: ['.js','.ts'],
      babelHelpers: 'bundled'
    }),
    nodeResolve({
      browser: true,
      dedupe: ['bn.js', 'buffer'],
      extensions: ['.js','.ts'],
      preferBuiltins: false
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
