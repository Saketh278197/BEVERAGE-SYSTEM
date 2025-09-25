import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import bevStore from "../../utils/ReduxStore/BevStore";
import Form from "../Form";
import useBeverageMenu from "../../CustomHooks/useBeverageMenu";
import MenuMock from "./Mocks/MenuMock.json";
import { resetQueue } from "../../utils/ReduxStore/BevSlice";
import { act } from "react-dom/test-utils";

jest.mock("../../CustomHooks/useBeverageMenu");

beforeEach(() => {
  bevStore.dispatch(resetQueue());
});

test("should have heading in the form 'ORDER YOUR BEVERAGE'", () => {
  useBeverageMenu.mockReturnValue([]);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const heading = screen.getByText(/ORDER YOUR BEVERAGE/);
  expect(heading).toBeInTheDocument();
});

test("Should have label 'Name' in the form", () => {
  useBeverageMenu.mockReturnValue([]);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const label = screen.getByText("Name");
  expect(label).toBeInTheDocument();
});

test("Should have label 'Beverage' in the form", () => {
  useBeverageMenu.mockReturnValue([]);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const label2 = screen.getByText("Beverage");
  expect(label2).toBeInTheDocument();
});

test("Should the input box is there in the form", () => {
  useBeverageMenu.mockReturnValue([]);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const textbox = screen.getByRole("textbox");
  expect(textbox).toBeInTheDocument();
});

test("Should the select Box be loaded in the page", () => {
  useBeverageMenu.mockReturnValue([]);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const selectBox = screen.getByRole("combobox");
  expect(selectBox).toBeInTheDocument();
});

test("Should popup load error message when submitting empty form", () => {
  useBeverageMenu.mockReturnValue([]);

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

test("Should show error if only beverage is selected", () => {
  useBeverageMenu.mockReturnValue(MenuMock);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const combobox = screen.getByRole("combobox");
  fireEvent.change(combobox, {
    target: { value: "Sparkling Cranberry Punch" },
  });

  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);

  const errorPopup = screen.getByText(/Please Enter Your Name !/);
  expect(errorPopup).toBeInTheDocument();
});

test("Should only name entered", () => {
  useBeverageMenu.mockReturnValue(MenuMock);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const inputbox = screen.getByRole("textbox");
  fireEvent.change(inputbox, { target: { value: "John" } });

  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);

  const errorPopup = screen.getByText(/Please Enter Your Selected Beverage !/);
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

test("Should clear form after successful submit", () => {
  useBeverageMenu.mockReturnValue(MenuMock);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const input = screen.getByRole("textbox");
  const combobox = screen.getByRole("combobox");

  fireEvent.change(input, { target: { value: "Jane" } });
  fireEvent.change(combobox, {
    target: { value: "Sparkling Cranberry Punch" },
  });

  fireEvent.click(screen.getByText("Submit"));

  expect(input.value).toBe("");
  expect(combobox.value).toBe("");
});


test("Success popup should disappear after 3 seconds", () => {
  jest.useFakeTimers();
  useBeverageMenu.mockReturnValue(MenuMock);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const input = screen.getByRole("textbox");
  const combobox = screen.getByRole("combobox");

  fireEvent.change(input, { target: { value: "Jane" } });
  fireEvent.change(combobox, {
    target: { value: "Sparkling Cranberry Punch" },
  });

  fireEvent.click(screen.getByText("Submit"));

  // Confirm popup is there
  expect(screen.getByText("Order Submitted Successfully!")).toBeInTheDocument();

  // Advance timers
  act(() => {
    jest.advanceTimersByTime(3000);
  });

  // Confirm popup disappears
  expect(
    screen.queryByText("Order Submitted Successfully!")
  ).not.toBeInTheDocument();
});


test("Error message should disappear after 3 seconds when form is invalid", () => {
  jest.useFakeTimers();
  useBeverageMenu.mockReturnValue([]);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  fireEvent.click(screen.getByText("Submit"));

  expect(
    screen.getByText(/Please Enter Your Name And Selected Beverage !/)
  ).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(3000);
  });

  expect(
    screen.queryByText(/Please Enter Your Name And Selected Beverage !/)
  ).not.toBeInTheDocument();
});

test("Should render options from beverage menu mock", () => {
  useBeverageMenu.mockReturnValue(MenuMock);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  MenuMock.forEach((item) => {
    expect(screen.getByText(item.name)).toBeInTheDocument();
  });
});

test("Should allow multiple unique submissions", () => {
  useBeverageMenu.mockReturnValue(MenuMock);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const input = screen.getByRole("textbox");
  const combobox = screen.getByRole("combobox");

  fireEvent.change(input, { target: { value: "User1" } });
  fireEvent.change(combobox, {
    target: { value: "Sparkling Cranberry Punch" },
  });
  fireEvent.click(screen.getByText("Submit"));

  fireEvent.change(input, { target: { value: "User2" } });
  fireEvent.change(combobox, {
    target: { value: "Sparkling Cranberry Punch" },
  });
  fireEvent.click(screen.getByText("Submit"));

  const state = bevStore.getState();
  expect(state.Beverage.inTheQueue.length).toBe(2);
  expect(state.Beverage.inTheQueue[0].name).toBe("User1");
  expect(state.Beverage.inTheQueue[1].name).toBe("User2");
});
