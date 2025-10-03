import {
  HTMLAttributes,
  Children,
  isValidElement,
  ReactNode,
  useEffect,
} from "react";
import Tab from "../Tab/Tab";
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
 * @param children - Only Tab components or text nodes are allowed.
 */

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {}

const validateChildren = (children: ReactNode): void => {
  Children.forEach(children, (child) => {
    // Allow text nodes, numbers, null, undefined, booleans
    if (!isValidElement(child)) {
      return;
    }

    // Check if it's a Tab component
    if (child.type !== Tab) {
      const childName =
        typeof child.type === "function"
          ? child.type.name || "Unknown"
          : child.type;

      throw new Error(
        `TabList only accepts Tab components or text nodes as children. Received: ${childName}`
      );
    }
  });
};

const TabList = ({ className = "", children, ...rest }: TabListProps) => {
  useEffect(() => {
    validateChildren(children);
  }, [children]);

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
