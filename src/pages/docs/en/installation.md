---
title: Installation
layout: ~/layouts/DocsLayout.astro
---

## Using The Installer

You can download the [installer](https://github.com/kernel-mod/installer) from GitHub.

Upon opening it, the installer will scan your drive for Electron apps and give you an option to install Kernel to them.

If the installer didn't detect the app you're looking for, select the `Install To Path` option.

I also would appriciate it if you would report any apps the installer doesn't detect regardless of what platform you're on.

## Manually

If for whatever reason you need to install Kernel manually--like if the installer hasn't been finished yet--or just want to learn how it works, here are the instructions.

First of all, you need to download Kernel. Currently you need to build Kernel yourself because I'm too lazy to write a CI to build it for you for now.

Every non-portable Electron app--that I've seen so far--has a folder where the Electron binary is stored. This main folder is usually in `AppData/Local` on Windows. In that folder there's another folder usually in `resources` called `app`.

Sometimes this `app` folder is a file and is called `app.asar` instead.

If `app` is a folder, rename it to `app-original` and create a new folder called `app`. If it's `app.asar` just create the new `app` folder.

The new `app` folder you made tricks Electron into loading Kernel's code first. Kernel then starts up and loads your packages, then it starts the original app.

### `app` Folder Contents

Place these in the new `app` folder you made. Don't forget to change the `"location"` property in `package.json`.

#### `index.js`

```js
const path = require("path");
require(path.join(
	require(path.join(__dirname, "package.json")).location,
	"kernel.asar"
));
```

#### `package.json`

```json
{
	"name": "kernel",
	"main": "index.js",
	"location": "THE PATH TO YOUR KERNEL DISTRO FOLDER"
}
```
