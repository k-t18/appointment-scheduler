# Building and Publishing a React Component Library with Tailwind CSS: Lessons Learned

Over the last two days, I embarked on a journey to turn my custom Appointment Scheduler UI components into a reusable, open-source React component library. The goal was to publish this package to npm so other developers could use it with minimal setup. While the initial parts were smooth, I ran into several tricky challenges around **styling**, **Tailwind integration**, and **developer experience**. This document outlines my process and learnings.

---

## ✅ The Starting Point

I had a fully working appointment scheduling UI within a larger app, styled entirely using Tailwind CSS. It included components like:

- `WeekSlider`
- `TimeSlotPicker`
- `MonthDropdown`
- `Legends`

All components were visually perfect, responsive, and built with utility-first Tailwind classes. My plan was to:

1. Extract these components into a new monorepo.
2. Build a `package/` folder containing the reusable component library.
3. Use a `playground/` Vite app to test the components locally.
4. Publish the package to npm.

---

## 🧱 Initial Setup

- Set up a monorepo using npm workspaces.
- Built the component library inside `package/` using `tsup`.
- Used Tailwind and PrimeReact for styles and icons.
- Used a `playground/` Vite app to verify UI behavior.

In the monorepo, everything worked beautifully. Components rendered as expected, and styling was accurate thanks to shared Tailwind config.

---

## 🚨 The Real Challenge Begins: Testing Published Package

After publishing the package to npm, I created a brand-new Vite + React app to simulate how another developer would use it:

```bash
npm install appointment-scheduler-ui
```

Then, in `App.tsx`:

```tsx
import { WeekSlider } from "appointment-scheduler-ui";
```

### ❌ The UI Rendered, But No Styles Applied

- Components loaded visually (DOM existed)
- Tailwind class names (e.g., `bg-white`, `text-blue-600`) were present
- But no actual styles applied — it looked broken

---

## 🔍 Root Cause: Tailwind Doesn't Scan `node_modules` by Default

Tailwind CSS only generates styles based on files it scans via `content[]` in `tailwind.config.js`. Since my npm package's styles were compiled into `dist/*.js`, Tailwind couldn't see the original class names.

### I Tried:

- Adding `./node_modules/appointment-scheduler-ui/dist/**/*.{js,ts,jsx,tsx}` to `content[]` → still didn't work reliably
- Adding Tailwind `safelist[]` for all utility classes → some styles appeared, but it was hacky
- Verifying that class names were still intact in the published `dist/` → yes, they were

---

## 🔁 Workaround Options Explored

### ✅ Option 1: Ask Consumers to Add Tailwind Config

```js
// tailwind.config.js
content: [
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/appointment-scheduler-ui/dist/**/*.{js,ts,jsx,tsx}",
];
```

✅ Works technically
❌ Not DX-friendly — every user must touch their Tailwind config

### ✅ Option 2: Export Precompiled `styles.css`

- Run `tailwindcss build` inside my package
- Export `dist/styles.css`
- Ask users to manually import it:

```tsx
import "appointment-scheduler-ui/dist/styles.css";
```

✅ Works 100%
❌ Still requires consumer to import CSS manually

---

## 🤔 The Decision: Move to CSS-in-JS

After evaluating all the above, I decided that:

> ✨ If I want users to install my package and use components with **zero extra configuration**, I need to adopt **CSS-in-JS**.

### Benefits:

- ✅ No Tailwind setup required
- ✅ No need to import any styles manually
- ✅ Full styling control via props or theme
- ✅ Easy to support theming and design tokens in future

### Next Steps:

- Refactor each component to use Emotion or similar
- Replace Tailwind classes with equivalent styled components or style objects
- Make styles customizable via props (colorScheme, size, etc.)

---

## 📘 Summary of Learnings

| Topic                   | Insight                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| Tailwind + npm packages | Classnames must be visible during build; `node_modules` is ignored by default            |
| Best DX                 | Components should “just work” on install — avoid requiring consumer-side config          |
| CSS-in-JS               | Ideal for reusable libraries because styles are embedded or generated at runtime         |
| Debugging               | Always check if classnames exist in final `dist/` and verify Tailwind output in devtools |

---

## 🧪 Commands and Steps to Publish an npm Package

1. **Initialize package folder**

```bash
cd package
npm init -y
```

2. **Add entry files**

- `src/components/*.tsx`
- `src/index.ts` → export everything

3. **Install build tools**

```bash
npm install -D typescript tsup
```

4. **Add `tsup.config.ts`**

```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
});
```

5. **Update `package.json`**

```json
{
  "main": "dist/index.cjs",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "prepare": "npm run build"
  },
  "peerDependencies": {
    "react": ">=18.0.0 <20.0.0",
    "react-dom": ">=18.0.0 <20.0.0"
  }
}
```

6. **Build the package**

```bash
npm run build
```

7. **Login to npm**

```bash
npm login
```

8. **Publish to npm**

```bash
npm publish --access public
```

9. **Test** in a new app:

```bash
npm install your-package-name
```

```tsx
import { WeekSlider } from "your-package-name";
```

---

This journey highlighted how different the needs of _apps_ vs _libraries_ are — and why many successful design systems (like Chakra UI, MUI, Radix, ShadCN) either bundle styles or use CSS-in-JS to guarantee consistency and developer happiness.
