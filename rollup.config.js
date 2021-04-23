import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import tsc from "typescript";

const input = "src/index.ts";

const typescriptPlugin = typescript({
    typescript: tsc,
});

const terserPlugin = terser();

export default [
    {
        input,
        output: {
            file: "dist/index.esm.js",
            format: "esm",
            sourcemap: true,
            external: ["react"]
        },
        plugins: [typescriptPlugin],
    },
    {
        input,
        output: {
            file: "dist/index.cjs",
            format: "cjs",
            sourcemap: true,
            external: ["react"]
        },
        plugins: [typescriptPlugin],
    },
    {
        input,
        output: {
            file: "dist/index.js",
            globals: {
                "react": "React"
            }
        },
        plugins: [typescriptPlugin, terserPlugin],
    },
];
