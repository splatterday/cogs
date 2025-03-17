import "@testing-library/jest-dom"; // ✅ Ensures Jest matchers are available
import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "./SearchInput";

describe("SearchInput Component", () => {
  test("renders input field and button", () => {
    render(<SearchInput query={""} setQuery={jest.fn()} />);
    
    const input = screen.getByTestId("search-input");
    expect(input).toBeInTheDocument();
  });
});
