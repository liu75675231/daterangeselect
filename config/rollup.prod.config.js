import config from './rollup.config';
import minify from 'rollup-plugin-babel-minify';
import merge from 'merge';
import minifyHTML from 'rollup-plugin-minify-html-literals';
export default merge(config, {
    output: {
        file: "dist/daterangeselect.min.js",
        format: "iife",
        name: "DateRangeSelect",
    },
    plugins: [
        minify(),
        minifyHTML(),
    ],
})
