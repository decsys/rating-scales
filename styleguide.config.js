// const path = require("path");
// const pkg = require("./package.json");

module.exports = {
  styleguideDir: "docs",
  title: "Decsys Rating Scales",

  // TODO fix final import pathing
  // getComponentPathLine(componentPath) {
  //   const name = path.basename(componentPath, ".js");

  //   const dir = path.dirname(componentPath).replace(/src[\\\/]/, `${pkg.name}/`);
  //   return `import ${name} from '${dir}';`;
  // },

  pagePerSection: true,
  sections: [
    {
      name: "README",
      content: "./README.md"
    },
    {
      name: "Core Components",
      content: "src/core/overview.md",
      components: ["src/core/*.js"]
    },
    {
      name: "Likert Scale",
      content: "src/likert/overview.md",
      components: ["src/likert/*.js"]
    }
  ]
};
