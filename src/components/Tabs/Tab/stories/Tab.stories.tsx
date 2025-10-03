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
  name: "Standalone Pill Tab",
  args: {
    value: "tab1",
    labelText: "Tab 1",
    variant: "pill",
    isSelected: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tab can be used standalone by providing variant and isSelected props. No context required.",
      },
    },
  },
};

export const Underline: Story = {
  name: "Standalone Underline Tab",
  args: {
    value: "tab1",
    labelText: "Tab 1",
    variant: "underline",
    isSelected: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The underline variant provides a different visual style. Works standalone with props.",
      },
    },
  },
};

export const WithChildren: Story = {
  name: "Standalone with children",
  args: {
    value: "tab1",
    labelText: "Notifications",
    variant: "pill",
    isSelected: true,
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
          "Children prop allows adding custom content like badges, icons, or other React nodes after the label.",
      },
    },
  },
};

export const WithContext: Story = {
  name: "With TabsGroup Context",
  render: () => (
    <TabsGroup variant="pill" defaultActiveTab="tab2">
      <Tab value="tab1" labelText="Tab 1" />
    </TabsGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When used with TabsGroup context, Tab automatically receives variant, isSelected, and onTabSelect. No need to pass these props manually.",
      },
    },
  },
};
