import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TabsGroup from "../TabsGroup";
import TabList from "../../TabList/TabList";
import Tab from "../../Tab/Tab";
import TabPanel from "../../TabPanel/TabPanel";
import Badge from "../../../Badge/Badge";

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

export const PillVariant: Story = {
  name: "Pill Variant",
  args: {
    variant: "pill",
    defaultActiveTab: "emails",
  },
  render: (args) => (
    <div className="tabsgroup-story-wrapper">
      <TabsGroup {...args}>
        <TabList>
          <Tab value="emails" labelText="Emails" />
          <Tab value="files" labelText="Files" />
          <Tab value="settings" labelText="Settings" />
        </TabList>

        <TabPanel value="emails">
          <div className="tabsgroup-story-panel">
            <h3>Emails</h3>
            <p>You have 12 unread emails in your inbox.</p>
            <ul>
              <li>Meeting reminder - 2 hours ago</li>
              <li>Project update - Yesterday</li>
              <li>Team announcement - 2 days ago</li>
            </ul>
          </div>
        </TabPanel>

        <TabPanel value="files">
          <div className="tabsgroup-story-panel">
            <h3>Files</h3>
            <p>Your recent files and documents.</p>
            <ul>
              <li>Report.pdf - 1.2 MB</li>
              <li>Presentation.pptx - 3.4 MB</li>
              <li>Spreadsheet.xlsx - 890 KB</li>
            </ul>
          </div>
        </TabPanel>

        <TabPanel value="settings">
          <div className="tabsgroup-story-panel">
            <h3>Settings</h3>
            <p>Configure your account preferences.</p>
            <ul>
              <li>Language: English</li>
              <li>Timezone: UTC-5</li>
              <li>Theme: Light</li>
            </ul>
          </div>
        </TabPanel>
      </TabsGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default pill variant in uncontrolled mode. TabsGroup manages tab state and provides context to all Tab and TabPanel components automatically.",
      },
    },
  },
};

export const UnderlineVariant: Story = {
  name: "Underline Variant",
  args: {
    variant: "underline",
    defaultActiveTab: "dashboard",
  },
  render: (args) => (
    <div className="tabsgroup-story-wrapper">
      <TabsGroup {...args}>
        <TabList>
          <Tab value="dashboard" labelText="Dashboard" />
          <Tab value="analytics" labelText="Analytics" />
          <Tab value="reports" labelText="Reports" />
        </TabList>

        <TabPanel value="dashboard">
          <div className="tabsgroup-story-panel">
            <h3>Dashboard</h3>
            <p>Overview of your key metrics and performance indicators.</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginTop: "16px",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#f0f9ff",
                  borderRadius: "4px",
                }}
              >
                <strong>Total Users</strong>
                <p style={{ fontSize: "24px", margin: "8px 0 0" }}>1,234</p>
              </div>
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#f0fdf4",
                  borderRadius: "4px",
                }}
              >
                <strong>Active Sessions</strong>
                <p style={{ fontSize: "24px", margin: "8px 0 0" }}>89</p>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="analytics">
          <div className="tabsgroup-story-panel">
            <h3>Analytics</h3>
            <p>Detailed analytics and user behavior insights.</p>
            <ul>
              <li>Page views: 45,678</li>
              <li>Bounce rate: 32%</li>
              <li>Avg. session: 4m 23s</li>
            </ul>
          </div>
        </TabPanel>

        <TabPanel value="reports">
          <div className="tabsgroup-story-panel">
            <h3>Reports</h3>
            <p>Generate and view your custom reports.</p>
            <ul>
              <li>Monthly Summary - Available</li>
              <li>Quarterly Review - In Progress</li>
              <li>Annual Report - Pending</li>
            </ul>
          </div>
        </TabPanel>
      </TabsGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Underline variant provides an alternative visual style. All tabs and panels automatically receive the variant from TabsGroup context.",
      },
    },
  },
};

export const ControlledMode: Story = {
  name: "Controlled Mode",
  render: function ControlledExample() {
    const [activeTab, setActiveTab] = useState("inbox");

    return (
      <div className="tabsgroup-story-wrapper">
        <h2>
          This is the parent component and it controls the active tab. It stores
          its value its local state, then it prints it.
        </h2>
        <h1 style={{ marginBottom: "20px" }}>Current Tab: {activeTab}</h1>

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
            <div className="tabsgroup-story-panel">
              <h3>Inbox</h3>
              <p>You have 5 new messages.</p>
            </div>
          </TabPanel>

          <TabPanel value="sent">
            <div className="tabsgroup-story-panel">
              <h3>Sent</h3>
              <p>You have sent 42 messages.</p>
            </div>
          </TabPanel>

          <TabPanel value="drafts">
            <div className="tabsgroup-story-panel">
              <h3>Drafts</h3>
              <p>You have 3 draft messages.</p>
            </div>
          </TabPanel>
        </TabsGroup>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Controlled mode allows external state management. The parent component stores the active tab value and renders it in an H1 element, demonstrating how you can use the tab state for validation, analytics, URL persistence, or conditional rendering.",
      },
    },
  },
};

export const WithCustomClassName: Story = {
  name: "With Custom ClassName",
  args: {
    variant: "pill",
    defaultActiveTab: "home",
    className: "custom-tabs-container",
  },
  render: (args) => (
    <div className="tabsgroup-story-wrapper">
      {/* Custom className styling is handled by the consumer's CSS, not by story SCSS */}
      <TabsGroup {...args}>
        <TabList>
          <Tab value="home" labelText="Home" />
          <Tab value="products" labelText="Products" />
          <Tab value="about" labelText="About" />
        </TabList>

        <TabPanel value="home">
          <div className="tabsgroup-story-panel">
            <h3>Welcome Home</h3>
            <p>This TabsGroup has custom styling applied via className.</p>
            <p>
              Notice the gray background, padding, border radius, and shadow on
              the container.
            </p>
          </div>
        </TabPanel>

        <TabPanel value="products">
          <div className="tabsgroup-story-panel">
            <h3>Our Products</h3>
            <p>Browse our product catalog and offerings.</p>
            <ul>
              <li>Product A - Premium</li>
              <li>Product B - Standard</li>
              <li>Product C - Basic</li>
            </ul>
          </div>
        </TabPanel>

        <TabPanel value="about">
          <div className="tabsgroup-story-panel">
            <h3>About Us</h3>
            <p>Learn more about our company and mission.</p>
            <p>
              Custom className allows flexible styling while maintaining
              functionality.
            </p>
          </div>
        </TabPanel>
      </TabsGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Apply custom styling via className prop for flexible layout adjustments while maintaining all TabsGroup functionality.",
      },
    },
  },
};

export const WithBadges: Story = {
  name: "With Badges",
  args: {
    variant: "pill",
    defaultActiveTab: "notifications",
  },
  render: (args) => (
    <div className="tabsgroup-story-wrapper">
      <TabsGroup {...args}>
        <TabList>
          <Tab value="notifications" labelText="Notifications">
            <Badge
              variant="negative"
              role="status"
              aria-label="3 unread notifications"
              aria-live="polite"
            >
              3
            </Badge>
          </Tab>
          <Tab value="messages" labelText="Messages">
            <Badge
              variant="neutral"
              role="status"
              aria-label="12 unread messages"
              aria-live="polite"
            >
              12
            </Badge>
          </Tab>
          <Tab value="completed" labelText="Completed">
            <Badge variant="positive">Done</Badge>
          </Tab>
          <Tab value="alerts" labelText="Alerts" />
        </TabList>

        <TabPanel value="notifications">
          <div className="tabsgroup-story-panel">
            <h3>Notifications (3 new)</h3>
            <div
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "12px",
                marginBottom: "12px",
              }}
            >
              <strong>System Update</strong>
              <p style={{ margin: "4px 0", color: "#666" }}>
                Your system will be updated tonight
              </p>
              <small style={{ color: "#999" }}>2 hours ago</small>
            </div>
            <div
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "12px",
                marginBottom: "12px",
              }}
            >
              <strong>New Feature</strong>
              <p style={{ margin: "4px 0", color: "#666" }}>
                Check out our latest features
              </p>
              <small style={{ color: "#999" }}>1 day ago</small>
            </div>
            <div>
              <strong>Maintenance Notice</strong>
              <p style={{ margin: "4px 0", color: "#666" }}>
                Scheduled maintenance this weekend
              </p>
              <small style={{ color: "#999" }}>2 days ago</small>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="messages">
          <div className="tabsgroup-story-panel">
            <h3>Messages (12 unread)</h3>
            <p>You have 12 new messages from your team members.</p>
            <ul>
              <li>
                <strong>John:</strong> Meeting at 3pm today
              </li>
              <li>
                <strong>Sarah:</strong> Project update ready for review
              </li>
              <li>
                <strong>Mike:</strong> Can you check the latest PR?
              </li>
            </ul>
          </div>
        </TabPanel>

        <TabPanel value="completed">
          <div className="tabsgroup-story-panel">
            <h3>Completed Tasks</h3>
            <p>All your tasks are complete! Great work!</p>
            <ul>
              <li>✅ Design review - Completed</li>
              <li>✅ Code review - Completed</li>
              <li>✅ Documentation - Completed</li>
            </ul>
          </div>
        </TabPanel>

        <TabPanel value="alerts">
          <div className="tabsgroup-story-panel">
            <h3>Alerts</h3>
            <p>No new alerts at this time.</p>
            <p style={{ color: "#666" }}>
              You're all caught up! We'll notify you when something needs your
              attention.
            </p>
          </div>
        </TabPanel>
      </TabsGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Complete example showing TabsGroup with Badge components. Demonstrates all three Badge variants (negative, neutral, positive) integrated with Tab components.",
      },
    },
  },
};

export const AsSemanticElement: Story = {
  name: "As Semantic Element",
  args: {
    variant: "underline",
    defaultActiveTab: "products",
    as: "nav",
  },
  render: (args) => (
    <div className="tabsgroup-story-wrapper">
      <TabsGroup {...args}>
        <TabList>
          <Tab value="home" labelText="Home" />
          <Tab value="products" labelText="Products" />
          <Tab value="services" labelText="Services" />
          <Tab value="contact" labelText="Contact" />
        </TabList>

        <TabPanel value="home">
          <div className="tabsgroup-story-panel">
            <h3>Home</h3>
            <p>
              Welcome to our website. This TabsGroup is rendered as a
              &lt;nav&gt; element for semantic HTML.
            </p>
            <p>
              Using the <code>as</code> prop allows you to choose the
              appropriate HTML element for your use case.
            </p>
          </div>
        </TabPanel>

        <TabPanel value="products">
          <div className="tabsgroup-story-panel">
            <h3>Products</h3>
            <p>Explore our range of products designed to meet your needs.</p>
            <ul>
              <li>Professional Tools</li>
              <li>Enterprise Solutions</li>
              <li>Developer Resources</li>
            </ul>
          </div>
        </TabPanel>

        <TabPanel value="services">
          <div className="tabsgroup-story-panel">
            <h3>Services</h3>
            <p>Our comprehensive services to support your business growth.</p>
            <ul>
              <li>Consulting</li>
              <li>Technical Support</li>
              <li>Training & Education</li>
            </ul>
          </div>
        </TabPanel>

        <TabPanel value="contact">
          <div className="tabsgroup-story-panel">
            <h3>Contact Us</h3>
            <p>Get in touch with our team.</p>
            <p>
              <strong>Email:</strong> contact@example.com
            </p>
            <p>
              <strong>Phone:</strong> (555) 123-4567
            </p>
          </div>
        </TabPanel>
      </TabsGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use the as prop to render TabsGroup as different HTML elements (section, nav, etc.) for semantic HTML structure.",
      },
    },
  },
};

export const CompleteExample: Story = {
  name: "Complete Example",
  args: {
    variant: "pill",
    defaultActiveTab: "profile",
    as: "section",
  },
  render: (args) => (
    <div className="tabsgroup-story-wrapper" style={{ width: "700px" }}>
      <h2 style={{ marginBottom: "20px" }}>User Settings</h2>
      <TabsGroup {...args}>
        <TabList>
          <Tab value="profile" labelText="Profile" />
          <Tab value="security" labelText="Security" />
          <Tab value="preferences" labelText="Preferences">
            <Badge variant="positive">New</Badge>
          </Tab>
        </TabList>

        <TabPanel
          value="profile"
          aria-label="Profile Settings. Update your display name and bio information."
        >
          <div className="tabsgroup-story-panel" style={{ padding: "24px" }}>
            <h3 style={{ marginTop: 0 }}>Profile Settings</h3>
            <p style={{ color: "#666", marginBottom: "16px" }}>
              Update your display name and bio information.
            </p>
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

        <TabPanel
          value="security"
          aria-label="Security Settings. Manage two-factor authentication and update your password."
        >
          <div className="tabsgroup-story-panel" style={{ padding: "24px" }}>
            <h3 style={{ marginTop: 0 }}>Security Settings</h3>
            <p style={{ color: "#666", marginBottom: "16px" }}>
              Manage two-factor authentication and update your password.
            </p>
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

        <TabPanel
          value="preferences"
          aria-label="Preferences. Configure your notification settings and communication preferences."
        >
          <div className="tabsgroup-story-panel" style={{ padding: "24px" }}>
            <h3 style={{ marginTop: 0 }}>Preferences</h3>
            <p style={{ color: "#666", marginBottom: "16px" }}>
              Configure your notification settings and communication
              preferences.
            </p>
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
  parameters: {
    docs: {
      description: {
        story:
          "Complete example combining all features: custom styling, badges, semantic elements, and full tab system with forms and interactive content.",
      },
    },
  },
};
