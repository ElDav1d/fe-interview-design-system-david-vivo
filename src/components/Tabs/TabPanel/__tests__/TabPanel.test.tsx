import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import TabPanel from "../TabPanel";

it("is hidden when not selected", () => {
  render(
    <TabPanel id="panel-1" isSelected={false}>
      Hidden content
    </TabPanel>
  );

  const tabPanel = screen.getByRole("tabpanel", { hidden: true });

  expect(tabPanel).not.toBeVisible();
});

it("is visible when selected", () => {
  render(
    <TabPanel id="panel-1" isSelected={true}>
      Visible content
    </TabPanel>
  );

  const tabPanel = screen.getByRole("tabpanel");
  expect(tabPanel).toBeVisible();
});

it("applies additional props", () => {
  render(
    <TabPanel id="panel-1" isSelected={true} aria-labelledby="tab-1">
      Content
    </TabPanel>
  );

  const tabPanel = screen.getByRole("tabpanel");

  expect(tabPanel).toHaveAttribute("id", "panel-1");
  expect(tabPanel).toHaveAttribute("aria-labelledby", "tab-1");
});
