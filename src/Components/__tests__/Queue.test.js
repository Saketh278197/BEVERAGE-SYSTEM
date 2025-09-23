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

test("Should have the heading Beverage Queue in the Queue", () => {
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

test("Should NOT move user from inTheQueue to mixingQueue when clicked and not admin", () => {
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

test("Should  move user from inTheQueue to mixingQueue when clicked  admin", () => {
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

test("Should  move user from BeingMixed to Ready to collect when clicked  admin", () => {
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
test("Should  move user from ReadyQueue to Collected Queue when clicked  admin", () => {
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
