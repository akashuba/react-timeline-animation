// import babel from 'rollup-plugin-babel';
import { babel } from '@rollup/plugin-babel';
// import filesize from 'rollup-plugin-filesize';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import progress from 'rollup-plugin-progress';
// import visualizer from 'rollup-plugin-visualizer';
import commonjs from '@rollup/plugin-commonjs';
import json from 'rollup-plugin-json';
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss'

const isStartMode = process.env.MODE === 'start'

export default {
  input: 'test/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'iife',
      sourcemap: 'inline',
    },
  ],
  plugins: [
    typescript(),
    progress(),
    nodeResolve({
      browser: true,
      extensions: ['.js', '.jsx', '.tsx']
    }),
    json(),
    commonjs({
      include: [
        'node_modules/**',
      ],
      exclude: [
        'node_modules/process-es6/**',
      ],
      namedExports: {
        'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render'],
      },
    }),
    babel(
      {
        presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react', '@babel/preset-typescript'],
        // plugins: ['external-helpers'],
      }),
    // visualizer(),
    // filesize(),
    (isStartMode ? serve({
      verbose: true,
      contentBase: ["", "public"],
      host: "localhost",
      port: 3000,
    }) : null),

    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    (isStartMode ? livereload({ watch: "dist" }) : null),
    postcss()
  ],
};