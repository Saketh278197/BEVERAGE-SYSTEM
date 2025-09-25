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

test("Verifies that the form contains the heading 'ORDER YOUR BEVERAGE'", () => {
  useBeverageMenu.mockReturnValue([]);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const heading = screen.getByText(/ORDER YOUR BEVERAGE/);
  expect(heading).toBeInTheDocument();
});

test("Confirms the presence of the Name label in the form.", () => {
  useBeverageMenu.mockReturnValue([]);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const label = screen.getByText("Name");
  expect(label).toBeInTheDocument();
});

test("Confirms the presence of the Beverage label in the form.", () => {
  useBeverageMenu.mockReturnValue([]);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const label2 = screen.getByText("Beverage");
  expect(label2).toBeInTheDocument();
});

test("Checks that the text input box is rendered in the form.", () => {
  useBeverageMenu.mockReturnValue([]);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const textbox = screen.getByRole("textbox");
  expect(textbox).toBeInTheDocument();
});

test("Checks that the dropdown select box is rendered in the form.", () => {
  useBeverageMenu.mockReturnValue([]);

  render(
    <Provider store={bevStore}>
      <Form />
    </Provider>
  );

  const selectBox = screen.getByRole("combobox");
  expect(selectBox).toBeInTheDocument();
});

test("Displays an error popup when the form is submitted with empty fields.", () => {
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

test("Displays an error message if only the beverage is selected and the name is missing.", () => {
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

test("Displays an error message if only the name is entered without selecting a beverage.", () => {
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

test("Confirms successful form submission when both name and beverage are provided.", () => {
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

test("Verifies that the submitted data is correctly added to the queue in the store.", () => {
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

test("Ensures the form fields are reset after a successful submission.", () => {
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

test("Checks that the success popup message disappears automatically after 3 seconds.", () => {
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

test("Checks that the error message disappears automatically after 3 seconds when submission is invalid.", () => {
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

test("Confirms all beverage options from the mock menu are rendered in the select dropdown.", () => {
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

test("Verifies the ability to submit multiple unique orders successfully.", () => {
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
