import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',
  external: ["d3"],
  output: {
    file: 'public/bundle.js',
    format: 'iife',
    sourcemap: true,
    globals: { "d3": "d3" }
  },
  plugins: [
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    production && terser() // minify, but only in production
  ]
};