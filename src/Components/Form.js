import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToInQueue } from "../utils/ReduxStore/BevSlice";
import "../style/form.css";
import useBeverageMenu from "../CustomHooks/useBeverageMenu";


const Form = () => {
  const menu = useBeverageMenu();
  const [name, setName] = useState("");
  const [beverage, setBeverage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const TIMEOUT = 3000;

  const triggerError = (message) => {
    setErrorMessage(message);
    setShowModal(false);
    setTimeout(() => setErrorMessage(""), TIMEOUT);
  };

  const submit = (e) => {
    e.preventDefault();

    if (!name && !beverage) {
      return triggerError("Please Enter Your Name And Selected Beverage!");
    }
    if (!name) {
      return triggerError("Please Enter Your Name!");
    }
    if (!beverage) {
      return triggerError("Please Enter Your Selected Beverage!");
    }

    dispatch(addToInQueue({ id: Date.now(), name, Drink: beverage }));
    setShowModal(true);
    setName("");
    setBeverage("");

    setTimeout(() => setShowModal(false), TIMEOUT);
  };

  return (
    <div className="form">
      <h3 className="title">ORDER YOUR BEVERAGE</h3>
      <form onSubmit={submit}>
        <div className="form-container">
          <div className="textbox">
            <label className="label">Name</label>
            <input
              className="text"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="SelectBox">
            <label className="label">Beverage</label>
            <div className="select-wrapper">
              <select
                value={beverage}
                className="select"
                onChange={(e) => setBeverage(e.target.value)}
              >
                <option value=""> - Please Select -</option>
                {menu.map((drink) => (
                  <option key={drink.id} value={drink.name}>
                    {drink.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="submit">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>

      {errorMessage && (
        <div className="MissMatch-alert">
          <p>{errorMessage}</p>
        </div>
      )}

      {showModal && (
        <div className="custom-alert">
          <p>Order Submitted Successfully!</p>
        </div>
      )}
    </div>
  );
};

export default Form;
