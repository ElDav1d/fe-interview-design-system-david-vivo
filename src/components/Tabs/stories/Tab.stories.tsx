import type { Meta, StoryObj } from "@storybook/react";
import Tab from "../Tab";

const meta: Meta<typeof Tab> = {
  title: "Components/Tabs/Tab",
  component: Tab,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  render: () => <Tab />,
};
