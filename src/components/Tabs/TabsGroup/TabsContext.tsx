import { createContext, useContext, useState, useMemo, ReactNode } from "react";

export type TabVariant = "pill" | "underline";

/**
 * Context value for managing tab state
 */
export interface TabsContextValue {
  variant: TabVariant;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

/**
 * Props for the TabsProvider component
 */
export interface TabsProviderProps {
  variant: TabVariant;
  defaultActiveTab: string;
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
}

const TabsContext = createContext<TabsContextValue | null>(null);

/**
 * Hook to access the tabs context (throws error if not in TabsGroup)
 * Use this when context is required
 * @throws {Error} When used outside of TabsProvider
 * @returns {TabsContextValue} The current tabs context value
 */
export const useTabs = (): TabsContextValue => {
  const context = useContext(TabsContext);

  if (context === null) {
    throw new Error("useTabs must be used within a TabsGroup");
  }

  return context;
};

/**
 * Hook to optionally access the tabs context
 * Returns null if used outside TabsGroup - does not throw
 * Use this when context is optional (e.g., hybrid components)
 * @returns {TabsContextValue | null} The current tabs context value or null
 */
export const useTabsContext = (): TabsContextValue | null => {
  return useContext(TabsContext);
};

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
    }),
    [variant, activeTab, isControlled, onChange]
  );

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  );
};
