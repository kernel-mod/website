---
title: Building From Source
layout: ~/layouts/DocsLayout.astro
---

Building from source is super easy. I recommend making a `kernel` folder to place these in.

> Yes, [PNPM](https://github.com/pnpm/pnpm) is _required_ as it's used in the build script. It's faster and uses less drive space anyway so if you aren't using it I highly recommend it.

```bash
git clone https://github.com/kernel-mod/browser
cd browser
pnpm i
cd ..

git clone https://github.com/kernel-mod/electron
cd electron
pnpm i
pnpm run build
```

Why two repos? This means Kernel will _eventually_ be able to run as a browser extension.

Your built Kernel distro will be at `kernel/electron/dist/kernel.asar`.

So if you want to point your Kernel distro location straight to it you would use `"location": "C:/Users/YourName/GitHub/kernel/electron/dist"`.
