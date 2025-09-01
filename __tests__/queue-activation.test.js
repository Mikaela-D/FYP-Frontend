import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import QueueActivation from "../pages/queue-activation/index";

describe("Queue Activation", () => {
  it("renders the Queue Activation heading", () => {
    render(<QueueActivation />);
    expect(screen.getByText(/Queue Activation/i)).toBeInTheDocument();
  });
});
