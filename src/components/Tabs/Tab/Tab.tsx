import { ButtonHTMLAttributes, ReactNode } from "react";
import { useTabsContext, TabVariant } from "../TabsGroup/TabsContext";
import "./Tab.scss";

/**
 * A single tab element that works standalone or within TabsGroup context.
 *
 * Supports two usage patterns:
 * 1. Standalone (Configuration): Pass variant, isSelected, and onTabSelect as props
 * 2. Context-aware (Composition): Use within TabsGroup, state managed automatically
 *
 * @component
 * @example
 * // Standalone usage
 * <Tab
 *   value="overview"
 *   labelText="Overview"
 *   variant="pill"
 *   isSelected={true}
 *   onTabSelect={(value) => console.log(value)}
 * />
 *
 * @example
 * // Context-aware usage
 * <TabsGroup defaultActiveTab="overview">
 *   <TabList>
 *     <Tab value="overview" labelText="Overview" />
 *   </TabList>
 * </TabsGroup>
 *
 * @param value - Unique identifier for the tab.
 * @param labelText - The visible label of the tab.
 * @param variant - Visual style ('pill' or 'underline'). Defaults to 'pill'. Overridden by context if present.
 * @param isSelected - Selection state. Managed by context if present, otherwise use this prop.
 * @param onTabSelect - Callback when tab is clicked. Receives tab value. Works with or without context.
 * @param children - Optional content to render after the label (e.g., Badge).
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

  return (
    <button
      className={`tab-${variant} ${className}`.trim()}
      role="tab"
      aria-selected={isSelected}
      aria-controls={`panel-${value}`}
      id={`tab-${value}`}
      tabIndex={isSelected ? 0 : -1}
      onClick={handleClick}
      {...rest}
    >
      {labelText}
      {children && <span className="tab-extras">{children}</span>}
    </button>
  );
};

export default Tab;
