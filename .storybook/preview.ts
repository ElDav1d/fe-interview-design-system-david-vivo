import type { Preview } from "@storybook/react-vite";
import "../src/styles/variables.css";
import "../src/styles/index.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#fff" },
        { name: "dark", value: "#222" },
      ],
    },
  },
};

export default preview;
