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
