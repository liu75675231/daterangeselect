import babel from 'rollup-plugin-babel'
export default {
    input: "./src/index.js",
    output: {
        file: "dist/daterangeselect.js",
        format: "iife",
        name: "DateRangeSelect",
    },
    plugins: [
        babel({
           exclude: 'node_modules/**',
        }),
    ],

}
