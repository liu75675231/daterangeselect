import config from './rollup.config';
import minify from 'rollup-plugin-babel-minify';
import merge from 'merge';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import babel from "rollup-plugin-babel";
export default merge(config, {
    output: {
        file: "dist/daterangeselect.min.js",
        format: "iife",
        name: "DateRangeSelect",
    },
    plugins: [
        minify(),
        minifyHTML(),
        babel({
            exclude: 'node_modules/**',
        }),
    ],
})
