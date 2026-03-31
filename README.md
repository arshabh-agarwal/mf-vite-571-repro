# Module Federation Vite - Issue #571 Reproduction

Minimal reproduction for [module-federation/vite#571](https://github.com/module-federation/vite/issues/571).

## Reproduce

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in the browser.

The page has a classic script that auto-starts a framework on the `load` event, and inline module scripts that need to configure it before that happens. With `@module-federation/vite`, the module scripts are delayed and the framework auto-starts before they can run.

### Verify it works without MF

```bash
npx vite --config vite.config.noMF.js
```

Module scripts run before the `load` event — no race condition.

## Versions tested

- `@module-federation/vite@1.12.3` — works
- `@module-federation/vite@1.13.0` — broken
- `@module-federation/vite@1.13.6` — broken
