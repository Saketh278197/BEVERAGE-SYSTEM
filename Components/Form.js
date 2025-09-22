import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToInQueue } from "../utils/ReduxStore/BevSlice";
import "../style/form.css";
import useBeverageMenu from "../CustomHooks/useBeverageMenu";

const Form = () => {
  const menu = useBeverageMenu();
  const [name, setName] = useState("");
  const [beverage, setBeverage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [detailsMissMatch, setDetailsMissMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const submit = (e) => {
    e.preventDefault();
    if (!name && !beverage) {
      setErrorMessage("Please Enter Your Name And Selected Beverage ! ");
      setShowModal(false);
      setDetailsMissMatch(true);
      setTimeout(() => {
        setDetailsMissMatch(false);
      }, 3000);
      return;
    } else if (!name) {
      setErrorMessage("Please Enter Your Name ! ");
      setShowModal(false);
      setDetailsMissMatch(true);
      setTimeout(() => {
        setDetailsMissMatch(false);
      }, 3000);
      return;
    } else if (!beverage) {
      setErrorMessage("Please Enter Your Selected Beverage ! ");

      setShowModal(false);
      setDetailsMissMatch(true);
      setTimeout(() => {
        setDetailsMissMatch(false);
      }, 3000);
      return;
    }
    dispatch(addToInQueue({ id: Date.now(), name: name, Drink: beverage }));
    setShowModal(true);
    setName("");
    setBeverage("");
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
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
                {menu.map((NameOfDrink) => (
                  <option key={NameOfDrink.id} value={NameOfDrink.name}>
                    {NameOfDrink.name}
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
      {detailsMissMatch && (
        <div className="MissMatch-alert">
          <p>{errorMessage}</p>
        </div>
      )}
      {showModal && (
        <div className="custom-alert">
          <p> Order Submitted Successfully! </p>
        </div>
      )}
    </div>
  );
};
export default Form;