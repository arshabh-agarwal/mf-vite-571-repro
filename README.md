# Module Federation Vite - Issue #571 Reproduction

Minimal reproduction for [module-federation/vite#571](https://github.com/module-federation/vite/issues/571).

## The Bug

`@module-federation/vite` ≥1.13.1 introduced a top-level `await` in `hostAutoInit` ([PR #480](https://github.com/module-federation/vite/pull/480)) that blocks **all** subsequent module scripts (inline and external) on the page. Classic scripts are unaffected and execute independently.

This disrupts the expected execution order between classic and module scripts. Any framework that loads via a classic script and auto-starts (e.g., QUnit) will race against module scripts that need to configure it first.

## Reproduce

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in the browser.

**Expected (≤1.13.0):** The inline module script configures the framework before it auto-starts.

**Actual (≥1.13.1):** The `hostAutoInit` top-level `await` delays the inline module script. The framework auto-starts before the module script can configure it.

## Root Cause

In `src/virtualModules/virtualRemoteEntry.ts`, `writeHostAutoInit` was changed from fire-and-forget to top-level `await`:

```javascript
// Before (≤ v1.13.0) — non-blocking, module completes instantly
import("remoteEntry").then(re => re.init());

// After (≥ v1.13.1) — blocking, delays all subsequent module scripts
const remoteEntry = await import("remoteEntry");
await remoteEntry.init();
```

The `await` is unnecessary because shared and remote modules already coordinate via `initPromise`. The fire-and-forget pattern starts the init and lets `initPromise` handle the rest.
