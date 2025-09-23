import { render } from "@testing-library/react";
import AdminLogin from "../AdminLogin";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import bevStore from "../../utils/ReduxStore/BevStore";

//test case 1
test("Should the heading component is render", () => {
  render(
    <Provider store={bevStore}>
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    </Provider>
  );
});
