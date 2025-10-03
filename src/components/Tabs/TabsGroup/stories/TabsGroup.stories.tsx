import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TabsGroup from "../TabsGroup";
import TabList from "../../TabList/TabList";
import Tab from "../../Tab/Tab";
import TabPanel from "../../TabPanel/TabPanel";

const meta: Meta<typeof TabsGroup> = {
  title: "Components/Tabs/TabsGroup",
  component: TabsGroup,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["pill", "underline"],
      description: "Visual variant for all tabs",
      table: {
        type: { summary: "'pill' | 'underline'" },
        defaultValue: { summary: "'pill'" },
      },
    },
    defaultActiveTab: {
      control: "text",
      description: "Initially selected tab (uncontrolled mode)",
      table: {
        type: { summary: "string" },
      },
    },
    value: {
      control: "text",
      description: "Selected tab (controlled mode)",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: "text",
      description: "Custom CSS class for the container",
    },
    as: {
      control: "select",
      options: ["div", "section", "nav"],
      description: "HTML element to render as",
      table: {
        type: { summary: "ElementType" },
        defaultValue: { summary: "'div'" },
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TabsGroup>;

/**
 * Default pill variant with uncontrolled mode.
 * Uses defaultActiveTab to set initial selection.
 */
export const PillVariant: Story = {
  args: {
    variant: "pill",
    defaultActiveTab: "emails",
  },
  render: (args) => (
    <TabsGroup {...args}>
      <TabList>
        <Tab value="emails" labelText="Emails" />
        <Tab value="files" labelText="Files" />
        <Tab value="settings" labelText="Settings" />
      </TabList>
    </TabsGroup>
  ),
};

/**
 * Underline variant with uncontrolled mode.
 * Shows alternative visual style for tabs.
 */
export const UnderlineVariant: Story = {
  args: {
    variant: "underline",
    defaultActiveTab: "dashboard",
  },
  render: (args) => (
    <TabsGroup {...args}>
      <TabList>
        <Tab value="dashboard" labelText="Dashboard" />
        <Tab value="analytics" labelText="Analytics" />
        <Tab value="reports" labelText="Reports" />
      </TabList>
    </TabsGroup>
  ),
};

/**
 * Complete tabs system with TabPanel integration.
 * Panels automatically show/hide based on selected tab.
 */
export const WithTabPanels: Story = {
  args: {
    variant: "pill",
    defaultActiveTab: "overview",
  },
  render: (args) => (
    <div style={{ width: "600px" }}>
      <TabsGroup {...args}>
        <TabList>
          <Tab value="overview" labelText="Overview" />
          <Tab value="details" labelText="Details" />
          <Tab value="activity" labelText="Activity" />
        </TabList>

        <TabPanel value="overview">
          <div style={{ padding: "20px", border: "1px solid #e0e0e0" }}>
            <h3>Overview</h3>
            <p>
              This is the overview panel. It shows general information about
              your account.
            </p>
          </div>
        </TabPanel>

        <TabPanel value="details">
          <div style={{ padding: "20px", border: "1px solid #e0e0e0" }}>
            <h3>Details</h3>
            <p>Detailed information about your profile and settings.</p>
            <ul>
              <li>User ID: 12345</li>
              <li>Email: user@example.com</li>
              <li>Role: Administrator</li>
            </ul>
          </div>
        </TabPanel>

        <TabPanel value="activity">
          <div style={{ padding: "20px", border: "1px solid #e0e0e0" }}>
            <h3>Activity Log</h3>
            <p>Recent activity on your account:</p>
            <ul>
              <li>Logged in - 2 hours ago</li>
              <li>Updated profile - Yesterday</li>
              <li>Changed password - 3 days ago</li>
            </ul>
          </div>
        </TabPanel>
      </TabsGroup>
    </div>
  ),
};

/**
 * Controlled mode - external state management.
 * Parent component controls which tab is active.
 */
export const ControlledMode: Story = {
  render: function ControlledExample() {
    const [activeTab, setActiveTab] = useState("inbox");

    return (
      <div style={{ width: "600px" }}>
        <div style={{ marginBottom: "20px" }}>
          <p>
            <strong>External Control:</strong>
          </p>
          <button onClick={() => setActiveTab("inbox")}>Go to Inbox</button>
          <button onClick={() => setActiveTab("sent")}>Go to Sent</button>
          <button onClick={() => setActiveTab("drafts")}>Go to Drafts</button>
        </div>

        <TabsGroup
          variant="underline"
          value={activeTab}
          onChange={setActiveTab}
        >
          <TabList>
            <Tab value="inbox" labelText="Inbox" />
            <Tab value="sent" labelText="Sent" />
            <Tab value="drafts" labelText="Drafts" />
          </TabList>

          <TabPanel value="inbox">
            <div style={{ padding: "20px", border: "1px solid #e0e0e0" }}>
              <h3>Inbox</h3>
              <p>You have 5 new messages.</p>
            </div>
          </TabPanel>

          <TabPanel value="sent">
            <div style={{ padding: "20px", border: "1px solid #e0e0e0" }}>
              <h3>Sent</h3>
              <p>You have sent 42 messages.</p>
            </div>
          </TabPanel>

          <TabPanel value="drafts">
            <div style={{ padding: "20px", border: "1px solid #e0e0e0" }}>
              <h3>Drafts</h3>
              <p>You have 3 draft messages.</p>
            </div>
          </TabPanel>
        </TabsGroup>

        <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
          Current active tab: <strong>{activeTab}</strong>
        </div>
      </div>
    );
  },
};

/**
 * Custom className applied to the TabsGroup container.
 * Useful for custom styling or layout adjustments.
 */
export const WithCustomClassName: Story = {
  args: {
    variant: "pill",
    defaultActiveTab: "home",
    className: "custom-tabs-container",
  },
  render: (args) => (
    <div>
      <style>
        {`
          .custom-tabs-container {
            padding: 20px;
            background-color: #f5f5f5;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
        `}
      </style>
      <TabsGroup {...args}>
        <TabList>
          <Tab value="home" labelText="Home" />
          <Tab value="products" labelText="Products" />
          <Tab value="about" labelText="About" />
        </TabList>
      </TabsGroup>
    </div>
  ),
};

/**
 * Tabs with children placeholder (for future Badge support).
 * Shows where additional content like badges or icons will appear.
 */
export const WithChildrenPlaceholder: Story = {
  args: {
    variant: "pill",
    defaultActiveTab: "notifications",
  },
  render: (args) => (
    <TabsGroup {...args}>
      <TabList>
        <Tab value="notifications" labelText="Notifications">
          <span
            style={{
              marginLeft: "8px",
              padding: "2px 6px",
              backgroundColor: "#e74c3c",
              color: "white",
              borderRadius: "10px",
              fontSize: "12px",
            }}
          >
            3
          </span>
        </Tab>
        <Tab value="messages" labelText="Messages">
          <span
            style={{
              marginLeft: "8px",
              padding: "2px 6px",
              backgroundColor: "#3498db",
              color: "white",
              borderRadius: "10px",
              fontSize: "12px",
            }}
          >
            12
          </span>
        </Tab>
        <Tab value="alerts" labelText="Alerts" />
      </TabList>
    </TabsGroup>
  ),
};

/**
 * TabsGroup rendered as different HTML elements using the "as" prop.
 * Useful for semantic HTML (section, nav, etc.).
 */
export const AsSemanticElement: Story = {
  args: {
    variant: "underline",
    defaultActiveTab: "products",
    as: "nav",
  },
  render: (args) => (
    <TabsGroup {...args}>
      <TabList>
        <Tab value="home" labelText="Home" />
        <Tab value="products" labelText="Products" />
        <Tab value="services" labelText="Services" />
        <Tab value="contact" labelText="Contact" />
      </TabList>
    </TabsGroup>
  ),
};

/**
 * Complete example with all features combined.
 * Shows TabsGroup, TabList, Tab, and TabPanel working together
 * with custom styling and content.
 */
export const CompleteExample: Story = {
  args: {
    variant: "pill",
    defaultActiveTab: "profile",
    as: "section",
  },
  render: (args) => (
    <div style={{ width: "700px" }}>
      <h2 style={{ marginBottom: "20px" }}>User Settings</h2>
      <TabsGroup {...args}>
        <TabList>
          <Tab value="profile" labelText="Profile" />
          <Tab value="security" labelText="Security" />
          <Tab value="preferences" labelText="Preferences">
            <span
              style={{
                marginLeft: "8px",
                padding: "2px 6px",
                backgroundColor: "#f39c12",
                color: "white",
                borderRadius: "10px",
                fontSize: "12px",
              }}
            >
              New
            </span>
          </Tab>
        </TabList>

        <TabPanel value="profile">
          <div
            style={{
              padding: "24px",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              marginTop: "16px",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Profile Settings</h3>
            <div style={{ marginBottom: "16px" }}>
              <label
                htmlFor="display-name"
                style={{ display: "block", marginBottom: "4px" }}
              >
                Display Name
              </label>
              <input
                id="display-name"
                type="text"
                defaultValue="John Doe"
                style={{
                  padding: "8px",
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label
                htmlFor="bio"
                style={{ display: "block", marginBottom: "4px" }}
              >
                Bio
              </label>
              <textarea
                id="bio"
                defaultValue="Software developer"
                rows={3}
                style={{
                  padding: "8px",
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontFamily: "inherit",
                }}
              />
            </div>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
          </div>
        </TabPanel>

        <TabPanel value="security">
          <div
            style={{
              padding: "24px",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              marginTop: "16px",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Security Settings</h3>
            <div style={{ marginBottom: "16px" }}>
              <h4>Two-Factor Authentication</h4>
              <p style={{ color: "#666" }}>
                Add an extra layer of security to your account
              </p>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#2ecc71",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Enable 2FA
              </button>
            </div>
            <div>
              <h4>Change Password</h4>
              <p style={{ color: "#666" }}>Last changed: 30 days ago</p>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Update Password
              </button>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="preferences">
          <div
            style={{
              padding: "24px",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              marginTop: "16px",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Preferences</h3>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  defaultChecked
                  style={{ marginRight: "8px" }}
                />{" "}
                Email notifications
              </label>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input type="checkbox" style={{ marginRight: "8px" }} /> Desktop
                notifications
              </label>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  defaultChecked
                  style={{ marginRight: "8px" }}
                />{" "}
                Weekly digest
              </label>
            </div>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save Preferences
            </button>
          </div>
        </TabPanel>
      </TabsGroup>
    </div>
  ),
};
