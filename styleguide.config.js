const path = require("path");
const pkg = require("./package.json");

module.exports = {
  styleguideDir: "docs",
  title: "Decsys Rating Scales",

  pagePerSection: true,
  sections: [
    {
      name: "README",
      content: "./README.md"
    },
    {
      name: "Scales",
      content: "src/overview.md",
      components: [
        "src/discrete/components/Scale.js",
        "src/ellipse/components/Scale.js"
      ]
    }
  ],

  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }
  },

  // TODO fix final import pathing
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, ".js");

    const dir = componentPath
      .replace(/src/, `${pkg.name}/esm`)
      .replace(/\\/g, "/")
      .replace("/components/Scale.js", "");
    return `import ${name} from '${dir}';`;
  }
};
