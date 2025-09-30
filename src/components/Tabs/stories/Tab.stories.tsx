import type { Meta, StoryObj } from "@storybook/react";
import Tab from "../Tab";

const meta: Meta<typeof Tab> = {
  title: "Components/Tabs/Tab",
  component: Tab,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    labelText: {
      control: "text",
      description: "The text label of the tab.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "''" },
      },
    },
    isSelected: {
      control: "boolean",
      description: "Whether the tab is selected.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" }, // <-- use string
      },
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  args: {
    labelText: "Tab 1",
    isSelected: false,
  },
};
