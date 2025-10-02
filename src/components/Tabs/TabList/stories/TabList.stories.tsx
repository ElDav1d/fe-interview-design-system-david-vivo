import type { Meta, StoryObj } from "@storybook/react";
import TabList from "../TabList";
import Tab from "../../Tab/Tab";
import "./TabList.stories.scss";

const meta: Meta<typeof TabList> = {
  title: "Components/Tabs/TabList",
  component: TabList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof TabList>;

export const Default: Story = {
  render: (args) => (
    <TabList {...args}>
      <Tab labelText="Tab 1" isSelected={true} />
      <Tab labelText="Tab 2" />
      <Tab labelText="Tab 3" />
    </TabList>
  ),
};

export const WithUnderlineTabs: Story = {
  render: (args) => (
    <TabList {...args}>
      <Tab labelText="Tab 1" isSelected={true} variant="underline" />
      <Tab labelText="Tab 2" variant="underline" />
      <Tab labelText="Tab 3" variant="underline" />
    </TabList>
  ),
};

export const WithCustomStyles: Story = {
  args: {
    className: "custom-tablist",
  },
  render: (args) => (
    <TabList {...args}>
      <Tab labelText="Tab 1" isSelected={true} />
      <Tab labelText="Tab 2" />
      <Tab labelText="Tab 3" />
    </TabList>
  ),
};
