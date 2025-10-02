import type { Meta, StoryObj } from "@storybook/react";
import TabPanel from "../TabPanel";
import "./TabPanel.stories.scss";

const meta: Meta<typeof TabPanel> = {
  title: "Components/Tabs/TabPanel",
  component: TabPanel,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    id: {
      control: "text",
      description: "The unique identifier for the tab panel.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "''" },
      },
    },
    isSelected: {
      control: "boolean",
      description: "Whether the tab panel is selected and visible.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: "text",
      description: "The content of the tab panel.",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "null" },
      },
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof TabPanel>;

export const Default: Story = {
  args: {
    id: "tab-panel-1",
    isSelected: true,
    children: <section>This is the content of Tab Panel 1</section>,
  },
};

export const WithStyles: Story = {
  args: {
    id: "tab-panel-2",
    isSelected: true,
    className: "custom-tab-panel",
    children: <section>This is the content of Tab Panel 1</section>,
  },
};

WithStyles.parameters = {
  docs: {
    description: {
      story:
        "This tab panel has custom styles applied via the `className` prop.",
    },
  },
};
