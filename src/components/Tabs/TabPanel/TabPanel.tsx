import { HTMLAttributes } from "react";
import { useTabsContext } from "../TabsGroup/TabsContext";

/**
 * A container for the content associated with a selected tab.
 * Hidden when not active. Accessible via role="tabpanel".
 *
 * Supports two usage patterns:
 * 1. Standalone (Configuration): Use isSelected prop to control visibility
 * 2. Context-aware (Composition): Use within TabsGroup with value prop for automatic visibility
 *
 * @component
 * @example
 * // Standalone usage
 * <TabPanel id="panel-1" isSelected={activeTab === "tab1"}>
 *   Content
 * </TabPanel>
 *
 * @example
 * // Context-aware usage
 * <TabsGroup defaultActiveTab="tab1">
 *   <TabList>
 *     <Tab value="tab1" labelText="Tab 1" />
 *   </TabList>
 *   <TabPanel value="tab1">Content 1</TabPanel>
 * </TabsGroup>
 *
 * @param id - Unique identifier for the panel. Auto-generated from value if not provided.
 * @param value - Unique identifier that connects to Tab's value. Used with TabsGroup for automatic visibility.
 * @param isSelected - Whether the panel is currently visible. Used for standalone mode.
 * @param children - The content to display within the panel.
 * @param rest - Additional div attributes
 */

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  value?: string;
  isSelected?: boolean;
}

const TabPanel = ({
  id: providedId,
  value,
  isSelected = false,
  children,
  ...rest
}: TabPanelProps) => {
  const context = useTabsContext();

  // Determine visibility: context mode takes precedence over standalone mode
  const isVisible = value && context ? context.activeTab === value : isSelected;

  // Generate ID: use provided ID, or generate from value, or fall back to undefined
  const panelId = providedId || (value ? `panel-${value}` : undefined);

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={value ? `tab-${value}` : undefined}
      hidden={!isVisible}
      {...rest}
    >
      {children}
    </div>
  );
};

export default TabPanel;
