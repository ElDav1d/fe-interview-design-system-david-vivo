# TabsGroup Implementation Guide - TDD Step by Step

## Overview

This guide provides **8 granular steps** to implement the TabsGroup orchestrator component following **strict TDD methodology**. Each step is equivalent to one PR iteration (branch → PR → review → merge).

**Key Principles:**

- TDD strict: Red → Green → Refactor cycle
- Types defined inline (not in separate files)
- Follow existing codebase patterns
- TabsGroup restricted to Tab, TabList, and TabPanel children only
- Badge support prepared but not implemented yet

---

## Implementation Plan

```
STEP 1: Setup - Create folder structure and empty files
STEP 2: TDD Red - Write tests for TabsContext (useTabs hook)
STEP 3: TDD Green - Implement TabsContext
STEP 4: TDD Red - Write tests for TabsGroup (orchestrator)
STEP 5: TDD Green - Implement TabsGroup
STEP 6: Refactor - Update Tab to consume Context
STEP 7: Refactor - Update TabPanel to consume Context (optional)
STEP 8: Stories - Create comprehensive Storybook stories
```

---

## STEP 1: Setup - Create Folder Structure

### 📋 Prompt for IDE:

```
Create the following folder structure for the TabsGroup component following the existing pattern in the repository:

src/components/Tabs/TabsGroup/
├── TabsGroup.tsx (empty file with TODO comment)
├── TabsGroup.scss (empty file)
├── TabsContext.tsx (empty file with TODO comment)
├── __tests__/
│   ├── TabsGroup.test.tsx (empty file with TODO comment)
│   └── TabsContext.test.tsx (empty file with TODO comment)
├── stories/
│   └── TabsGroup.stories.tsx (empty file with TODO comment)
└── index.ts (empty file)

REQUIREMENTS:
- Follow the exact same folder structure as Tab, TabList, and TabPanel components
- Create empty files with TODO comments only
- Do NOT implement any logic yet
- Add index.ts with empty content for now

After creating the files, update src/components/Tabs/index.ts to export TabsGroup:
export { default as TabsGroup } from "./TabsGroup";
```

**Expected Result:** Empty file structure created, ready for TDD.

---

## STEP 2: TDD Red - Tests for TabsContext

### 📋 Prompt for IDE:

````
Write tests for the TabsContext hook (useTabs) following TDD red phase and the existing test patterns in the repository.

FILE: src/components/Tabs/TabsGroup/__tests__/TabsContext.test.tsx

REQUIREMENTS:
- Use the same testing style as existing tests (Tab.test.tsx, TabList.test.tsx)
- Use Vitest and React Testing Library
- All tests should FAIL initially (red phase)
- Do NOT implement TabsContext.tsx yet

TEST CASES TO COVER:
1. useTabs throws error when used outside TabsGroup
2. useTabs returns correct context value when used inside TabsGroup (variant, activeTab, setActiveTab)
3. Context updates when activeTab changes

EXAMPLE STRUCTURE (adapt to our codebase style):
```typescript
import { renderHook } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import { useTabs } from "../TabsContext";

describe("useTabs", () => {
  it("throws error when used outside TabsGroup", () => {
    // Test implementation
  });

  it("returns context value when used inside TabsGroup", () => {
    // Test implementation with wrapper
  });
});
````

CONSTRAINTS:

- Follow existing test file conventions
- Use descriptive test names
- Keep tests simple and focused

```

**Expected Result:** Tests written but FAILING (red phase).

---

## STEP 3: TDD Green - Implement TabsContext

### 📋 Prompt for IDE:

```

Implement the TabsContext and useTabs hook to make the tests pass (TDD green phase).

FILES TO IMPLEMENT:

1. src/components/Tabs/TabsGroup/TabsContext.tsx
2. src/components/Tabs/TabsGroup/index.ts (add exports)

REQUIREMENTS:

- Create TabsContext using React.createContext
- Implement useTabs hook with proper error handling
- Define TypeScript types INLINE in TabsContext.tsx (not in a separate file)
- Follow the exact same code style as existing components (Tab.tsx, TabList.tsx)
- Make all tests in TabsContext.test.tsx PASS

TYPE DEFINITIONS (define inline in TabsContext.tsx):

```typescript
export type TabVariant = "pill" | "underline";

export interface TabsContextValue {
  variant: TabVariant;
  activeTab: string;
  setActiveTab: (value: string) => void;
}
```

CONSTRAINTS:

- useTabs must throw descriptive error when used outside TabsGroup
- Context default value should be null
- Follow existing patterns for error messages
- Export types for use in other components

Update index.ts to export:

```typescript
export { default } from "./TabsGroup";
export { useTabs } from "./TabsContext";
export type { TabsContextValue, TabVariant } from "./TabsContext";
```

```

**Expected Result:** All TabsContext tests PASSING (green phase).

---

## STEP 4: TDD Red - Tests for TabsGroup

### 📋 Prompt for IDE:

```

Write comprehensive tests for the TabsGroup orchestrator component following TDD red phase.

FILE: src/components/Tabs/TabsGroup/**tests**/TabsGroup.test.tsx

REQUIREMENTS:

- Use the same testing style as existing tests (Tab.test.tsx, TabList.test.tsx, TabPanel.test.tsx)
- Use Vitest and React Testing Library
- All tests should FAIL initially (red phase)
- Do NOT implement TabsGroup.tsx yet

TEST CASES TO COVER:

1. TabsGroup renders children correctly
2. TabsGroup provides default variant "pill" to context
3. TabsGroup provides custom variant to context
4. TabsGroup manages activeTab in uncontrolled mode (defaultValue)
5. TabsGroup uses controlled value when provided (value prop)
6. TabsGroup calls onChange callback when activeTab changes
7. TabsGroup applies custom className

EXAMPLE TEST STRUCTURE (adapt to our style):

```typescript
import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import TabsGroup from "../TabsGroup";
import Tab from "../../Tab/Tab";
import TabList from "../../TabList/TabList";

describe("TabsGroup", () => {
  it("renders children correctly", () => {
    render(
      <TabsGroup>
        <TabList>
          <Tab value="tab1" labelText="Tab 1" />
        </TabList>
      </TabsGroup>
    );

    expect(screen.getByRole("tab")).toBeInTheDocument();
  });

  // Add more tests...
});
```

CONSTRAINTS:

- Test both controlled and uncontrolled modes
- Test that context is properly provided to children
- Use userEvent for interactions if needed
- Follow existing test naming conventions

```

**Expected Result:** Tests written but FAILING (red phase).

---

## STEP 5: TDD Green - Implement TabsGroup

### 📋 Prompt for IDE:

```

Implement the TabsGroup orchestrator component to make all tests pass (TDD green phase).

FILES TO IMPLEMENT:

1. src/components/Tabs/TabsGroup/TabsGroup.tsx
2. src/components/Tabs/TabsGroup/TabsGroup.scss (minimal styles if needed)

REQUIREMENTS:

- Implement both controlled and uncontrolled modes
- Use useState for internal state management
- Provide TabsContext.Provider with correct values
- Define TypeScript interface INLINE in TabsGroup.tsx (not in separate file)
- Follow the exact same code style as existing components
- Make ALL tests in TabsGroup.test.tsx PASS

INTERFACE (define inline in TabsGroup.tsx):

```typescript
import { ReactNode } from "react";
import { TabVariant } from "./TabsContext";

export interface TabsGroupProps {
  variant?: TabVariant;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}
```

IMPLEMENTATION LOGIC:

- Use useState with defaultValue for uncontrolled mode
- Check if component is controlled (value !== undefined)
- In handleTabChange:
  - Update internal state only if uncontrolled
  - Always call onChange if provided
- Provide context with: { variant, activeTab, setActiveTab }
- Render children inside a wrapper div with className

CONSTRAINTS:

- Must support ONLY Tab, TabList, and TabPanel as children
- Follow existing component patterns (props spreading, className handling)
- Add JSDoc comments for the component
- Keep it simple and readable

```

**Expected Result:** All TabsGroup tests PASSING (green phase).

---

## STEP 6: Refactor - Update Tab Component

### 📋 Prompt for IDE:

```

Refactor the existing Tab component to consume TabsContext and remove manual variant/isSelected props.

FILES TO MODIFY:

1. src/components/Tabs/Tab/Tab.tsx
2. src/components/Tabs/Tab/**tests**/Tab.test.tsx (update tests)
3. src/components/Tabs/Tab/stories/Tab.stories.tsx (update stories)

REQUIREMENTS:

- Import and use useTabs() hook from TabsGroup
- Remove variant and isSelected props (get from context instead)
- Add value prop (required for identifying the tab)
- Add children prop (for future Badge support)
- Keep all existing functionality (click handlers, keyboard navigation, ARIA attributes)
- Update TabProps interface inline

NEW TAB INTERFACE (update inline in Tab.tsx):

```typescript
export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string; // NEW: unique identifier
  labelText: string;
  children?: ReactNode; // NEW: for Badge support later
  className?: string;
}
```

IMPLEMENTATION CHANGES:

- Call const { variant, activeTab, setActiveTab } = useTabs() at component start
- Calculate isSelected = activeTab === value
- In handleClick: call setActiveTab(value)
- Render children after labelText if provided: {children && <span className="tab-extras">{children}</span>}
- Add ARIA attributes: aria-controls={`panel-${value}`}, id={`tab-${value}`}, tabIndex={isSelected ? 0 : -1}

UPDATE TESTS:

- Wrap Tab components in TabsGroup for tests to work
- Update test assertions to match new API
- All tests must PASS after refactor

UPDATE STORIES:

- Wrap Tab in TabsGroup with defaultValue
- Show examples with and without children (prepare for Badge)
- Update controls to remove variant and isSelected (now from context)

CONSTRAINTS:

- Maintain backward compatibility in visual appearance
- All existing tests must pass with minimal changes
- Follow existing code style
- Add .tab-extras { display: inline-flex; align-items: center; margin-left: var(--spacing-2xs); } to Tab.scss

```

**Expected Result:** Tab refactored, all tests PASSING, stories updated.

---

## STEP 7: Refactor - Update TabPanel (Optional)

### 📋 Prompt for IDE:

```

Refactor TabPanel to optionally consume TabsContext for automatic visibility management.

FILES TO MODIFY:

1. src/components/Tabs/TabPanel/TabPanel.tsx
2. src/components/Tabs/TabPanel/**tests**/TabPanel.test.tsx
3. src/components/Tabs/TabPanel/stories/TabPanel.stories.tsx

REQUIREMENTS:

- TabPanel can work BOTH standalone (with isSelected prop) AND within TabsGroup (auto-detect from context)
- Add value prop to connect with Tab via context
- Make it backward compatible (existing usage should still work)
- Follow existing code patterns

NEW TABPANEL INTERFACE (update inline):

```typescript
export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  value?: string; // NEW: connects to Tab's value via context
  isSelected?: boolean; // Keep for standalone usage
}
```

IMPLEMENTATION LOGIC:

- Try to get context with useTabs() wrapped in try/catch (optional context)
- If context exists and value is provided: use activeTab === value
- Otherwise: fallback to isSelected prop
- Calculate: const isVisible = value && context ? context.activeTab === value : isSelected

UPDATE TESTS:

- Test standalone mode (without TabsGroup)
- Test context mode (within TabsGroup)
- All tests must PASS

UPDATE STORIES:

- Show both usage modes
- Demonstrate connection between Tab and TabPanel via value

CONSTRAINTS:

- Must remain backward compatible
- Don't break existing tests/stories
- Keep implementation simple

```

**Expected Result:** TabPanel refactored (optional context), all tests PASSING.

---

## STEP 8: Stories - Comprehensive Storybook Documentation

### 📋 Prompt for IDE:

```

Create comprehensive Storybook stories for TabsGroup showcasing all use cases and variants.

FILE: src/components/Tabs/TabsGroup/stories/TabsGroup.stories.tsx

REQUIREMENTS:

- Follow existing story patterns (Tab.stories.tsx, TabList.stories.tsx, TabPanel.stories.tsx)
- Use TypeScript with proper types
- Include argTypes for controls
- Add tags: ["autodocs"]
- Create multiple stories showing different scenarios

STORIES TO CREATE:

1. PillVariant (default, uncontrolled mode)
2. UnderlineVariant (uncontrolled mode)
3. WithTabPanels (show tab content switching)
4. ControlledMode (demonstrate external state control)
5. WithCustomClassName
6. WithChildrenPlaceholder (empty children slot for future Badge)

EXAMPLE STRUCTURE:

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import TabsGroup from "../TabsGroup";
import TabList from "../../TabList/TabList";
import Tab from "../../Tab/Tab";
import TabPanel from "../../TabPanel/TabPanel";

const meta: Meta<typeof TabsGroup> = {
  title: "Components/Tabs/TabsGroup",
  component: TabsGroup,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["pill", "underline"],
      description: "Visual variant for all tabs",
      table: {
        type: { summary: "'pill' | 'underline'" },
        defaultValue: { summary: "'pill'" },
      },
    },
    defaultValue: {
      control: "text",
      description: "Initially selected tab (uncontrolled mode)",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TabsGroup>;

export const PillVariant: Story = {
  args: {
    variant: "pill",
    defaultValue: "emails",
  },
  render: (args) => (
    <TabsGroup {...args}>
      <TabList>
        <Tab value="emails" labelText="Emails" />
        <Tab value="files" labelText="Files" />
        <Tab value="settings" labelText="Settings" />
      </TabList>
    </TabsGroup>
  ),
};

// Add more stories...
```

CONSTRAINTS:

- Each story should be self-contained and demonstrate one specific use case
- Use realistic example data (Emails, Files, Settings, Dashboard, etc.)
- Add descriptions in story parameters where helpful
- Show TabPanel integration in at least one story
- Prepare children slot in Tab for future Badge (empty for now)

```

**Expected Result:** Complete Storybook documentation with all variants and use cases.

---

## Summary of 8 Steps

```

✅ STEP 1: Setup folder structure
✅ STEP 2: TDD Red - TabsContext tests
✅ STEP 3: TDD Green - Implement TabsContext
✅ STEP 4: TDD Red - TabsGroup tests
✅ STEP 5: TDD Green - Implement TabsGroup
✅ STEP 6: Refactor Tab (consume Context)
✅ STEP 7: Refactor TabPanel (optional)
✅ STEP 8: Complete Storybook stories

```

---

## How to Use This Guide

1. **Copy the prompt for STEP 1** and paste it into your IDE assistant
2. **Review the result** and verify correctness
3. **Run tests** (should be RED in TDD Red phases)
4. **Move to next step** when current step is completed
5. **Repeat** until all 8 steps are done

---

## Important Notes

- **Strict TDD**: Never implement before writing tests (except setup)
- **Inline types**: All TypeScript types/interfaces defined in component files
- **Backward compatibility**: Refactoring must not break existing functionality
- **Code style**: Follow existing patterns in the codebase
- **Badge preparation**: Tab's children prop prepared but not implemented yet

---

## Validation Checklist

After completing all steps, verify:

- [ ] All tests passing (green)
- [ ] TabsGroup works in both controlled and uncontrolled modes
- [ ] Tab consumes Context correctly
- [ ] TabPanel optionally uses Context
- [ ] Storybook shows all variants and use cases
- [ ] No TypeScript errors
- [ ] Code follows existing patterns
- [ ] Ready for Badge implementation (children slot available)

---

**Ready to start? Begin with STEP 1!** 🚀
```
