import { Provider } from "react-redux";
import Navbar from "../NavBar";
import bevStore from "../../utils/ReduxStore/BevStore";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Navbar - Static Elements", () => {
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

  test("Should load with Queue link", () => {
    const QueueLink = screen.getByRole("link", { name: "Queue" });
    expect(QueueLink).toBeInTheDocument();
  });

  test("Should load with Admin link", () => {
    const AdminLink = screen.getByRole("link", { name: "Admin" });
    expect(AdminLink).toBeInTheDocument();
  });

  test("Should render logo 'BeverageApp'", () => {
    const heading = screen.getByRole("heading", { name: "BeverageApp" });
    expect(heading).toBeInTheDocument();
  });
});

describe("Navbar - Conditional Rendering of History Link", () => {
  test("Should show 'History' link on /queue path", () => {
    render(
      <MemoryRouter initialEntries={["/queue"]}>
        <Provider store={bevStore}>
          <Navbar />
        </Provider>
      </MemoryRouter>
    );
    const history = screen.getByText("History");
    expect(history).toBeInTheDocument();
  });

  test("Should NOT show 'History' link on /admin path", () => {
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Provider store={bevStore}>
          <Navbar />
        </Provider>
      </MemoryRouter>
    );
    const history = screen.queryByText("History");
    expect(history).not.toBeInTheDocument();
  });

  test("Should NOT show 'History' link on root path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={bevStore}>
          <Navbar />
        </Provider>
      </MemoryRouter>
    );
    const history = screen.queryByText("History");
    expect(history).not.toBeInTheDocument();
  });
});
