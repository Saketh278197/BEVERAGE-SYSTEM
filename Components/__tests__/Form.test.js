import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import bevStore from "../../utils/ReduxStore/BevStore";
import Form from "../Form";
import useBeverageMenu from "../../CustomHooks/useBeverageMenu";
import MenuMock from "./Mocks/MenuMock.json";
import { resetQueue } from "../../utils/ReduxStore/BevSlice";
jest.mock("../../CustomHooks/useBeverageMenu");

beforeEach(() => {
  useBeverageMenu.mockReturnValue([]);
  bevStore.dispatch(resetQueue());
});

test("should have heading in the form 'ORDER YOUR BEVERAGE'", () => {
  render(
    <BrowserRouter>
      <Provider store={bevStore}>
        <Form />
      </Provider>
    </BrowserRouter>
  );
  const heading = screen.getByText(/ORDER YOUR BEVERAGE/);
  expect(heading).toBeInTheDocument();
});

test("Should the input box is there in the form", () => {
  render(
    <BrowserRouter>
      <Provider store={bevStore}>
        <Form />
      </Provider>
    </BrowserRouter>
  );
  const textbox = screen.getByRole("textbox");
  expect(textbox).toBeInTheDocument();
});

test("Should have label 'Name' in the form", () => {
  render(
    <BrowserRouter>
      <Provider store={bevStore}>
        <Form />
      </Provider>
    </BrowserRouter>
  );
  const label = screen.getByText("Name");
  expect(label).toBeInTheDocument();
});

test("Should have label 'Beverage' in the form", () => {
  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );
  const label2 = screen.getByText("Beverage");
  expect(label2).toBeInTheDocument();
});

test("Should the select Box be loaded in the page", () => {
  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );
  const selectBox = screen.getByRole("combobox");
  expect(selectBox).toBeInTheDocument();
});

test("Should popup load error message when submitting empty form", () => {
  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );
  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);

  const errorPopup = screen.getByText(
    /Please Enter Your Name And Selected Beverage !/
  );
  expect(errorPopup).toBeInTheDocument();
});

test("Should successfully submit with valid inputs", () => {
  useBeverageMenu.mockReturnValue(MenuMock);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "John" } });

  const combobox = screen.getByRole("combobox");
  fireEvent.change(combobox, {
    target: { value: "Sparkling Cranberry Punch" },
  });

  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);

  const successPopup = screen.getByText("Order Submitted Successfully!");
  expect(successPopup).toBeInTheDocument();
});
test("Should the data storing in Queue after submit", () => {
  useBeverageMenu.mockReturnValue(MenuMock);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "John" } });

  const combobox = screen.getByRole("combobox");
  fireEvent.change(combobox, {
    target: { value: "Sparkling Cranberry Punch" },
  });

  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);
  const state = bevStore.getState();
  expect(state.Beverage.inTheQueue.length).toBe(1);
});

test("Should only name entered", () => {
  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );
  const inputbox = screen.getByRole("textbox");
  fireEvent.change(inputbox, { target: { value: "John" } });

  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);

  const successPopup = screen.getByText(
    /Please Enter Your Selected Beverage !/
  );
  expect(successPopup).toBeInTheDocument();
});
