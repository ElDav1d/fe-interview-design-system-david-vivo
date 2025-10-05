import { HTMLAttributes, useEffect, useRef, KeyboardEvent } from "react";
import { validateChildren, handleKeyboardNavigation } from "./utils";
import "./TabList.scss";

/**
 * A container for Tab components that manages keyboard navigation.
 *
 * **⚠️ IMPORTANT:**  TabList does NOT require TabsGroup context - it works independently.
 * However, it should be used within TabsGroup for complete tabs functionality.
 *
 * @component
 * @example
 * // ✅ Typical usage within TabsGroup
 * <TabsGroup defaultActiveTab="tab1">
 *   <TabList>
 *     <Tab value="tab1" labelText="Tab 1" />
 *     <Tab value="tab2" labelText="Tab 2" />
 *   </TabList>
 * </TabsGroup>
 *
 * @example
 * // ✅ Also works standalone (keyboard navigation only)
 * <TabList>
 *   <Tab value="tab1" labelText="Tab 1" variant="pill" />
 * </TabList>
 *
 * @param rest - Additional div attributes.
 * @param children - Only Tab components or text nodes are allowed.
 */

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {}

const TabList = ({ className = "", children, ...rest }: TabListProps) => {
  const tablistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    validateChildren(children);
  }, [children]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    handleKeyboardNavigation(event, tablistRef);
  };

  return (
    <div
      ref={tablistRef}
      role="tablist"
      aria-orientation="horizontal"
      className={`tablist ${className}`.trim()}
      onKeyDown={onKeyDown}
      tabIndex={-1}
      {...rest}
    >
      {children}
    </div>
  );
};

export default TabList;
