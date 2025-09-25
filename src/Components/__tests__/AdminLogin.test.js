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
test("Should the heading component is render", () => {
  const input = screen.getByText("Admin UserName");
  const password = screen.getByText("Password");
  expect(input).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});

test("Should the input and select box rendered in the document", () => {
  const input = screen.getByTestId("username-input");
  const password = screen.getByTestId("password-input");
  expect(input).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});

test("Should the input and select box rendered in the document", () => {
  const input = screen.getByTestId("username-input");
  const password = screen.getByTestId("password-input");
  expect(input).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});
test("Should the input and password box rendered in the document", () => {
  const input = screen.getByTestId("username-input");
  const password = screen.getByTestId("password-input");
  expect(input).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});

test("Should admin  login form and navigate to BEVERAGE QUEUE pagec after login ", async () => {
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
test("Should admin  login unable to login with wrong username and password  ", () => {
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

test("Should redux store is updating after admin login ", () => {
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
