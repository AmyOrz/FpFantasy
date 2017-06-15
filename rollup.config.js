import typescript from "wonder-rollup-plugin-typescript";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
    entry: "./src/index.ts",
    indent: "\t",
    plugins: [
        typescript({
            tsconfig:false,
            typescript:require("typescript")
        }),
        nodeResolve({
            skip:[
            ],
            extensions: [".js", ".ts"]
        }),
        commonjs({
            namedExports: {
                // "./node_modules/bowser/src/bowser.js": ["version", "chrome","msie", "firefox", "mobile"],
                // "./node_modules/wonder-expect.js/index.js": ["expect"],
                "./node_modules/rsvp/dist/rsvp.js": ["Promise"]
            },
            extensions: [".js", ".ts"]
        })
    ],
    targets: [
        {
            sourceMap: true,
            format: "umd",
            moduleName: "wdfl",
            dest: "./dist/wdfl.js"
        },
        {
            sourceMap: true,
            format: "es",
            dest: "./dist/wdfl.module.js"
        }
    ]
};
