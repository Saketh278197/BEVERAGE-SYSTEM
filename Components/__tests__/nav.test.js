import { Provider } from "react-redux";
import Navbar from "../NavBar";
import bevStore from "../../utils/ReduxStore/BevStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";

test("Should load with Home link", () => {
  render(
    <BrowserRouter>
      <Provider store={bevStore}>
        <Navbar />
      </Provider>
    </BrowserRouter>
  );
  const HomeLink = screen.getByRole("link", { name: "Home" });
  expect(HomeLink).toBeInTheDocument();
});

test("should load with Queue Link", () => {
  render(
    <BrowserRouter>
      <Provider store={bevStore}>
        <Navbar />
      </Provider>
    </BrowserRouter>
  );
  const QueueLink = screen.getByRole("link", { name: "Queue" });
  expect(QueueLink).toBeInTheDocument();
});

test("Should have 🍹BeverageApp", () => {
  render(
    <BrowserRouter>
      <Provider store={bevStore}>
        <Navbar/>
      </Provider>
    </BrowserRouter>
  );
  const heading = screen.getByRole("heading",{name:"🍹BeverageApp"});
  expect(heading).toBeInTheDocument();
});
