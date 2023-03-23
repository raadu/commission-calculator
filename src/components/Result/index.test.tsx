import { render, screen } from "@testing-library/react";
import Result from ".";

test("Renders 0 Euro", () => {
  render(<Result commissionAmount={0} />);
  const divElement = screen.getByRole("result_text");
  expect(divElement).toHaveAttribute("role", "result_text");
  expect(divElement).toHaveTextContent("0 euro");
});

test("Renders 100 Euro", () => {
  render(<Result commissionAmount={100} />);
  const divElement = screen.getByRole("result_text");
  expect(divElement).toHaveAttribute("role", "result_text");
  expect(divElement).toHaveTextContent("100 euros");
});

test("Renders 50 cents", () => {
  render(<Result commissionAmount={0.5} />);
  const divElement = screen.getByRole("result_text");
  expect(divElement).toHaveAttribute("role", "result_text");
  expect(divElement).toHaveTextContent("50 cents");
});

test("Renders 1 cent", () => {
  render(<Result commissionAmount={0.01} />);
  const divElement = screen.getByRole("result_text");
  expect(divElement).toHaveAttribute("role", "result_text");
  expect(divElement).toHaveTextContent("1 cent");
});

test("Renders 2 cents", () => {
  render(<Result commissionAmount={0.013} />);
  const divElement = screen.getByRole("result_text");
  expect(divElement).toHaveAttribute("role", "result_text");
  expect(divElement).toHaveTextContent("2 cents");
});
