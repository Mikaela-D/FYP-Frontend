import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AgentStats from "../pages/agent-stats/index";

describe("Agent Stats", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: () => "test-agent-id",
        setItem: () => {},
      },
      writable: true,
    });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ calls: [] }),
      })
    );
  });
  afterAll(() => {
    delete global.fetch;
  });
  it("renders the Agent Stats heading", async () => {
    render(<AgentStats />);
    expect(await screen.findByText(/Agent Stats/i)).toBeInTheDocument();
  });
});
