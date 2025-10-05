# Frontend Interview - Design System

Hey 👋

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

## Fake Design Tokens Pipeline

> "(...)The design is created in Figma, with foundations built in SASS through internal Design Tokens(...)"

To simulate a real-world Design System workflow, this project includes a **fake design tokens pipeline**. This pipeline consumes a local `design-tokens.json` file and generates a `variables.css` file containing CSS custom properties.

### How it works

- **Source:**  
  All Design Tokens (such as colors, spacing, etc.) are defined in [`design-tokens.json`](./design-tokens.json) at the project root.

- **Build Script:**  
  The script [`scripts/build-tokens.ts`](./scripts/build-tokens.ts) reads the JSON file, validates its structure, and outputs a CSS file with variables to [`src/styles/variables.css`](./src/styles/variables.css).

- **Usage:**  
  The generated `variables.css` is imported globally (e.g., in Storybook and your app), making the Design Tokens available as CSS variables throughout the components.

- **Why:**  
  This setup mimics Design Tokens management and distribution, ensuring consistency and scalability across projects.

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

If the structure is invalid, the script will **throw a descriptive error** and stop the build. This ensures only valid, well-structured tokens are used in the Design System.

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

### Tradeoffs

This is a simulation, therefore I will avoid any rabbit hole that will potentially jeopardize this technical test delivery.

Some not clean decisions are:

- As long as variables.css is being generated each time instead of merging the new tokens with the existing ones, I'm importing the font-family at index.css

- Responsive breakpoints have been excluded from the Design Tokens flow: I couldn't figure out a quick and robust solution to consume the values from the media queries, neither I'm considering an external, more complex builder tool.

- I've hardcoded the entry point of design-tokens.json in buildTokens(), since I couldn't figure out a quick and robust solution

---

### My rationale on this

Is this **over-engineering**? Absolutely **yes**.

**\*But** this pipeline is included to showcase my ability and intention to architect scalable, maintainable front-end systems, as would be expected in a real Design System context.

## Accessibility Validation Note

This component has been audited using VoiceOver on macOS, which is the native screen reader for Apple devices and known for its strict interpretation of ARIA roles and semantic structure.

While I do not have access to a Windows environment, VoiceOver provides a reliable baseline for accessibility compliance. The component has been tested for:

- Correct use of ARIA roles (`tablist`, `tab`, `tabpanel`)
- Proper keyboard navigation (Arrow keys, Home/End, Enter/Space)
- Focus management and `tabIndex` behavior
- Semantic relationships via `aria-labelledby` and `aria-controls`
- Visibility toggling using `hidden` attributes
- Screen reader announcements and navigation flow

These practices align with the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) and are expected to behave consistently across major screen readers, including NVDA and JAWS on Windows.

Additional automated checks were performed using Lighthouse and axe DevTools to ensure WCAG 2.1 AA compliance.

If further validation is required in a Windows environment, I recommend testing with NVDA (free and widely used) or JAWS (industry standard) to confirm cross-platform consistency.
