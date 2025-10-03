import { ButtonHTMLAttributes } from "react";
import "./Tab.scss";

/**
 * A single tab element used within a TabList.
 * Handles selection state and accessibility attributes.
 *
 * @component
 * @example
 * <Tab labelText="Overview" isSelected />
 *
 * @param labelText - The visible label of the tab.
 * @param variant - Visual style of the tab ('pill' or 'underline').
 * @param isSelected - Whether the tab is currently selected.
 * @param rest - Additional button attributes
 */

export type TabVariant = "pill" | "underline";

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TabVariant;
  labelText: string;
  isSelected?: boolean;
  className?: string;
}

const Tab = ({
  variant = "pill",
  labelText,
  isSelected = false,
  className = "",
  ...rest
}: TabProps) => {
  return (
    <button
      className={`tab-${variant} ${className}`.trim()}
      role="tab"
      aria-selected={isSelected}
      {...rest}
    >
      {labelText}
    </button>
  );
};

export default Tab;
