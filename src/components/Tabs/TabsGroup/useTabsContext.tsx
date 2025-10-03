import { useContext, createContext } from "react";
import type { TabsContextValue } from "./TabsContext";

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
