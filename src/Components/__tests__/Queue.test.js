import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import bevStore from "../../utils/ReduxStore/BevStore";
import Queue from "../Queue";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { addToInQueue,resetQueue } from "../../utils/ReduxStore/BevSlice";

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

test("Should the flow of queues is working?", () => {
  const mockDetails = [{ id: 1, name: "saketh", Drink: "Coke" }];
   bevStore.dispatch(resetQueue());
  bevStore.dispatch(addToInQueue(mockDetails[0]));
  render(
    <BrowserRouter>
      <Provider store={bevStore}>
        <Queue />
      </Provider>
    </BrowserRouter>
  );
  
  const MockUserInQueue = screen.getByText("saketh");
  expect(MockUserInQueue).toBeInTheDocument();
  fireEvent.click(MockUserInQueue);

  const MockUserInMixQueue = screen.getByText("saketh");
  expect(MockUserInMixQueue).toBeInTheDocument();
  fireEvent.click(MockUserInMixQueue);

  const MockUserInReadyQueue = screen.getByText("saketh");
  expect(MockUserInReadyQueue).toBeInTheDocument();
  fireEvent.click(MockUserInReadyQueue);
});
