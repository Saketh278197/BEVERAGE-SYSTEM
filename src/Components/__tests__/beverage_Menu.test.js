import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { screen } from "@testing-library/react";
import bevStore from "../../utils/ReduxStore/BevStore";
import Menu from "../beverage_Menu";
import "@testing-library/jest-dom";
import useBeverageMenu from "../../CustomHooks/useBeverageMenu";
import MenuMock from "../__tests__/Mocks/MenuMock.json";
// step-1 when my data is empty my Loading screen visible avvalli
jest.mock("../../CustomHooks/useBeverageMenu");
test("Should the Menu is loaded into the page", () => {
  useBeverageMenu.mockReturnValue([]);
  render(
    <BrowserRouter>
      <Provider store={bevStore}>
        <Menu />
      </Provider>
    </BrowserRouter>
  );
  const Loading = screen.getByText("Loading menu...");
  expect(Loading).toBeInTheDocument();
});
// menu render ayyaka null avvakapothe heading undalli
test("should have Beverage Menu Heading", () => {
  useBeverageMenu.mockReturnValue(MenuMock);

  render(
    <BrowserRouter>
      <Provider store={bevStore}>
        <Menu />
      </Provider>
    </BrowserRouter>
  );
  const Heading = screen.getByText(/Beverage Menu/);
  expect(Heading).toBeInTheDocument();
});

test("Should the Menu is loaded with the dummy data", () => {
  useBeverageMenu.mockReturnValue(MenuMock);
  render(
    <BrowserRouter>
      <Provider store={bevStore}>
        <Menu />
      </Provider>
    </BrowserRouter>
  );
  const mockdata = screen.getByText("Sparkling Cranberry Punch");
  expect(mockdata).toBeInTheDocument();
});

test("Should have a button inside menu component", () => {
  useBeverageMenu.mockReturnValue(MenuMock);
  render(
    <BrowserRouter>
      <Provider store={bevStore}>
        <Menu />
      </Provider>
    </BrowserRouter>
  );
  const mockdata = screen.getByText("Sparkling Cranberry Punch");
  expect(mockdata).toBeInTheDocument();

  const MustTry = screen.getByRole("button", { name: /MustTry/ });
  expect(MustTry).toBeInTheDocument();
});

test("Should have a button With name Musttry-OFF after clicking it modifies to Musttry-ON", () => {
  useBeverageMenu.mockReturnValue(MenuMock);
  render(
    <BrowserRouter>
      <Provider store={bevStore}>
        <Menu />
      </Provider>
    </BrowserRouter>
  );
  const filterOff = screen.getByText("MustTry - OFF");
  expect(filterOff).toBeInTheDocument();
  fireEvent.click(filterOff);

  const filterOn = screen.getByText("MustTry - ON");
  expect(filterOn).toBeInTheDocument();
});

test("When filter is on the Filtering is Working?", () => {
  useBeverageMenu.mockReturnValue(MenuMock);
  render(
    <BrowserRouter>
      <Provider store={bevStore}>
        <Menu />
      </Provider>
    </BrowserRouter>
  );
  //first MustTry has to on
  const filterOff = screen.getByText("MustTry - OFF");
  fireEvent.click(filterOff);
  //now the menu has to filter
  const MustTryItem = screen.getByText("Sparkling Cranberry Punch");
  expect(MustTryItem).toBeInTheDocument();
  // after clicking the button we dont have Iced Chocolate Delight item so we have to use queryByText
  const NotMustTryItem = screen.queryByText("Iced Chocolate Delight");
  expect(NotMustTryItem).toBeNull();
});

test("should acordion working", () => {
  useBeverageMenu.mockReturnValue(MenuMock);
  render(
    <BrowserRouter>
      <Provider store={bevStore}>
        <Menu />
      </Provider>
    </BrowserRouter>
  );
  const MustTryItem = screen.getByText("Sparkling Cranberry Punch");
  fireEvent.click(MustTryItem);
  const description = screen.getByTestId("description");
  expect(description).toBeInTheDocument();
});


