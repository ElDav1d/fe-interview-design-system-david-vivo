import type { Meta, StoryObj } from "@storybook/react";
import TabPanel from "../TabPanel";
import TabsGroup from "../../TabsGroup/TabsGroup";
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
      description:
        "The unique identifier for the tab panel. Auto-generated from value if not provided.",
      table: {
        type: { summary: "string" },
      },
    },
    value: {
      control: "text",
      description:
        "✅ REQUIRED in production. Connects TabPanel to Tab via TabsGroup context for automatic visibility.",
      table: {
        type: { summary: "string" },
      },
    },
    isSelected: {
      control: "boolean",
      description:
        "⚠️ Visibility control. Only used in standalone/testing mode. In production, TabsGroup context manages visibility automatically via value prop.",
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

export const Standalone: Story = {
  name: "Basic Panel",
  args: {
    id: "tab-panel-1",
    isSelected: true,
    children: (
      <section>
        This is TabPanel content with proper accessibility attributes.
      </section>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "A panel for displaying content.",
      },
    },
  },
};

export const WithStyles: Story = {
  name: "With Custom Styles",
  args: {
    id: "tab-panel-2",
    isSelected: true,
    className: "custom-tab-panel",
    children: (
      <section>This TabPanel has custom styles applied via className.</section>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Custom styles can be applied via className prop.",
      },
    },
  },
};

export const WithContext: Story = {
  name: "✅ With TabsGroup Context (REQUIRED)",
  render: () => (
    <TabsGroup defaultActiveTab="overview" variant="pill">
      <TabPanel value="overview">
        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <h3>Overview Content</h3>
          <p>
            This panel is automatically visible because "overview" is the active
            tab in the TabsGroup's context.
          </p>
        </div>
      </TabPanel>
      <TabPanel value="details">
        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <h3>Details Content</h3>
          <p>
            This panel is hidden because "details" is not the active tab in the
            TabsGroup's context.
          </p>
        </div>
      </TabPanel>
      <TabPanel value="settings">
        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <h3>Settings Content</h3>
          <p>
            This panel is hidden because "settings" is not the active tab in the
            TabsGroup's context.
          </p>
        </div>
      </TabPanel>
    </TabsGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "✅ This is the REQUIRED way to use TabPanel in production. TabPanel with value prop automatically reads activeTab from TabsGroup context and shows/hides itself. No manual isSelected management needed - the context handles it!",
      },
    },
  },
};
