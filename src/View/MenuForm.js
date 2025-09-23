import Menu from "../Components/beverage_Menu";
import Form from "../Components/Form";
import Navbar from "../Components/NavBar";
import "../style/FirstView.css";
const FormMenuView = () => {
  return (
    <div className="MenuParent">
      <Menu />
      <Form />
    </div>
  );
};

export default FormMenuView;
