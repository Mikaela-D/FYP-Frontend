import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewCallPage from "../pages/new-call/index";

describe("Call Controls (New Call Page)", () => {
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
        json: () => Promise.resolve({ customers: [] }),
      })
    );
  });
  afterAll(() => {
    delete global.fetch;
  });
  it("renders the Select Customer label", async () => {
    render(<NewCallPage />);
    expect(
      await screen.findByLabelText(/Select Customer/i)
    ).toBeInTheDocument();
  });
});
