import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminLogin from "../AdminLogin";
import { Provider } from "react-redux";
import bevStore from "../../utils/ReduxStore/BevStore";
import Queue from "../Queue";
import { MemoryRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import useBeverageMenu from "../../CustomHooks/useBeverageMenu";
import { loginFailed, loginSuccess } from "../../utils/ReduxStore/AuthSlice";
import { resetQueue } from "../../utils/ReduxStore/BevSlice";
jest.mock("../../CustomHooks/useBeverageMenu");

beforeEach(() => {
  useBeverageMenu.mockReturnValue([]);
  bevStore.dispatch(resetQueue());
  render(
    <Provider store={bevStore}>
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/queue" element={<Queue />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
});

//test case 1
test("Renders the username and password labels", () => {
  const input = screen.getByText("Admin UserName");
  const password = screen.getByText("Password");
  expect(input).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});

test("Renders the username and password input fields", () => {
  const input = screen.getByTestId("username-input");
  const password = screen.getByTestId("password-input");
  expect(input).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});

test("Renders the username and password input fields", () => {
  const input = screen.getByTestId("username-input");
  const password = screen.getByTestId("password-input");
  expect(input).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});

test("Renders the username and password input fields", () => {
  const input = screen.getByTestId("username-input");
  const password = screen.getByTestId("password-input");
  expect(input).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});

test("Logs in admin and navigates to BEVERAGE QUEUE page on valid credentials", async () => {
  fireEvent.change(screen.getByTestId("username-input"), {
    target: { value: "admin123" },
  });

  fireEvent.change(screen.getByTestId("password-input"), {
    target: { value: "admin123" },
  });

  fireEvent.click(screen.getByRole("button", { name: "Login" }));
  await waitFor(() => {
    expect(screen.getByText("BEVERAGE QUEUE")).toBeInTheDocument();
  });
});

test("Shows alert and dispatches loginFailed on invalid credentials", () => {
  const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
  const dispatchSpy = jest.spyOn(bevStore, "dispatch");
  fireEvent.change(screen.getByTestId("username-input"), {
    target: { value: "123" },
  });

  fireEvent.change(screen.getByTestId("password-input"), {
    target: { value: "admin12" },
  });

  fireEvent.click(screen.getByRole("button", { name: "Login" }));
  expect(alertMock).toHaveBeenCalledWith("Please enter valid credentials");
  expect(dispatchSpy).toHaveBeenCalledWith(loginFailed());
});

test("Dispatches loginSuccess to Redux store after successful admin login", () => {
  const dispatchSpy = jest.spyOn(bevStore, "dispatch");
  fireEvent.change(screen.getByTestId("username-input"), {
    target: { value: "admin123" },
  });

  fireEvent.change(screen.getByTestId("password-input"), {
    target: { value: "admin123" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Login" }));
  expect(dispatchSpy).toHaveBeenCalledWith(loginSuccess());
  dispatchSpy.mockRestore();
});
