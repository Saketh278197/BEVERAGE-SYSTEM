import ReactDOM from "react-dom/client";
import FormMenuView from "../View/MenuForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BeverageQueue from "../View/BeverageQueue";
import BevStore from "../utils/ReduxStore/BevStore";
import { Provider } from "react-redux";
import Navbar from "./NavBar";
import "../style/NavBar.css";
import "../style/form.css";
import "../style/Media.css";
import ErrorPage from "./Error";
import Collected from "./Collected";

function App() {
  return (
    <Provider store={BevStore}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<FormMenuView />} />
          <Route path="/queue" element={<BeverageQueue />} />
          <Route path="/queue/collected" element={<Collected />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);