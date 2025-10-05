import { useState, useMemo, ReactNode } from "react";
import { TabsContext, TabVariant, TabsContextValue } from "./useTabsContext";

/**
 * Props for the TabsProvider component
 */
export interface TabsProviderProps {
  variant: TabVariant;
  defaultActiveTab: string;
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  groupId?: string;
}

// Re-export hooks for convenience
export { useTabs, useTabsContext } from "./useTabsContext";
// Re-export types for convenience
export type { TabsContextValue, TabVariant } from "./useTabsContext";

/**
 * Provider component for tabs context
 * Manages the active tab state and variant
 * Supports both controlled and uncontrolled modes
 *
 * @component
 * @example
 * <TabsProvider variant="pill" defaultActiveTab={0}>
 *   <TabList>...</TabList>
 * </TabsProvider>
 */
export const TabsProvider = ({
  variant,
  defaultActiveTab,
  value,
  onChange,
  children,
  groupId,
}: TabsProviderProps) => {
  const [internalActiveTab, setInternalActiveTab] =
    useState<string>(defaultActiveTab);

  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalActiveTab;

  const handleSetActiveTab = (newValue: string) => {
    if (!isControlled) {
      setInternalActiveTab(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      variant,
      activeTab,
      setActiveTab: handleSetActiveTab,
      groupId,
    }),
    [variant, activeTab, isControlled, onChange, groupId]
  );

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  );
};
