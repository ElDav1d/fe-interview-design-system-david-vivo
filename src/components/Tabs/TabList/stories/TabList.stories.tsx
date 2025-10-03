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
  argTypes: {
    children: {
      control: false,
      description: "Tab components to render inside the TabList.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof TabList>;

export const Default: Story = {
  name: "With Pill Tabs",
  render: (args) => (
    <TabList {...args}>
      <Tab value="tab1" labelText="Tab 1" variant="pill" isSelected={true} />
      <Tab value="tab2" labelText="Tab 2" variant="pill" />
      <Tab value="tab3" labelText="Tab 3" variant="pill" />
    </TabList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "TabList is a semantic container for Tab components, providing proper accessibility structure (role='tablist'). The proper usage is with TabsGroup context, though standalone mode is allowed for flexibility.",
      },
    },
  },
};

export const WithUnderlineTabs: Story = {
  name: "With Underline Tabs",
  render: (args) => (
    <TabList {...args}>
      <Tab
        value="tab1"
        labelText="Tab 1"
        variant="underline"
        isSelected={true}
      />
      <Tab value="tab2" labelText="Tab 2" variant="underline" />
      <Tab value="tab3" labelText="Tab 3" variant="underline" />
    </TabList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "TabList works with any Tab variant. Here showing underline style tabs.",
      },
    },
  },
};

export const WithCustomStyles: Story = {
  name: "With Custom Styles",
  args: {
    className: "custom-tablist",
  },
  render: (args) => (
    <TabList {...args}>
      <Tab value="tab1" labelText="Tab 1" variant="pill" isSelected={true} />
      <Tab value="tab2" labelText="Tab 2" variant="pill" />
      <Tab value="tab3" labelText="Tab 3" variant="pill" />
    </TabList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Custom styles can be applied via className prop. TabList provides semantic HTML structure with proper accessibility attributes.",
      },
    },
  },
};
