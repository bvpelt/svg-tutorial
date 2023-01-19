import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
//import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',

  output: {
    file: 'public/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    //resolve(), // tells Rollup how to find date-fns in node_modules
    resolve(),
    commonjs(), // converts date-fns to ES modules
    //production && terser() // minify, but only in production
    /*
    serve({
      open: true,
      verbose: true,
      contentBase: ['', 'public'],
      historyApiFallback: true,
      host: 'localhost',
      port: 3000,
    }),
    livereload({ watch: ['', 'public'] })
    */
  ]
};