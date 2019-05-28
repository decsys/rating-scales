import resolve from "rollup-plugin-node-resolve";
import cjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify("production")
  }),
  babel({ ...pkg.babel, exclude: "node_modules/**" }),
  resolve({ preferBuiltins: false }),
  cjs(),
  terser()
];

const filePrefix = pkg.name.replace("@", "").replace("/", ".");

const input = {
  bundle: "src/index.js",
  ellipse: "src/Ellipse/Scale.js",
  discrete: "src/Discrete/Scale.js"
};

const dir = "dist";

const entryFileNames = `${filePrefix}.[name].[format].js`;

export default [
  // browser
  {
    input: input.bundle,
    output: {
      name: "DECSYS",
      file: pkg.browser,
      format: "umd",
      sourcemap: true,
      globals: {
        react: "React",
        "styled-components": "styled"
      }
    },
    external: ["react", "styled-components"],
    plugins
  },
  // commonjs, esm
  {
    input,
    output: [
      {
        dir,
        entryFileNames,
        format: "cjs",
        sourcemap: true,
        globals: {
          react: "React",
          "styled-components": "styled"
        }
      },
      {
        dir,
        entryFileNames,
        format: "esm",
        sourcemap: true,
        globals: {
          react: "React",
          "styled-components": "styled"
        }
      }
    ],
    external: [
      "react",
      "styled-components",
      "prop-types",
      "@pixi/app",
      "@pixi/constants",
      "@pixi/core",
      "@pixi/display",
      "@pixi/graphics",
      "@pixi/interaction",
      "@pixi/math",
      "@pixi/runner",
      "@pixi/settings",
      "@pixi/ticker",
      "@pixi/utils",
      "colornames",
      "unit-value"
    ],
    plugins
  }
];
