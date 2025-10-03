import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { TabVariant } from "../Tab/Tab";

/**
 * Context value for managing tab state
 */
export interface TabsContextValue {
  variant: TabVariant;
  activeTab: number;
  setActiveTab: (value: number) => void;
}

/**
 * Props for the TabsProvider component
 */
export interface TabsProviderProps {
  variant: TabVariant;
  defaultActiveTab: number;
  value?: number;
  onChange?: (value: number) => void;
  children: ReactNode;
}

const TabsContext = createContext<TabsContextValue | null>(null);

/**
 * Hook to access the tabs context
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
    useState<number>(defaultActiveTab);

  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalActiveTab;

  const handleSetActiveTab = (newValue: number) => {
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
