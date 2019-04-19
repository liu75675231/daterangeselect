import config from './rollup.config';
import minify from 'rollup-plugin-babel-minify';
import merge from 'merge';
import babel from "rollup-plugin-babel";
export default merge(config, {
    output: {
        file: "dist/daterangeselect.min.js",
        format: "iife",
        name: "DateRangeSelect",
    },
    plugins: [
        minify({
            bannerNewLine: true,
            banner: `/*! 
 * daterangeselect.min.js v0.0.1 
 * author liuht 
 * github: https://github.com/liu75675231/daterangeselect
 * author personal website: http://www.lht.ren 
*/`,
        }),
        babel({
            exclude: 'node_modules/**',
        }),
    ],
})
