import { useSelector } from "react-redux";
import   "../style/Collected.css";
const Collected = () => {
  const { collectedQueue } = useSelector((state) => state.Beverage);
 return (
    <div className="CollectedData" >
      <h1>Collected HISTORY</h1>
      <div className="Collected">
      {collectedQueue.map((o) => (
        <div
          key={o.id}
          className="CollectedUserData"
        >
          <div className="CollectedUser">
            <div className="CollectedDrink">{o.Drink}</div>
          </div>
          <div className="Collectedname">
            <small>{o.name}</small>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};
export default Collected;