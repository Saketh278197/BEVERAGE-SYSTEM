// __tests__/Menu.test.js
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

  test("Should render Beverage Menu heading", () => {
    expect(screen.getByText(/Beverage Menu/i)).toBeInTheDocument();
  });

  test("Should display dummy menu item", () => {
    expect(screen.getByText("Sparkling Cranberry Punch")).toBeInTheDocument();
  });

  test("Should render MustTry button", () => {
    expect(
      screen.getByRole("button", { name: /MustTry/i })
    ).toBeInTheDocument();
  });

  test("Should toggle MustTry filter text", () => {
    const toggleBtn = screen.getByText("MustTry - OFF");
    fireEvent.click(toggleBtn);
    expect(screen.getByText("MustTry - ON")).toBeInTheDocument();
  });

  test("Should filter out non-MustTry items when filter is ON", () => {
    fireEvent.click(screen.getByText("MustTry - OFF"));
    expect(screen.getByText("Sparkling Cranberry Punch")).toBeInTheDocument();
    expect(screen.queryByText("Iced Chocolate Delight")).toBeNull();
  });

  test("Should open accordion and show description", () => {
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

  test("Should show loading message when menu is not available", () => {
    expect(screen.getByText("Loading menu...")).toBeInTheDocument();
  });
});
