import type { Meta, StoryObj } from "@storybook/react";
import Tab from "../Tab";
import TabsGroup from "../../TabsGroup/TabsGroup";
import Badge from "../../../Badge/Badge";
import "./Tab.stories.scss";

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
      description: "Visual style variant.",
      table: {
        type: { summary: "'pill' | 'underline'" },
        defaultValue: { summary: "'pill'" },
      },
    },
    isSelected: {
      control: "boolean",
      description: "Selection state.",
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
    onTabSelect: {
      description:
        "Optional callback when tab is clicked. Can be used in standalone/testing mode or for custom logic, analytics, navigation in production.",
      table: {
        type: { summary: "(value: string) => void" },
        defaultValue: { summary: "undefined" },
      },
      action: "tabSelect",
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
          "A tab in pill style. This is the default style. It can be implicitly selected when used within a TabsGroup context, or manually controlled via the isSelected prop in standalone/testing mode.",
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
        story: "A tab in underline style. Behaves the same as pill variant.",
      },
    },
  },
};

export const WithChildren: Story = {
  name: "With Children (Badge)",
  args: {
    value: "tab1",
    labelText: "Notifications",
    variant: "pill",
    isSelected: false,
    children: <Badge variant="negative">3</Badge>,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The children prop allows adding Badge components after the label. Badge is the primary use case for Tab children.",
      },
    },
  },
};

export const WithBadge: Story = {
  name: "With Badge Variants",
  render: () => (
    <div className="tab-stories-badge-list">
      <div className="tab-stories-badge-row">
        <Tab value="tab1" labelText="Pill" variant="pill" isSelected={true}>
          <Badge variant="neutral">Neutral</Badge>
        </Tab>
        <Tab value="tab2" labelText="Pill" variant="pill">
          <Badge variant="positive">Positive</Badge>
        </Tab>
        <Tab value="tab3" labelText="Pill" variant="pill">
          <Badge variant="negative">Negative</Badge>
        </Tab>
      </div>
      <div className="tab-stories-badge-row">
        <Tab
          value="tab4"
          labelText="Underline"
          variant="underline"
          isSelected={true}
        >
          <Badge variant="neutral">Neutral</Badge>
        </Tab>
        <Tab
          value="tab5"
          labelText="Underline"
          variant="underline"
          isSelected={true}
        >
          <Badge variant="positive">Positive</Badge>
        </Tab>
        <Tab
          value="tab6"
          labelText="Underline"
          variant="underline"
          isSelected={true}
        >
          <Badge variant="negative">Negative</Badge>
        </Tab>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tab components with Badge showing all three variants (neutral, positive, negative). Badge is rendered as children of Tab.",
      },
    },
  },
};

export const WithCallback: Story = {
  name: "With onTabSelect callback",
  args: {
    value: "tab1",
    labelText: "Tab 1",
    variant: "pill",
    isSelected: false,
    onTabSelect: (value: string) => {
      alert(`Tab selected: ${value}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates manual usage of the onTabSelect callback. You can provide any function to handle tab selection events, such as analytics, navigation, or custom logic. This works in standalone mode and can be configured via the Storybook UI.",
      },
    },
  },
};

export const WithContext: Story = {
  name: "✅ With TabsGroup Context (REQUIRED)",
  render: () => (
    <TabsGroup variant="pill" defaultActiveTab="tab2">
      <Tab value="tab1" labelText="Tab 1" />
      <Tab value="tab2" labelText="Tab 2" />
      <Tab value="tab3" labelText="Tab 3" />
    </TabsGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "✅ This is the REQUIRED way to use Tab in production. TabsGroup provides context for variant, selection state, and click handling. All tabs coordinate automatically.",
      },
    },
  },
};
