import type { Meta, StoryObj } from "@storybook/react";
import TabPanel from "../TabPanel";
import TabsGroup from "../../TabsGroup/TabsGroup";
import TabList from "../../TabList/TabList";
import Tab from "../../Tab/Tab";
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
        "Connects to Tab's value for automatic visibility in TabsGroup. Use with context-aware mode.",
      table: {
        type: { summary: "string" },
      },
    },
    isSelected: {
      control: "boolean",
      description:
        "Whether the tab panel is selected and visible. Use for standalone mode.",
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
  name: "Standalone (with isSelected prop)",
  args: {
    id: "tab-panel-1",
    isSelected: true,
    children: (
      <section>
        This is standalone TabPanel content controlled by isSelected prop.
      </section>
    ),
  },
};

export const WithStyles: Story = {
  name: "Standalone with Custom Styles",
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
        story:
          "This tab panel has custom styles applied via the `className` prop.",
      },
    },
  },
};

export const ContextAware: Story = {
  name: "Context-Aware (with TabsGroup)",
  render: () => (
    <TabsGroup defaultActiveTab="overview" variant="pill">
      <TabList>
        <Tab value="overview" labelText="Overview" />
        <Tab value="details" labelText="Details" />
        <Tab value="settings" labelText="Settings" />
      </TabList>
      <div
        style={{
          marginTop: "16px",
          padding: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <TabPanel value="overview">
          <h3>Overview Content</h3>
          <p>
            This panel is automatically visible because "overview" is the active
            tab.
          </p>
        </TabPanel>
        <TabPanel value="details">
          <h3>Details Content</h3>
          <p>Click the "Details" tab to see this content.</p>
        </TabPanel>
        <TabPanel value="settings">
          <h3>Settings Content</h3>
          <p>Click the "Settings" tab to see this content.</p>
        </TabPanel>
      </div>
    </TabsGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "TabPanel automatically shows/hides based on the active tab in TabsGroup. No need to manually manage isSelected prop.",
      },
    },
  },
};

export const FullExample: Story = {
  name: "Complete Tabs System",
  render: () => (
    <TabsGroup defaultActiveTab="home" variant="underline">
      <nav>
        <TabList>
          <Tab value="home" labelText="Home" />
          <Tab value="products" labelText="Products">
            <span
              style={{
                marginLeft: "6px",
                backgroundColor: "#dc2626",
                color: "white",
                borderRadius: "10px",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              3
            </span>
          </Tab>
          <Tab value="about" labelText="About" />
        </TabList>
      </nav>
      <div
        style={{
          marginTop: "24px",
          padding: "20px",
          backgroundColor: "#f9fafb",
          borderRadius: "8px",
        }}
      >
        <TabPanel value="home">
          <article>
            <h2 style={{ marginTop: 0 }}>Welcome Home</h2>
            <p>
              This is the home page content. The TabPanel automatically shows
              when its value matches the active tab.
            </p>
          </article>
        </TabPanel>
        <TabPanel value="products">
          <article>
            <h2 style={{ marginTop: 0 }}>Our Products</h2>
            <p>
              Browse our product catalog. Notice the badge on the tab indicating
              3 new items.
            </p>
          </article>
        </TabPanel>
        <TabPanel value="about">
          <article>
            <h2 style={{ marginTop: 0 }}>About Us</h2>
            <p>Learn more about our company and mission.</p>
          </article>
        </TabPanel>
      </div>
    </TabsGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Complete example showing Tabs and TabPanels working together with TabsGroup context for state management.",
      },
    },
  },
};
