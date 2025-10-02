import { HTMLAttributes } from "react";

/**
 * A container for the content associated with a selected tab.
 * Hidden when not active. Accessible via role="tabpanel".
 *
 * @component
 * @example
 * <TabPanel id="panel-1" isSelected aria-labelledby="tab-1">Content</TabPanel>
 *
 * @param id - Unique identifier for the panel.
 * @param isSelected - Whether the panel is currently visible.
 * @param children - The content to display within the panel.
 * @param rest - Additional div attributes-
 */

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  isSelected?: boolean;
}

const TabPanel = ({
  id,
  isSelected = false,
  children,
  ...rest
}: TabPanelProps) => {
  return (
    <div role="tabpanel" id={id} hidden={!isSelected} {...rest}>
      {children}
    </div>
  );
};

export default TabPanel;
