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
  name: "Standalone with Pill Tabs",
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
          "TabList is a semantic container for Tab components. Works standalone by providing variant and isSelected props to each Tab.",
      },
    },
  },
};

export const WithUnderlineTabs: Story = {
  name: "Standalone with Underline Tabs",
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
          "TabList works with any Tab variant. Here showing underline style tabs in standalone mode.",
      },
    },
  },
};

export const WithCustomStyles: Story = {
  name: "Standalone with Custom Styles",
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
          "Apply custom styles via className prop. TabList provides semantic HTML structure with role='tablist'.",
      },
    },
  },
};
