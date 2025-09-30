import { useDispatch, useSelector } from "react-redux";
import UserDetails from "./UserDetails";
import "../style/Queue.css";
import {
  moveToBeingMixQueue,
  moveToReadyQueue,
  moveToCollected,
} from "../utils/ReduxStore/BevSlice";

const Nothing = () => {};

const Queue = () => {
  const dispatch = useDispatch();
  const { inTheQueue, mixingQueue, readyQueue } = useSelector(
    (state) => state.Beverage
  );

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const queueStages = [
    {
      title: "IN THE QUEUE",
      orders: inTheQueue,
      action: moveToBeingMixQueue,
    },
    {
      title: "BEING MIXED",
      orders: mixingQueue,
      action: moveToReadyQueue,
    },
    {
      title: "READY TO COLLECT",
      orders: readyQueue,
      action: moveToCollected,
    },
  ];

  return (
    <div className="queue">
      <center>
        <h2>BEVERAGE QUEUE</h2>
        {isAdmin && (
          <p className="note">
            <b>You are currently viewing as an admin</b>
          </p>
        )}
      </center>

      <div className="QueueContainer">
        {queueStages.map(({ title, orders, action }) => (
          <UserDetails
            key={title}
            title={title}
            order={orders}
            onClickCard={isAdmin ? (o) => dispatch(action(o)) : Nothing}
          />
        ))}
      </div>
    </div>
  );
};

export default Queue;
