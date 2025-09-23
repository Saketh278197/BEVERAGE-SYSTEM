import { Provider } from "react-redux";
import Navbar from "../NavBar";
import bevStore from "../../utils/ReduxStore/BevStore";
import {  MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";

beforeEach(() => {
  render(
    <MemoryRouter>
      <Provider store={bevStore}>
        <Navbar />
      </Provider>
    </MemoryRouter>
  );
});
test("Should load with Home link", () => {
  
  const HomeLink = screen.getByRole("link", { name: "Home" });
  expect(HomeLink).toBeInTheDocument();
});

test("should load with Queue Link", () => {
  const QueueLink = screen.getByRole("link", { name: "Queue" });
  expect(QueueLink).toBeInTheDocument();
});

test("Should have BeverageApp", () => {
  const heading = screen.getByRole("heading", { name: "BeverageApp" });
  expect(heading).toBeInTheDocument();
});


test("Should history visible only on /Queue path",()=>{
  render(
    <MemoryRouter initialEntries={["/queue"]}>
      <Provider store={bevStore}>
        <Navbar/>
      </Provider>
    </MemoryRouter>
  );
  const history = screen.getByText("History");
  expect(history).toBeInTheDocument();
})

test("Should history visible only on /Queue path",()=>{
  render(
    <MemoryRouter initialEntries={["/admin"]}>
      <Provider store={bevStore}>
        <Navbar/>
      </Provider>
    </MemoryRouter>
  );
  const history = screen.queryByRole("History");
  expect(history).not.toBeInTheDocument();
})
