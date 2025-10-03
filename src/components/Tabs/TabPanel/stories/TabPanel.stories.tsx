import type { Meta, StoryObj } from "@storybook/react";
import TabPanel from "../TabPanel";
import TabsGroup from "../../TabsGroup/TabsGroup";
import TabList from "../../TabList/TabList";
import Tab from "../../Tab/Tab";
import { useState } from "react";
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
        story:
          "TabPanel displays content with proper accessibility attributes. The proper usage is with TabsGroup context for automatic visibility management, though standalone mode with isSelected prop is allowed for flexibility.",
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
        story:
          "Custom styles can be applied via className prop. TabPanel provides semantic HTML structure with proper ARIA attributes.",
      },
    },
  },
};

export const Interactive: Story = {
  name: "Standalone Interactive Example",
  render: function InteractiveExample() {
    const [activeTab, setActiveTab] = useState("tab1");
    return (
      <div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <Tab
            value="tab1"
            labelText="Tab 1"
            variant="pill"
            isSelected={activeTab === "tab1"}
            onTabSelect={() => setActiveTab("tab1")}
          />
          <Tab
            value="tab2"
            labelText="Tab 2"
            variant="pill"
            isSelected={activeTab === "tab2"}
            onTabSelect={() => setActiveTab("tab2")}
          />
          <Tab
            value="tab3"
            labelText="Tab 3"
            variant="pill"
            isSelected={activeTab === "tab3"}
            onTabSelect={() => setActiveTab("tab3")}
          />
        </div>
        <div
          style={{
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <TabPanel id="panel-1" isSelected={activeTab === "tab1"}>
            <h3>Tab 1 Content</h3>
            <p>This is the content for Tab 1.</p>
          </TabPanel>
          <TabPanel id="panel-2" isSelected={activeTab === "tab2"}>
            <h3>Tab 2 Content</h3>
            <p>This is the content for Tab 2.</p>
          </TabPanel>
          <TabPanel id="panel-3" isSelected={activeTab === "tab3"}>
            <h3>Tab 3 Content</h3>
            <p>This is the content for Tab 3.</p>
          </TabPanel>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example with manual state management. Demonstrates flexibility when full control is needed, though TabsGroup context is recommended for typical use cases.",
      },
    },
  },
};

export const WithContext: Story = {
  name: "With TabsGroup Context (Recommended)",
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
          "The proper way to use TabPanel: within TabsGroup context for composition-based API. Panels automatically show/hide based on the active tab - no need to manually manage isSelected prop.",
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
          "Complete example demonstrating the proper composition-based API: TabsGroup provides context for automatic state management, Tab components handle interactions, and TabPanel components display content.",
      },
    },
  },
};
