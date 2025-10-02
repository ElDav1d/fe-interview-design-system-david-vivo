import { HTMLAttributes } from "react";
import "./TabList.scss";

/**
 * A wrapper that groups multiple Tab components.
 * Provides role="tablist"
 *
 * @component
 * @example
 * <TabList orientation="vertical">...</TabList>
 *
 * @param rest - Additional div attributes.
 * @param children - The Tab components to be rendered within the list.
 */

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {}

const TabList = ({ className = "", children, ...rest }: TabListProps) => {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={`tablist ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
};

export default TabList;
