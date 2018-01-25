import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import uglify from 'rollup-plugin-uglify';

const pkg = require('./package.json');

/**
 * Adapted from https://github.com/alexjoverm/typescript-library-starter
 */
export default {
  input: `src/LiveTile.ts`,
  output: [
    { file: pkg.main, name: 'livetile', format: 'umd' },
    { file: pkg.module, format: 'es' }
  ],
  sourcemap: true,
  external: [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    typescript(),
    commonjs(),
    resolve(),
    scss({
      output: pkg.style
    }),
    uglify(),
    sourceMaps()
  ]
};
