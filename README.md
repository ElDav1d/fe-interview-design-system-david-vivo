# Frontend Interview - Design System

Hey 👋

## Fake Design Tokens Pipeline

To simulate a real-world Design System workflow, this project includes a **fake design tokens pipeline**. This pipeline consumes a local `design-tokens.json` file and generates a `variables.css` file containing CSS custom properties. This demonstrates how design tokens can be managed and distributed in a scalable, production-quality project.

### How it works

- **Source:**  
  All design tokens (such as colors, spacing, etc.) are defined in [`design-tokens.json`](./design-tokens.json) at the project root.

- **Build Script:**  
  The script [`scripts/build-tokens.ts`](./scripts/build-tokens.ts) reads the JSON file, validates its structure, and outputs a CSS file with variables to [`src/styles/variables.css`](./src/styles/variables.css).

- **Usage:**  
  The generated `variables.css` is imported globally (e.g., in Storybook and your app), making the design tokens available as CSS variables throughout your components.

- **Why:**  
  This setup mimics how modern Design Systems manage and distribute design tokens, ensuring consistency and scalability across projects.

### Tokens Format

The `design-tokens.json` file must follow this structure:

```json
{
  "color": {
    "background": { "value": "#eee" },
    "content": { "value": "#222" }
  },
  "spacing": {
    "sm": { "value": "0.5rem" }
  }
}
```

Each top-level key (e.g., `color`, `spacing`) is a group. Each group contains named tokens, and each token is an object with a `value` property (string).

### Validation & Error Handling

When you run the build script, the tokens are **strictly validated**:

- The root must be an object.
- Each group must be an object.
- Each token must be an object with a `value` string property.

If the structure is invalid, the script will **throw a descriptive error** and stop the build. This ensures only valid, well-structured tokens are used in your Design System.

**Example error:**

```
Invalid token 'color.background': must be an object with a 'value' string property
```

### Commands

```bash
# Generate variables.css from design-tokens.json
npm run build-tokens

# Start the project (automatically builds tokens)
npm run dev

# Start Storybook (automatically builds tokens)
npm run storybook
```

### Example

A sample `design-tokens.json`:

```json
{
  "color": {
    "background": { "value": "#eee" },
    "content": { "value": "#222" }
  }
}
```

Generates a `variables.css`:

```css
:root {
  --color-background: #eee;
  --color-content: #222;
}
```

---

This pipeline is included to showcase my ability to architect scalable, maintainable front-end systems, as would be expected in a real Design System context.

This is the base repository for the home test. The repository is created with `vite` and is empty, but contains some packages already installed, in particular:

- `react`
- `storybook`
- `vitest`

## Install and run

```bash
# Install dependencies
# This project use `pnpm` as package manager, but you can use also `npm` or `yarn`.
pnpm install

# And run the project
pnpm dev

# Optional: Run Storybook
pnpm storybook
```

## Figma file

The figma file of the home test is available [here](https://www.figma.com/design/OclakAGLSXDoMKLFvwLNMP/%F0%9F%92%BB-Design-System-Home-Test---Tabs-Component?node-id=0-1&t=4pG7NN6HKxgxroDz-1).
