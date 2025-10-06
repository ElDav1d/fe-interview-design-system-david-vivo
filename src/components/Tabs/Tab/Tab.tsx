import { ButtonHTMLAttributes, ReactNode } from "react";
import { useTabsContext, TabVariant } from "../TabsGroup/context";
import "./Tab.scss";

/**
 * A single tab element within a tabs interface.
 *
 * **⚠️ IMPORTANT:** This component REQUIRES TabsGroup context for full functionality in production.
 * Standalone mode (without context) is ONLY supported for testing purposes.
 *
 * @component
 * @example
 * // ✅ REQUIRED
 * <TabsGroup defaultActiveTab="overview">
 *   <TabList>
 *     <Tab value="overview" labelText="Overview" />
 *     <Tab value="details" labelText="Details" />
 *   </TabList>
 * </TabsGroup>
 *
 * @example
 * // ⚠️ TESTING ONLY
 * <Tab
 *   value="overview"
 *   labelText="Overview"
 *   variant="pill"
 *   isSelected={true}
 *   onTabSelect={(value) => console.log(value)}
 * />
 *
 * @param value - Unique identifier for the tab.
 * @param labelText - The visible label of the tab.
 * @param variant - Visual style ('pill' or 'underline').
 * @param isSelected - Selection state.
 * @param onTabSelect - Optional callback when tab is clicked. Can be used for analytics/tracking.
 * @param children - Optional content to render after the label. Use for badges, icons, or any inline content.
 * @param rest - Additional button attributes
 */

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  labelText: string;
  variant?: TabVariant;
  isSelected?: boolean;
  onTabSelect?: (value: string) => void;
  children?: ReactNode;
  className?: string;
}

const Tab = ({
  value,
  labelText,
  variant: propVariant = "pill",
  isSelected: propIsSelected = false,
  onTabSelect,
  children,
  className = "",
  onClick,
  ...rest
}: TabProps) => {
  const context = useTabsContext();

  // Use context values if available, otherwise fall back to props
  const variant = context?.variant ?? propVariant;
  const isSelected = context ? context.activeTab === value : propIsSelected;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Update context if available
    if (context) {
      context.setActiveTab(value);
    }

    // Call prop callback if provided
    if (onTabSelect) {
      onTabSelect(value);
    }

    // Call original onClick if provided
    if (onClick) {
      onClick(event);
    }
  };

  // Helper to determine if tab should be keyboard-focusable
  const getTabIndex = (isSelected: boolean) => {
    if (isSelected) {
      return 0; // Focusable via keyboard
    }
    return -1; // Not focusable via keyboard
  };

  // Generate unique IDs using groupId from context
  const getTabId = (value: string, groupId?: string) => {
    if (groupId) {
      return `${groupId}-tab-${value}`;
    }
    return `tab-${value}`;
  };

  const getAriaControls = (value: string, groupId?: string) => {
    if (groupId) {
      return `${groupId}-panel-${value}`;
    }
    return `panel-${value}`;
  };

  return (
    <button
      className={`tab-${variant} ${className}`.trim()}
      role="tab"
      aria-selected={isSelected}
      aria-controls={getAriaControls(value, context?.groupId)}
      id={getTabId(value, context?.groupId)}
      tabIndex={getTabIndex(isSelected)}
      onClick={handleClick}
      {...rest}
    >
      <span>{labelText}</span>
      {children}
    </button>
  );
};

export default Tab;
