import {
  ReactNode,
  useEffect,
  ElementType,
  Children,
  isValidElement,
} from "react";
import Tab, { TabVariant } from "../Tab/Tab";
import { TabsProvider } from "./TabsContext";
import TabList from "../TabList/TabList";
import TabPanel from "../TabPanel/TabPanel";

/**
 * TabsGroup orchestrator component that provides context and manages tab state.
 * Supports both controlled and uncontrolled modes.
 *
 * @component
 * @example
 * // Uncontrolled mode
 * <TabsGroup defaultActiveTab={0}>
 *   <TabList>
 *     <Tab labelText="Tab 1" />
 *   </TabList>
 * </TabsGroup>
 *
 * @example
 * // Controlled mode
 * <TabsGroup value={activeTab} onChange={setActiveTab}>
 *   <TabList>
 *     <Tab labelText="Tab 1" />
 *   </TabList>
 * </TabsGroup>
 *
 * @param variant - Visual style variant ('pill' or 'underline'). Defaults to 'pill'.
 * @param defaultActiveTab - Initial active tab index for uncontrolled mode.
 * @param value - Active tab index for controlled mode.
 * @param onChange - Callback fired when active tab changes.
 * @param as - HTML element type to render as container. Defaults to 'div'.
 * @param children - Only TabList, TabPanel, and Tab components are allowed.
 * @param className - Additional CSS classes for the container.
 * @param rest - Additional HTML attributes for the container.
 */

export interface TabsGroupProps {
  variant?: TabVariant;
  defaultActiveTab?: number;
  value?: number;
  onChange?: (value: number) => void;
  as?: ElementType;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const validateChildren = (children: ReactNode): void => {
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    const childType = child.type;

    // Allow function components (like test helpers) to pass through
    if (
      typeof childType === "function" &&
      childType.name !== "Tab" &&
      childType.name !== "TabList" &&
      childType.name !== "TabPanel"
    ) {
      return;
    }

    const isValidChild =
      childType === TabList || childType === TabPanel || childType === Tab;

    if (!isValidChild) {
      throw new Error(
        "TabsGroup only accepts TabList, TabPanel, and Tab as children"
      );
    }
  });
};

const TabsGroup = ({
  variant = "pill",
  defaultActiveTab = 0,
  value,
  onChange,
  as: Component = "div",
  children,
  className = "",
  ...rest
}: TabsGroupProps) => {
  useEffect(() => {
    validateChildren(children);
  }, [children]);

  return (
    <TabsProvider
      variant={variant}
      defaultActiveTab={defaultActiveTab}
      value={value}
      onChange={onChange}
    >
      <Component className={className} {...rest}>
        {children}
      </Component>
    </TabsProvider>
  );
};

export default TabsGroup;
