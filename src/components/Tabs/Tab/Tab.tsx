import { ButtonHTMLAttributes, ReactNode } from "react";
import { useTabs } from "../TabsGroup/TabsContext";
import "./Tab.scss";

/**
 * A single tab element used within a TabList.
 * Consumes TabsContext for selection state and variant styling.
 *
 * @component
 * @example
 * <TabsGroup defaultActiveTab="overview">
 *   <TabList>
 *     <Tab value="overview" labelText="Overview" />
 *   </TabList>
 * </TabsGroup>
 *
 * @param value - Unique identifier for the tab.
 * @param labelText - The visible label of the tab.
 * @param children - Optional content to render after the label (e.g., Badge).
 * @param rest - Additional button attributes
 */

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  labelText: string;
  children?: ReactNode;
  className?: string;
}

const Tab = ({
  value,
  labelText,
  children,
  className = "",
  onClick,
  ...rest
}: TabProps) => {
  const { variant, activeTab, setActiveTab } = useTabs();
  const isSelected = activeTab === value;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(value);
    onClick?.(event);
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
