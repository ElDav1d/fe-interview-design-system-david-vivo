import { ReactNode, Children, isValidElement, KeyboardEvent } from "react";
import Tab from "../Tab/Tab";

/**
 * Validates that TabList children are only Tab components or text nodes.
 * Throws an error if an invalid child is found.
 *
 * @param children - React children to validate
 * @throws {Error} If a child is not a Tab component or text node
 */
export const validateChildren = (children: ReactNode): void => {
  Children.forEach(children, (child) => {
    // Allow text nodes, numbers, null, undefined, booleans
    if (!isValidElement(child)) {
      return;
    }

    // Check if it's a Tab component
    if (child.type !== Tab) {
      const childName = getChildName(child.type);

      throw new Error(
        `TabList only accepts Tab components or text nodes as children. Received: ${childName}`
      );
    }
  });
};

/**
 * Gets the component name from a function type.
 *
 * @param childType - The function component type
 * @returns The function's name or "Unknown" if not available
 */
const getComponentName = (childType: Function): string => {
  if (childType.name) {
    return childType.name;
  }
  return "Unknown";
};

/**
 * Gets the name of a component type for error messages.
 *
 * @param childType - The component type to get the name from
 * @returns The component name or "Unknown"
 */
const getChildName = (childType: unknown): string => {
  if (typeof childType === "function") {
    return getComponentName(childType);
  }
  return String(childType);
};

/**
 * Wraps the index to the first tab if it exceeds the tab count.
 *
 * @param nextIndex - The calculated next index
 * @param tabCount - Total number of tabs
 * @returns The wrapped index or the next index if no wrap needed
 */
const wrapToFirstTab = (nextIndex: number, tabCount: number): number => {
  if (nextIndex >= tabCount) {
    return 0;
  }
  return nextIndex;
};

/**
 * Wraps the index to the last tab if it goes below zero.
 *
 * @param nextIndex - The calculated next index
 * @param tabCount - Total number of tabs
 * @returns The wrapped index or the next index if no wrap needed
 */
const wrapToLastTab = (nextIndex: number, tabCount: number): number => {
  if (nextIndex < 0) {
    return tabCount - 1;
  }
  return nextIndex;
};

/**
 * Calculates the next tab index based on the keyboard key pressed.
 * Handles cyclic navigation (wraps around).
 *
 * @param key - The keyboard key pressed
 * @param currentIndex - Current focused tab index
 * @param tabCount - Total number of tabs
 * @returns The index of the tab to focus next
 */
export const getNextTabIndex = (
  key: string,
  currentIndex: number,
  tabCount: number
): number => {
  if (key === "Home") {
    return 0;
  }

  if (key === "End") {
    return tabCount - 1;
  }

  if (key === "ArrowRight") {
    const nextIndex = currentIndex + 1;
    return wrapToFirstTab(nextIndex, tabCount);
  }

  if (key === "ArrowLeft") {
    const nextIndex = currentIndex - 1;
    return wrapToLastTab(nextIndex, tabCount);
  }

  return currentIndex;
};

/**
 * Updates tabIndex attributes using roving tabindex pattern.
 * Only the focused tab has tabIndex=0, others have tabIndex=-1.
 *
 * @param tabs - Array of tab elements
 * @param focusIndex - Index of the tab to receive focus
 */
export const updateTabIndexAndFocus = (
  tabs: HTMLButtonElement[],
  focusIndex: number
): void => {
  tabs.forEach((tab, index) => {
    if (index === focusIndex) {
      tab.setAttribute("tabIndex", "0");
      tab.focus();
    } else {
      tab.setAttribute("tabIndex", "-1");
    }
  });
};

/**
 * Handles keyboard navigation between tabs.
 * Manages focus movement without changing selection.
 *
 * Supported keys:
 * - ArrowRight: Move focus to next tab (wraps to first)
 * - ArrowLeft: Move focus to previous tab (wraps to last)
 * - Home: Move focus to first tab
 * - End: Move focus to last tab
 *
 * @param event - Keyboard event from the tablist
 * @param tablistRef - Reference to the tablist container
 */
export const handleKeyboardNavigation = (
  event: KeyboardEvent<HTMLDivElement>,
  tablistRef: React.RefObject<HTMLDivElement | null>
): void => {
  const { key } = event;
  const supportedKeys = ["ArrowRight", "ArrowLeft", "Home", "End"];

  if (!supportedKeys.includes(key)) {
    return;
  }

  event.preventDefault();

  const tablist = tablistRef.current;
  if (!tablist) {
    return;
  }

  const tabs = Array.from(
    tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')
  );

  if (tabs.length === 0) {
    return;
  }

  const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
  const nextIndex = getNextTabIndex(key, currentIndex, tabs.length);

  updateTabIndexAndFocus(tabs, nextIndex);
};
