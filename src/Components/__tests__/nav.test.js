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

  test("Verifies that the Navbar renders the Home link on initial load.", () => {
    const HomeLink = screen.getByRole("link", { name: "Home" });
    expect(HomeLink).toBeInTheDocument();
  });

  test("Confirms that the Queue link is present in the Navbar.", () => {
    const QueueLink = screen.getByRole("link", { name: "Queue" });
    expect(QueueLink).toBeInTheDocument();
  });

  test("Ensures that the Admin link is displayed in the Navbar", () => {
    const AdminLink = screen.getByRole("link", { name: "Admin" });
    expect(AdminLink).toBeInTheDocument();
  });

  test("Checks that the Navbar correctly displays the BeverageApp logo.", () => {
    const heading = screen.getByRole("heading", { name: "BeverageApp" });
    expect(heading).toBeInTheDocument();
  });
});

describe("Navbar - Conditional Rendering of History Link", () => {
  test("Confirms the History link is visible when the URL path is /queue.", () => {
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

  test("Verifies that the History link is hidden when the URL path is /admin.", () => {
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

  test("Ensures the History link is not displayed on the root (/) path.", () => {
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
