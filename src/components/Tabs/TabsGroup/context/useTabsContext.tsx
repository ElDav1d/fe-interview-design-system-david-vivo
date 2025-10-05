import { useContext, createContext } from "react";

export type TabVariant = "pill" | "underline";

/**
 * Context value for managing tab state
 */
export interface TabsContextValue {
  variant: TabVariant;
  activeTab: string;
  setActiveTab: (value: string) => void;
  groupId?: string;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

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
