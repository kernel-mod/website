---
title: Package Structure
layout: ~/layouts/MainLayout.astro
---

Each package has an `index.json` file that looks something like this. Dependencies will always load before the package unless you make it cyclical. Please don't do that.

```json
{
	"name": "Package Name",
	"id": "PackageID",
	"dependencies": ["AnyIDs", "OfOtherPackages"]
}
```

Packages are written in CommonJS, but there will be a template later that lets you write them in ESModules and alias functions from Kernel itself.

To load a package in a specific context you simply create a file and name it `main.js`, `preload.js`, or `renderer.js`. All of these files are optional, only the `index.json` file is required. Kernel doesn't even care if you have none of them, but I do.

All of the context files look the same, except the renderer has no Node access and is in ESM.

### `main.js` & `preload.js`

```js
const path = require("path");

module.exports = class PackageName {
	start() {
		console.log("Package loaded!", path);
	}
};
```

### `renderer.js`

```js
// You can only import browser-friendly modules.
import * as nests from "nests";

export default class PackageName {
	start() {
		console.log("Package loaded!", nests);
	}
}
```
