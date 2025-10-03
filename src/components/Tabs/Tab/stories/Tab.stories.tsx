import type { Meta, StoryObj } from "@storybook/react";
import Tab from "../Tab";
import TabsGroup from "../../TabsGroup/TabsGroup";

const meta: Meta<typeof Tab> = {
  title: "Components/Tabs/Tab",
  component: Tab,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: {
      control: "text",
      description: "Unique identifier for the tab.",
      table: {
        type: { summary: "string" },
      },
    },
    labelText: {
      control: "text",
      description: "The text label of the tab.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "''" },
      },
    },
    variant: {
      control: "select",
      options: ["pill", "underline"],
      description: "Visual style variant. Used in standalone mode.",
      table: {
        type: { summary: "'pill' | 'underline'" },
        defaultValue: { summary: "'pill'" },
      },
    },
    isSelected: {
      control: "boolean",
      description: "Whether the tab is selected. Used in standalone mode.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: false,
      description:
        "Optional content to render after the label. Supports any React node - style as needed.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Tab>;

export const Pill: Story = {
  name: "Pill Tab",
  args: {
    value: "tab1",
    labelText: "Tab 1",
    variant: "pill",
    isSelected: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "A pill-style tab button. The proper usage is with TabsGroup context for composition-based API, though standalone mode is allowed for flexibility.",
      },
    },
  },
};

export const Underline: Story = {
  name: "Underline Tab",
  args: {
    value: "tab1",
    labelText: "Tab 1",
    variant: "underline",
    isSelected: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "An underline-style tab button. The proper usage is with TabsGroup context for composition-based API, though standalone mode is allowed for flexibility.",
      },
    },
  },
};

export const WithChildren: Story = {
  name: "With Children (e.g. Badge)",
  args: {
    value: "tab1",
    labelText: "Notifications",
    variant: "pill",
    isSelected: false,
    children: (
      <span
        style={{
          backgroundColor: "#dc2626",
          color: "white",
          borderRadius: "10px",
          padding: "2px 6px",
          fontSize: "12px",
          fontWeight: "bold",
          marginLeft: "6px",
        }}
      >
        3
      </span>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The children prop allows adding custom content like badges, icons, or other React nodes after the label. Works with both context and standalone modes.",
      },
    },
  },
};

export const WithContext: Story = {
  name: "With TabsGroup Context (Recommended)",
  render: () => (
    <TabsGroup variant="pill" defaultActiveTab="tab2">
      <Tab value="tab1" labelText="Tab 1" />
    </TabsGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The proper way to use Tab: within TabsGroup context for composition-based API. The context automatically provides variant, isSelected, and onTabSelect - no need to pass these props manually.",
      },
    },
  },
};
