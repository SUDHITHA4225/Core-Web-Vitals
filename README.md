# Signal News Feed: Core Web Vitals Lab

A React + Vite news feed application designed to demonstrate how frontend performance issues affect **Core Web Vitals** and how systematic optimization can improve page loading, responsiveness, and visual stability.

The project contains two versions: an intentionally slow `v1-broken` version and an optimized `v2-fixed` version.

---

## Project Overview

The application is a responsive news feed that includes:

* A hero section with a featured news image
* A grid containing 12+ article cards
* A sidebar with text-only headlines
* Skeleton loading states
* A dynamically loaded advertisement section
* An infinite scroll trigger
* Core Web Vitals monitoring using `web-vitals`

The main objective is to identify performance bottlenecks using **Lighthouse**, apply appropriate optimizations, and compare the results between the two versions.

---

## Tech Stack

* React
* TypeScript
* Vite
* Node.js
* CSS
* Lighthouse
* `web-vitals`

---

## Version 1 — `v1-broken`

The initial version intentionally contains common frontend performance anti-patterns.

### Performance Issues

**1. Render-blocking resources**

Fonts and CSS are loaded synchronously in `index.html`, which can delay the first render and negatively affect FCP.

**2. Unoptimized hero image**

The hero image is a large PNG and uses:

```html
loading="lazy"
```

It also does not define `width` and `height`, which can delay LCP and contribute to layout instability.

**3. Layout shifts**

Article images do not have explicit dimensions. An advertisement is also inserted using `setTimeout`, causing content to move when the advertisement appears.

**4. Blocking JavaScript**

A synchronous `while` loop runs for at least 500 ms inside a `useEffect`, keeping the browser's main thread busy and increasing TBT and TTI.

**5. Unnecessary Lodash usage**

The entire Lodash library is imported for a simple sorting operation:

```typescript
import _ from "lodash";
```

This unnecessarily increases the JavaScript bundle.

---

## Version 2 — `v2-fixed`

The second version applies targeted performance optimizations.

### Font and CSS Optimization

* Added `preconnect` resource hints for font providers
* Loaded font CSS asynchronously
* Added `font-display: swap`

These changes allow the page to start rendering sooner and improve FCP.

### Hero Image Optimization

The hero image was optimized by:

* Converting PNG to WebP
* Adding explicit `width` and `height`
* Removing `loading="lazy"`
* Adding `fetchpriority="high"`

Example:

```html
<img
  src="/images/hero.webp"
  width="1200"
  height="600"
  fetchpriority="high"
  alt="Featured news"
/>
```

This prioritizes the main image because it contributes significantly to LCP.

### Layout Stability

All images now have defined dimensions:

```html
<img
  src="/images/article.webp"
  width="400"
  height="250"
  alt="Article"
/>
```

Space is also reserved for the advertisement before it loads:

```css
.ad-container {
  min-height: 250px;
}
```

These changes help prevent unexpected movement and reduce CLS.

### JavaScript Optimization

The blocking `while` loop was removed from the initial component lifecycle.

The simulated analytics initialization is now deferred:

```typescript
setTimeout(() => {
  initAnalytics();
}, 0);
```

This allows the browser to complete important rendering work before executing non-critical tasks.

### Bundle Optimization

The full Lodash import was removed and native JavaScript sorting is used instead:

```typescript
articles.sort((a, b) => b.date - a.date);
```

This reduces unnecessary JavaScript in the application bundle.

---

## Core Web Vitals

The project integrates the `web-vitals` package to monitor important performance metrics.

The application logs the following metrics to the browser console:

* **FCP — First Contentful Paint**
* **LCP — Largest Contentful Paint**
* **CLS — Cumulative Layout Shift**

These metrics help measure how quickly content appears, how quickly the main content becomes visible, and how stable the page layout remains.

---

## Performance Comparison

The following table shows the Lighthouse results for the controlled `v1-broken` and `v2-fixed` versions.

| Metric            | v1-broken | v2-fixed |
| ----------------- | --------: | -------: |
| FCP               |     2.4 s |    0.9 s |
| LCP               |     4.8 s |    1.7 s |
| CLS               |      0.31 |     0.02 |
| TTI               |     3.9 s |    1.3 s |
| TBT               |    650 ms |    80 ms |
| Performance Score |        48 |       94 |

> Lighthouse results can vary depending on browser, device, network conditions, and testing environment.

---

## Lighthouse Reports

Two Lighthouse reports are included in the repository:

```text
lighthouse-v1-broken.html
lighthouse-v2-fixed.html
```

The reports can be used to compare the performance of the initial and optimized versions.

---

## Run Locally

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local Vite URL in the browser.

To reproduce the performance measurements:

1. Open Chrome DevTools.
2. Go to the **Lighthouse** tab.
3. Select **Performance**.
4. Run the Lighthouse audit.
5. Compare the results with the included reports.
6. Check the browser Console for FCP, LCP, and CLS values from `web-vitals`.

For a meaningful comparison, use the same browser, device settings, and network conditions for both versions.

---

## Key Learnings

This project provided practical experience with:

* Core Web Vitals
* Lighthouse performance analysis
* Font and CSS optimization
* Image optimization
* LCP optimization
* Preventing cumulative layout shift
* Main-thread performance
* Deferring non-critical JavaScript
* JavaScript bundle optimization
* Performance monitoring with `web-vitals`

---

## Conclusion

The project demonstrates a practical approach to frontend performance optimization.

The `v1-broken` version was intentionally designed with common performance bottlenecks, making it possible to measure their impact using Lighthouse. The `v2-fixed` version then addressed these issues through optimized resource loading, image optimization, layout stabilization, deferred JavaScript execution, and reduced bundle usage.

The overall process followed in this project was:

```text
Build
  ↓
Measure with Lighthouse
  ↓
Identify Performance Bottlenecks
  ↓
Apply Optimizations
  ↓
Measure Again
  ↓
Compare Results
```

This approach can be applied to real-world React applications to improve loading speed, responsiveness, visual stability, and overall user experience.
