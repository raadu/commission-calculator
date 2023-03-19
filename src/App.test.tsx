import React from "react";
import { render, screen } from "@testing-library/react";
import RootComponent from "components/RootComponent";

test("renders learn react link", () => {
  render(<RootComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
