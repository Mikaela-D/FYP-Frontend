import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Inbox from "../pages/inbox/index";

describe("Agent Inbox", () => {
  it("renders the Inbox label", () => {
    render(<Inbox />);
    expect(screen.getByText(/Inbox/i)).toBeInTheDocument();
  });
});
