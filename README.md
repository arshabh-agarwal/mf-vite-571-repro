# module-federation/vite#571

Reproduction: execution order of classic scripts, module scripts, and the load event changes between `@module-federation/vite` 1.12.3 and 1.13.0.

## Steps

```bash
npm install
npm run dev
```

Open the URL shown in the terminal.

### With `@module-federation/vite@1.12.3`

```
1. classic script A
3. classic script B
2. module script A
4. module script B
5. load event
```

### With `@module-federation/vite@1.13.0`

```
1. classic script A
3. classic script B
5. load event
2. module script A/B
4. module script B/A
```

Module scripts execute after the load event, and their relative order is non-deterministic.

## Switch versions

```bash
npm install @module-federation/vite@1.12.3
# or
npm install @module-federation/vite@1.13.0
```

Restart dev server after switching.

## Without the plugin (baseline)

```bash
npx vite --config vite.config.noMF.js
```

```
1. classic script A
3. classic script B
2. module script A
4. module script B
5. load event
```

## PR #573 — double base-path with non-root base

PR #573 fixes the execution order issue but introduces a double base-path when `config.base` is non-root:

```bash
npm install https://pkg.pr.new/@module-federation/vite@573
npx vite --config vite.config.basepath.js
```

Open the URL shown in the terminal at `/portal/`. The `hostAutoInit` script 404s because the base path is applied twice:

```
/portal/portal/node_modules/__mf__virtual/...hostAutoInit...  ← double prefix
/portal/index.html?html-proxy&index=0.js                      ← correct
```
