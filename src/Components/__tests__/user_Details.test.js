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
jest.mock("../../CustomHooks/useBeverageMenu");

beforeEach(() => {
  useBeverageMenu.mockReturnValue([]);
  bevStore.dispatch(resetQueue());
});

test("Should userDetails loaded on the queue ", () => {
  useBeverageMenu.mockReturnValue([]);
  render(
    <Provider store={bevStore}>
     <Queue/>
    </Provider>
  );
  const heading1 = screen.getByText("IN THE QUEUE");
  const heading2 = screen.getByText("BEING MIXED");
  const heading3 = screen.getByText("READY TO COLLECT");
  expect(heading1).toBeInTheDocument();
  expect(heading2).toBeInTheDocument();
  expect(heading3).toBeInTheDocument();
});

test("should data displaying when component renders", () => {
  const mock_Details = [
    { id: 1, name: "saketh", Drink: "Coke" },
    { id: 2, name: "Gadhamshetti", Drink: "Tea" },
  ];
  render(
    <UserDetails title="IN THE QUEUE" order={mock_Details} onClickCard={null} />
  );
  const userName1 = screen.getByText("saketh");
  expect(userName1).toBeInTheDocument();
  const userName2 = screen.getByText("Gadhamshetti");
  expect(userName2).toBeInTheDocument();
  const Drink1 = screen.getByText("Coke");
  expect(Drink1).toBeInTheDocument();
  const Drink2 = screen.getByText("Tea");
  expect(Drink2).toBeInTheDocument();
});


