import type { Meta, StoryObj } from "@storybook/react";
import Badge from "../Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "positive", "negative"],
      description: "Visual variant of the badge",
      table: {
        type: { summary: "'neutral' | 'positive' | 'negative'" },
        defaultValue: { summary: "'neutral'" },
      },
    },
    children: {
      control: "text",
      description:
        "Content to display inside the badge (text, numbers, or any ReactNode)",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  name: "Default",
  args: {
    children: "Badge",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Badge for additional information. Default variant is neutral. Admits neutral, positive, and negative variants.",
      },
    },
  },
};

export const WithDynamicContent: Story = {
  name: "With Dynamic Content",
  args: {
    variant: "negative",
    children: "99+",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Badges can display dynamic content, such as counts that may change (e.g., '99+' for many notifications).",
      },
    },
  },
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="positive">Positive</Badge>
      <Badge variant="negative">Negative</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All three badge variants displayed together for comparison.",
      },
    },
  },
};
