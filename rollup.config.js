import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [

    //
    // DEV BUNDLE
    //

    {
        input: 'src/js/main.js',
        output: {
            name: 'SourceAttribution',
            file: 'public/bundle.js',
            format: 'iife', // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs()
        ]
    },

    //
    // PROD BUNDLE
    //

    {
        input: 'src/js/main.js',
        output: {
            name: 'SourceAttribution',
            file: 'dist/source-attribution.umd.js',
            format: 'umd',
            compact: true
        },
        external: [
            'lodash.debounce',
            'lodash.merge',
            'short-unique-id',
            'what-input',
            'zenscroll'
        ],
        plugins: [
            resolve(),
            commonjs(),
            terser({
                ecma: 5
            }),
            filesize()
        ]
    },
    {
        input: 'src/js/main.js',
        output: {
            name: 'SourceAttribution',
            file: 'dist/source-attribution.all.umd.js',
            format: 'umd',
            compact: true
        },
        plugins: [
            resolve(),
            commonjs(),
            terser({
                ecma: 5
            }),
            filesize()
        ]
    },
    {
        input: 'src/js/main.js',
        external: [
            'lodash.debounce',
            'lodash.merge',
            'short-unique-id',
            'what-input',
            'zenscroll'
        ],
        output: [
            {
                file: pkg.main,
                compact: true,
                format: 'cjs'
            },
            {
                file: pkg.module,
                compact: true,
                format: 'es'
            }
        ],
        plugins: [
            terser({
                ecma: 5
            }),
            filesize()
        ]
    }
];
