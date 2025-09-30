import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Tab from "../Tab";

it("renders correctly", () => {
  render(<Tab />);

  expect(screen.getByRole("tab")).toBeInTheDocument();
});
