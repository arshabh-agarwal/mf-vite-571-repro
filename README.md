# module-federation/vite#571

Reproduction: execution order of classic and module scripts changes between `@module-federation/vite` 1.12.3 and 1.13.0.

## Steps

```bash
npm install
npm run dev
```

Open the URL shown in the terminal.

## Switch versions

```bash
npm install @module-federation/vite@1.12.3
# or
npm install @module-federation/vite@1.13.0
```

Restart dev server after switching.
