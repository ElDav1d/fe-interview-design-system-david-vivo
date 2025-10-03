import type { Meta, StoryObj } from "@storybook/react";
import Tab from "../Tab";
import TabsGroup from "../../TabsGroup/TabsGroup";
import TabList from "../../TabList/TabList";

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
  decorators: [
    (Story, context) => (
      <TabsGroup variant="pill" defaultActiveTab={context.args.value || "tab1"}>
        <TabList>
          <Story />
        </TabList>
      </TabsGroup>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Tab>;

export const Pill: Story = {
  args: {
    value: "tab1",
    labelText: "Tab 1",
  },
  decorators: [
    (Story, context) => (
      <TabsGroup variant="pill" defaultActiveTab={context.args.value || "tab1"}>
        <TabList>
          <Story />
        </TabList>
      </TabsGroup>
    ),
  ],
};

export const Underline: Story = {
  args: {
    value: "tab1",
    labelText: "Tab 1",
  },
  decorators: [
    (Story, context) => (
      <TabsGroup
        variant="underline"
        defaultActiveTab={context.args.value || "tab1"}
      >
        <TabList>
          <Story />
        </TabList>
      </TabsGroup>
    ),
  ],
};

export const WithChildren: Story = {
  name: "With Custom Content",
  args: {
    value: "tab1",
    labelText: "Notifications",
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
  decorators: [
    (Story, context) => (
      <TabsGroup variant="pill" defaultActiveTab={context.args.value || "tab1"}>
        <TabList>
          <Story />
        </TabList>
      </TabsGroup>
    ),
  ],
};
