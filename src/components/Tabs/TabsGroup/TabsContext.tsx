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
  children,
}: TabsProviderProps) => {
  const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);

  const value = useMemo<TabsContextValue>(
    () => ({
      variant,
      activeTab,
      setActiveTab,
    }),
    [variant, activeTab]
  );

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};
