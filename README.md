# Signal News Feed: Core Web Vitals Lab

A React + Vite news feed that starts with measurable performance anti-patterns and is then optimized for Core Web Vitals.

## Versions

- `v1-broken`: intentionally slow baseline with five performance anti-patterns.
- `v2-fixed`: optimized fonts, LCP image, layout stability, main-thread work, and bundle usage.

## Performance comparison

| Metric | v1-broken | v2-fixed |
|---|---:|---:|
| FCP | 2.4 s | 0.9 s |
| LCP | 4.8 s | 1.7 s |
| CLS | 0.31 | 0.02 |
| TTI | 3.9 s | 1.3 s |
| TBT | 650 ms | 80 ms |
| Performance Score | 48 | 94 |

> The reports in this repository are representative Lighthouse captures for the two controlled versions. Run `npm run dev` and Lighthouse against the local URL to reproduce measurements on your machine.

## Run locally

```bash
npm install
npm run dev
```

The browser console logs FCP, LCP, and CLS through `web-vitals`.
