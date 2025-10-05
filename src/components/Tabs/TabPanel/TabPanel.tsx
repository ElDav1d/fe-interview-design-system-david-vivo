import { HTMLAttributes } from "react";
import { useTabsContext } from "../TabsGroup/context";

/**
 * A tab panel that displays content associated with a tab.
 *
 * **⚠️ IMPORTANT:** This component REQUIRES TabsGroup context for automatic visibility in production.
 * Standalone mode (without context) is ONLY supported for testing purposes.
 *
 * @component
 * @example
 * // ✅ REQUIRED
 * <TabsGroup defaultActiveTab="overview">
 *   <TabList>
 *     <Tab value="overview" labelText="Overview" />
 *   </TabList>
 *   <TabPanel value="overview">
 *     <p>Content automatically shows when tab is active</p>
 *   </TabPanel>
 * </TabsGroup>
 *
 * @example
 * // ⚠️ TESTING ONLY
 * <TabPanel id="panel-1" isSelected={true}>
 *   Content (manual control)
 * </TabPanel>
 *
 * @param id - Unique identifier for the panel. Auto-generated from value if not provided.
 * @param value  Connects TabPanel to Tab via TabsGroup context.
 * @param isSelected visibility managed by TabsGroup context in production.
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

  // Extract groupId from context for unique ID generation
  const groupId = context?.groupId;

  // Helper to determine if panel should be visible
  const getIsVisible = (
    isUsingContext: boolean,
    contextActiveTab?: string,
    value?: string,
    isSelected?: boolean
  ) => {
    if (isUsingContext && contextActiveTab) {
      return contextActiveTab === value;
    }
    return isSelected ?? false;
  };

  // Determine visibility: context mode takes precedence over standalone mode
  const isUsingContext = value && context;

  const isVisible = getIsVisible(
    Boolean(isUsingContext),
    context?.activeTab,
    value,
    isSelected
  );

  // Generate ID: use provided ID, or generate from value and groupId, or fall back to undefined
  const getPanelId = (
    providedId?: string,
    value?: string,
    groupId?: string
  ) => {
    if (providedId) {
      return providedId;
    }
    if (value && groupId) {
      return `${groupId}-panel-${value}`;
    }
    if (value) {
      return `panel-${value}`;
    }
    return undefined;
  };

  const getAriaLabelledBy = (value?: string, groupId?: string) => {
    if (value && groupId) {
      return `${groupId}-tab-${value}`;
    }
    if (value) {
      return `tab-${value}`;
    }
    return undefined;
  };

  // Helper to determine tabIndex for keyboard accessibility
  // Visible panels should be focusable (tabIndex=0) for screen readers
  // Hidden panels should not be focusable (tabIndex=-1)
  const getTabIndex = (isVisible: boolean) => {
    if (isVisible) {
      return 0; // Focusable via keyboard
    }
    return -1; // Not focusable via keyboard
  };

  return (
    <div
      role="tabpanel"
      id={getPanelId(providedId, value, groupId)}
      aria-labelledby={getAriaLabelledBy(value, groupId)}
      tabIndex={getTabIndex(isVisible)}
      hidden={!isVisible}
      {...rest}
    >
      {children}
    </div>
  );
};

export default TabPanel;
