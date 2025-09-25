import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import bevStore from "../../utils/ReduxStore/BevStore";
import Menu from "../beverage_Menu";
import "@testing-library/jest-dom";
import useBeverageMenu from "../../CustomHooks/useBeverageMenu";
import MenuMock from "../__tests__/Mocks/MenuMock.json";

jest.mock("../../CustomHooks/useBeverageMenu");

describe("Menu Component Tests", () => {
  beforeEach(() => {
    useBeverageMenu.mockReturnValue(MenuMock);

    render(
      <BrowserRouter>
        <Provider store={bevStore}>
          <Menu />
        </Provider>
      </BrowserRouter>
    );
  });

  test("Verifies that the Beverage Menu heading is displayed.", () => {
    expect(screen.getByText(/Beverage Menu/i)).toBeInTheDocument();
  });

  test("Confirms that a sample menu item is rendered correctly.", () => {
    expect(screen.getByText("Sparkling Cranberry Punch")).toBeInTheDocument();
  });

  test("Checks that the MustTry filter button is present in the component.", () => {
    expect(
      screen.getByRole("button", { name: /MustTry/i })
    ).toBeInTheDocument();
  });

  test("Verifies that the MustTry filter button toggles the filter text correctly.", () => {
    const toggleBtn = screen.getByText("MustTry - OFF");
    fireEvent.click(toggleBtn);
    expect(screen.getByText("MustTry - ON")).toBeInTheDocument();
  });

  test("Ensures only MustTry items are displayed when the filter is activated.", () => {
    fireEvent.click(screen.getByText("MustTry - OFF"));
    expect(screen.getByText("Sparkling Cranberry Punch")).toBeInTheDocument();
    expect(screen.queryByText("Iced Chocolate Delight")).toBeNull();
  });

  test("Confirms that clicking the accordion expands it to reveal the item description.", () => {
    fireEvent.click(screen.getByText("Sparkling Cranberry Punch"));
    expect(screen.getByTestId("description")).toBeInTheDocument();
  });
});

describe("Menu Component - Loading State", () => {
  beforeEach(() => {
    useBeverageMenu.mockReturnValue([]);
    render(
      <BrowserRouter>
        <Provider store={bevStore}>
          <Menu />
        </Provider>
      </BrowserRouter>
    );
  });

  test("Displays a loading message while the menu data is being fetched or unavailable.", () => {
    expect(screen.getByText("Loading menu...")).toBeInTheDocument();
  });
});
