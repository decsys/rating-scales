# DECSYS Rating Scales

This package contains re-usable [React] Components used by the DECSYS project for native HTML/JS [Rating Scales].

You can use these basically anywhere you have [React].

The DECSYS Project uses them for survey question components for its Survey Platform.

# Usage

## Installation

`npm install @decsys/rating-scales`

## Node

All the components are default exports from individual modules, that can be used in a node environment.

Simply:

- `import Component from "path/to/component";`
- `const Component = require("path/to/component");`

## Browser

The components can be used directly in the browser, as per the examples in `samples/`.

Refer to the `dist/` file, and you can access each Scale component under the namesapce `DECSYS`.

The sub-components are not directly available in the browser.

## Scale Components

The following complete ratings scale components are available:

- Likert Scale
  - `import LikertScale from "likert/Scale";`
  - `DECSYS.LikertScale` when using the browser build.

# Documentation

Full Component reference documentation can be built by running `npm run docs` in a clone of the repository.

# Building

The build workflow consists of several simple npm scripts.

- `npm run lint` will run eslint against the source.
- `npm run lib` will clear `lib/` directory and (re)build the node.js library version.
  - This just transpiles the ES2018+ source into something node can run today.
  - This is run in CI to provide the `lib/` version included in the npm package.
- `npm run dist` will build a development version for the browser.
- `npm run dist:prod` will build a production version for the browser.
  - This is run in CI to provide the `dist/` version included in the npm package.

# Licensing

At this time, this software has no license, and therefore all rights are reserved as per author copyright, with the exception of rights waived under the GitHub Terms of Service.

Please don't modify, distribute or use this software until a license is in place.

[react]: https://reactjs.org/
[rating scales]: https://en.wikipedia.org/wiki/Rating_scale
