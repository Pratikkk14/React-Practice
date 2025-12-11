# React Learning Projects - AI Agent Instructions

## Project Overview
This is a monorepo containing multiple React learning projects, each demonstrating different concepts (Redux, Context API, React Router, custom hooks, etc.). Each project is independent with its own Vite + React setup.

## Architecture Patterns

### Redux Toolkit Structure (redux-mini-project)
- **Store Configuration**: Use namespaced reducers in `src/app/store.js`:
  ```js
  reducer: { todos: todoReducer }  // NOT: reducer: todoReducer
  ```
- **State Access**: Use nested selector path: `useSelector((state) => state.todos.todos)`
- **Slice Pattern**: Define reducer functions separately, then map to slice actions:
  ```js
  const Add = (state, action) => { /* logic */ }
  reducers: { addTodo: Add }
  ```
- **Action Exports**: Export both slice actions AND default reducer from slice files
- **Todo State Shape**: Each todo has `{ id, title, text, isDone, status, currentStatus }`

### Context API Pattern (contextapi-1, contextapi-2)
- **Provider Setup**: Export `Context.Provider` as named export, custom hook as default
- **Import Convention**: Use lowercase `children` prop, not uppercase `Children`
- **Theme Toggle**: Use both `data-theme` attribute AND class on `<html>` for DaisyUI compatibility:
  ```js
  html.setAttribute("data-theme", themeMode);
  html.classList.add(themeMode);
  ```

### Custom Hooks (customHook)
- **Location**: Store in `src/assets/hooks/`
- **Pattern**: Return both data and loading states from API-fetching hooks
- **URL Templates**: Use template literals for dynamic API endpoints: `` `${currency}.json` ``

### Routing (reactRouter, React-Router-Tutorial-Docs)
- **Data Loading**: Use loader functions exported from route components, imported with aliases
- **Error Handling**: `useRouteError()` hook in error boundary components
- **Form Actions**: Use React Router's `<Form>` component with `action` attribute for mutations

## Styling Conventions

### Tailwind CSS (All Projects)
- **Import Method**: Use traditional directives in CSS:
  ```css
  @import 'tailwindcss';
  ```
- **Dark Mode**: Set `darkMode: 'class'` in `tailwind.config.js`
- **DaisyUI Config**: Configure in `tailwind.config.js`, not in CSS file

### Component Patterns
- **Conditional Classes**: Use template literals: `` className={`base-class ${condition ? 'active' : 'inactive'}`} ``
- **Conditional Rendering**: Prefer ternary over logical AND when both branches render JSX
- **List Rendering**: Always include unique `key` prop, typically the item's `id`

## Development Workflow

### Setup New Project
```bash
npm create vite@latest project-name -- --template react
npm install
# For Tailwind: npm install -D tailwindcss @tailwindcss/vite
# For Redux: npm install @reduxjs/toolkit react-redux
# For DaisyUI: npm install -D daisyui
```

### Tailwind Config Creation
Tailwind v4 removed CLI - manually create `tailwind.config.js`:
```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

### Common Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## Key Files Structure
```
project/
├── src/
│   ├── app/store.js           # Redux store (if using Redux)
│   ├── features/[Feature]/    # Redux slices
│   │   └── [feature]Slice.js
│   ├── context/               # Context providers and hooks
│   │   ├── [Context].jsx
│   │   └── use[Context].jsx   # Custom hook (default export)
│   ├── components/            # React components
│   ├── assets/
│   │   ├── hooks/            # Custom hooks
│   │   └── components/       # Component barrel exports
│   └── routes/               # React Router route components
├── tailwind.config.js        # Manually created (no npx init in v4)
└── vite.config.js
```

## Project-Specific Notes

### Common Issues
- **Tailwind not working**: Ensure `@tailwindcss/vite` plugin is added to `vite.config.js`
- **Redux state undefined**: Check store reducer namespacing and selector paths
- **DaisyUI theme not changing**: Set both `data-theme` attribute and class on `<html>`
- **Context values undefined**: Ensure provider wraps components and passes `value` prop

### Import Conventions
- Named exports: `import { ThemeProvider } from './context'`
- Default exports: Can use any name: `import useTheme from './context'`
- Redux actions: Import individual actions or use namespace import
