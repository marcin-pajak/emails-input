import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import sass from 'rollup-plugin-sass';

const package_ = require('./package.json');

const libraryName = 'EmailsInput';

export default {
  input: `src/index.ts`,
  output: [
    { file: package_.main, format: 'umd', name: libraryName, sourcemap: true },
    { file: package_.module, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),
    // Styles
    sass({
      output: './lib/styles.css',
    }),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    /*
     * Allow node_modules resolution, so you can use 'external' to control
     * which external modules to include in the bundle
     * https://github.com/rollup/rollup-plugin-node-resolve#usage
     */
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
};
