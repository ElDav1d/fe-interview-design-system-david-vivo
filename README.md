# Frontend Interview - Design System

Hey 👋

This is my solution to the home test.

It meets the requirements asserted in Introduction.mdx with an implementation based on my experience and knowledge, with a quality oriented approach in mind in order to reach production code as much as a home test permits.

## Install and run

```bash
# Install dependencies
# This project use `pnpm` as package manager, but you can use also `npm` or `yarn`.
pnpm install

# Run the development server (http://localhost:5173)
pnpm dev

# Run Storybook (http://localhost:6006)
pnpm storybook

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
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

---

## Final Project Status & Acceptance Criteria

### ✅ All Acceptance Criteria Completed (100%)

This project successfully delivers all requirements specified in the technical challenge:

#### 1. **Tabs Component with Variants**

- ✅ **Pill variant** fully implemented with rounded borders and background states
- ✅ **Underline variant** fully implemented with bottom border indicator
- ✅ Both variants work seamlessly across all Tab components (Tab, TabList, TabsGroup)
- ✅ Variant switching is inherited through React Context for consistency

#### 2. **Badge Component Implementation**

- ✅ Badge implemented as an **independent, reusable component**
- ✅ Integrated with Tab using the **composition pattern (children prop)**, ensuring a clean and flexible API
- ✅ Badge can be used standalone or inside any component, not just Tab

#### 3. **Badge Variants**

- ✅ **Neutral variant** (default) for general information
- ✅ **Positive variant** for success states and confirmations
- ✅ **Negative variant** for errors, warnings, and critical notifications
- ✅ All variants include proper semantic colors and accessibility contrast ratios

### Test-Driven Development (TDD) Commitment

The entire project was built following **strict TDD methodology** (Red → Green → Refactor):

- **81 passing unit and integration tests** covering all components and edge cases
- Tests written **before** implementation in every feature
- Comprehensive coverage includes:
  - Component rendering and props
  - Keyboard navigation (Arrow keys, Home/End, Tab, Enter/Space)
  - ARIA roles and attributes
  - Context API state management
  - Controlled and uncontrolled modes
  - Accessibility features (focus management, screen reader support)

**Test execution:**

```bash
npm test -- --run
# Result: 81 tests passing, 0 failures
```

### Clean Component API Design

The Badge integration demonstrates **composition over configuration**:

```tsx
// Clean, declarative API using children prop
<Tab value="inbox" labelText="Inbox">
  <Badge variant="negative">5</Badge>
</Tab>
```

This approach:

- Keeps the Tab API simple and focused
- Allows Badge to remain independent and reusable
- Follows React best practices (composition pattern)
- Provides maximum flexibility for consumers

---

## Architectural Rationale & Design System Quality

### Compound Components Pattern

The Tabs component family uses the **Compound Components pattern**, where multiple related components work together to form a cohesive API:

```tsx
<TabsGroup variant="pill" defaultActiveTab="home">
  <TabList>
    <Tab value="home" labelText="Home" />
    <Tab value="profile" labelText="Profile" />
  </TabList>
  <TabPanel value="home">Home content</TabPanel>
  <TabPanel value="profile">Profile content</TabPanel>
</TabsGroup>
```

**Why this pattern?**

- **Clear hierarchy:** The structure mirrors the semantic relationships between tabs and panels
- **Flexibility:** Each component can be styled and configured independently
- **Encapsulation:** Each component has a single responsibility (Tab handles clicks, TabPanel handles content)
- **Extensibility:** New components (like Badge) can be composed without breaking existing APIs

### React Context API for State Orchestration

The TabsGroup component uses **React Context API** to share state across all child components:

```tsx
// Context provides variant, activeTab, and setActiveTab
const { variant, activeTab, setActiveTab } = useTabs();
```

**Benefits:**

- **Eliminates prop drilling:** No need to pass variant and activeTab through every level
- **Automatic synchronization:** All Tabs and TabPanels stay in sync via shared context
- **Cleaner component tree:** Consumers don't see internal state management plumbing
- **Type-safe:** TypeScript ensures context values are correctly typed

### Controlled and Uncontrolled Modes

The TabsGroup supports both modes to provide maximum flexibility for Design System consumers:

#### Uncontrolled Mode (Internal State)

```tsx
<TabsGroup defaultActiveTab="home">
  {/* TabsGroup manages state internally */}
</TabsGroup>
```

**Use cases:** Simple tabs where parent doesn't need to know active tab

#### Controlled Mode (External State)

```tsx
const [activeTab, setActiveTab] = useState("home");

<TabsGroup value={activeTab} onChange={setActiveTab}>
  {/* Parent component controls the state */}
</TabsGroup>;
```

**Use cases:**

- **URL synchronization:** Sync active tab with browser URL (`/dashboard?tab=profile`)
- **Form validation:** Prevent tab switching until current tab is valid
- **Analytics:** Track tab changes for user behavior analysis
- **Multi-step workflows:** Control tab progression in wizards or onboarding flows

This dual-mode design is **essential for enterprise Design Systems** where different use cases require different levels of control.

---

### Technical Implementation Highlights

#### 1. **Styling with SASS (Built from Scratch)**

All styles are written in **pure SASS** without external CSS frameworks:

- **Global reset:**
- **Mobile-first approach:**
- **Design Tokens integration:**
- **Mixins for reusability:**

#### 2. **Accessibility Implementation**

The component implements **WCAG 2.1 AA compliance** with careful attention to keyboard navigation and screen reader support:

**Focus Management:**

**ARIA Roles and Attributes:**

- `role="tablist"` on TabList (announces "tab list" to screen readers)
- `role="tab"` on Tab (announces "tab" with label and selected state)
- `role="tabpanel"` on TabPanel (announces "tab panel" with associated content)
- `aria-selected="true|false"` indicates active tab
- `aria-controls` links tab to its panel (e.g., `tab-home` → `panel-home`)
- `aria-labelledby` links panel back to its tab for context
- `aria-live="polite"` on Badge for dynamic content changes

**Keyboard Navigation:**

- **Tab:** Focus into/out of tab list
- **Arrow Left/Right:** Navigate between tabs
- **Home/End:** Jump to first/last tab
- **Enter/Space:** Activate focused tab
- **Roving tabindex:** Only one tab is focusable at a time (`tabIndex={0}` on active, `tabIndex={-1}` on others)

#### 3. **Developer Experience (DX)**

The codebase prioritizes maintainability and developer productivity:

**TypeScript:**

- All components fully typed with TypeScript interfaces
- Props interfaces extend native HTML attributes (`HTMLAttributes<HTMLButtonElement>`)
- Exported types for consumer projects (`TabVariant`, `BadgeVariant`, `BadgeProps`, etc.)
- Type-safe Context API with proper error handling

**JSDoc Comments:**

---

### Storybook Documentation

Comprehensive **Storybook stories** demonstrate all features and use cases:

- **8 TabsGroup stories:** Including PillVariant, UnderlineVariant, ControlledMode, WithBadges, CompleteExample
- **7 Tab stories:** Covering variants, states, badge integration
- **5 TabList stories:** Keyboard navigation, overflow behavior
- **4 TabPanel stories:** Visibility, focus management
- **6 Badge stories:** All variants, dynamic content, accessibility patterns

---

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
