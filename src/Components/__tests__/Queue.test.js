import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import bevStore from "../../utils/ReduxStore/BevStore";
import useBeverageMenu from "../../CustomHooks/useBeverageMenu";
import { Nothing } from "../Queue";
import Queue from "../Queue";
import {
  addToInQueue,
  moveToBeingMixQueue,
  moveToCollected,
  moveToReadyQueue,
  resetQueue,
} from "../../utils/ReduxStore/BevSlice";
import UserDetails from "../UserDetails";
import { BrowserRouter } from "react-router-dom";
jest.mock("../../CustomHooks/useBeverageMenu");

beforeEach(() => {
  useBeverageMenu.mockReturnValue([]);
  bevStore.dispatch(resetQueue());
});

test("Renders all primary sections of the Queue component, including 'IN THE QUEUE', 'BEING MIXED', and 'READY TO COLLECT'", () => {
  render(
    <BrowserRouter>
      <Provider store={bevStore}>
        <Queue />
      </Provider>
    </BrowserRouter>
  );
  const heading1 = screen.getByText("BEVERAGE QUEUE");
  const heading2 = screen.getByText("IN THE QUEUE");
  const heading3 = screen.getByText("BEING MIXED");
  const heading4 = screen.getByText("READY TO COLLECT");

  expect(heading1).toBeInTheDocument();
  expect(heading2).toBeInTheDocument();
  expect(heading3).toBeInTheDocument();
  expect(heading4).toBeInTheDocument();
});

test("Does not allow moving a user to the Mixing Queue when the user is not an admin", () => {
  const mockUser = { id: 1, name: "saketh", Drink: "Coke" };

  localStorage.setItem("isAdmin", "false");

  bevStore.dispatch(resetQueue());
  bevStore.dispatch(addToInQueue(mockUser));

  render(
    <Provider store={bevStore}>
      <Queue />
    </Provider>
  );
  expect(screen.getByText("saketh")).toBeInTheDocument();
  expect(screen.getByText("Coke")).toBeInTheDocument();

  const card = screen.getByText("Coke");
  fireEvent.click(card);

  const state = bevStore.getState();
  expect(state.Beverage.inTheQueue.length).toBe(1);
  expect(state.Beverage.mixingQueue.length).toBe(0);
  expect(state.Beverage.readyQueue.length).toBe(0);
});

test("Allows moving a user from the Queue to the Mixing Queue when clicked by an admin", () => {
  const mockUser = { id: 1, name: "saketh", Drink: "Coke" };

  localStorage.setItem("isAdmin", "true");

  bevStore.dispatch(resetQueue());
  bevStore.dispatch(addToInQueue(mockUser));

  render(
    <Provider store={bevStore}>
      <Queue />
    </Provider>
  );
  expect(screen.getByText("saketh")).toBeInTheDocument();
  expect(screen.getByText("Coke")).toBeInTheDocument();

  const card = screen.getByText("Coke");
  fireEvent.click(card);

  const state = bevStore.getState();
  expect(state.Beverage.inTheQueue.length).toBe(0);
  expect(state.Beverage.mixingQueue.length).toBe(1);
  expect(state.Beverage.readyQueue.length).toBe(0);
});

test("Allows moving a user from the Mixing Queue to the Ready Queue when clicked by an admin", () => {
  const mockUser = { id: 1, name: "saketh", Drink: "Coke" };

  localStorage.setItem("isAdmin", "true");

  bevStore.dispatch(resetQueue());
  bevStore.dispatch(moveToBeingMixQueue(mockUser));

  render(
    <Provider store={bevStore}>
      <Queue />
    </Provider>
  );
  expect(screen.getByText("saketh")).toBeInTheDocument();
  expect(screen.getByText("Coke")).toBeInTheDocument();

  const card = screen.getByText("Coke");
  fireEvent.click(card);

  const state = bevStore.getState();
  expect(state.Beverage.inTheQueue.length).toBe(0);
  expect(state.Beverage.mixingQueue.length).toBe(0);
  expect(state.Beverage.readyQueue.length).toBe(1);
});

test("Allows moving a user from the Ready Queue to the Collected Queue when clicked by an admin", () => {
  const mockUser = { id: 1, name: "saketh", Drink: "Coke" };

  localStorage.setItem("isAdmin", "true");

  bevStore.dispatch(resetQueue());
  bevStore.dispatch(moveToReadyQueue(mockUser));

  render(
    <Provider store={bevStore}>
      <Queue />
    </Provider>
  );
  expect(screen.getByText("saketh")).toBeInTheDocument();
  expect(screen.getByText("Coke")).toBeInTheDocument();

  const card = screen.getByText("Coke");
  fireEvent.click(card);

  const state = bevStore.getState();
  expect(state.Beverage.inTheQueue.length).toBe(0);
  expect(state.Beverage.mixingQueue.length).toBe(0);
  expect(state.Beverage.readyQueue.length).toBe(0);
  expect(state.Beverage.collectedQueue.length).toBe(1);
});

test("Displays an admin notification when the user is viewing as an admin", () => {
  localStorage.setItem("isAdmin", "true");

  render(
    <Provider store={bevStore}>
      <Queue />
    </Provider>
  );

  const note = screen.getByText(/You are currently viewing as an admin/i);
  expect(note).toBeInTheDocument();
});

test("Does not display admin notification when the user is not an admin", () => {
  localStorage.setItem("isAdmin", "false");

  render(
    <Provider store={bevStore}>
      <Queue />
    </Provider>
  );

  const note = screen.queryByText(/You are currently viewing as an admin/i);
  expect(note).not.toBeInTheDocument();
});

test("Renders all Queue sections even when there are no users in any queue", () => {
  localStorage.setItem("isAdmin", "true");
  bevStore.dispatch(resetQueue());

  render(
    <Provider store={bevStore}>
      <Queue />
    </Provider>
  );

  expect(screen.getByText("IN THE QUEUE")).toBeInTheDocument();
  expect(screen.getByText("BEING MIXED")).toBeInTheDocument();
  expect(screen.getByText("READY TO COLLECT")).toBeInTheDocument();
});

test("Displays multiple users correctly in the 'IN THE QUEUE' section", () => {
  const users = [
    { id: 1, name: "User A", Drink: "Coke" },
    { id: 2, name: "User B", Drink: "Pepsi" },
  ];
  localStorage.setItem("isAdmin", "false");
  bevStore.dispatch(resetQueue());

  users.forEach((user) => bevStore.dispatch(addToInQueue(user)));

  render(
    <Provider store={bevStore}>
      <Queue />
    </Provider>
  );

  expect(screen.getByText("User A")).toBeInTheDocument();
  expect(screen.getByText("Coke")).toBeInTheDocument();
  expect(screen.getByText("User B")).toBeInTheDocument();
  expect(screen.getByText("Pepsi")).toBeInTheDocument();
});

test("Correctly renders multiple users with identical names and drinks without errors", () => {
  const duplicateUsers = [
    { id: 101, name: "Sam", Drink: "Latte" },
    { id: 102, name: "Sam", Drink: "Latte" },
  ];
  localStorage.setItem("isAdmin", "true");
  bevStore.dispatch(resetQueue());

  duplicateUsers.forEach((user) => bevStore.dispatch(addToInQueue(user)));

  render(
    <Provider store={bevStore}>
      <Queue />
    </Provider>
  );

  const allSams = screen.getAllByText("Sam");
  expect(allSams.length).toBe(2);
});
