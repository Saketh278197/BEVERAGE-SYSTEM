import { useDispatch, useSelector } from "react-redux";
import UserDetails from "./UserDetails";
import "../style/Queue.css";
import {
  moveToBeingMixQueue,
  moveToReadyQueue,
  moveToCollected,
} from "../utils/ReduxStore/BevSlice";

const Queue = () => {
  const { inTheQueue, mixingQueue, readyQueue } = useSelector(
    (state) => state.Beverage
  );

  const dispatch = useDispatch();
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const Nothing = () => {};
  return (
    <div className="queue">
      <center>
        <h2>BEVERAGE QUEUE</h2>
        {!isAdmin && (
          <p className="note">
            (You are viewing as a <strong>Customer</strong>. Only Admin can
            manage the queue.)
          </p>
        )}
      </center>

      <div className="QueueContainer">
        <UserDetails
          title={"IN THE QUEUE"}
          order={inTheQueue}
          onClickCard={
            isAdmin ? (o) => dispatch(moveToBeingMixQueue(o)) : Nothing
          }
        />
        <UserDetails
          title={"BEING MIXED"}
          order={mixingQueue}
          onClickCard={isAdmin ? (o) => dispatch(moveToReadyQueue(o)) : Nothing}
        />
        <UserDetails
          title={"READY TO COLLECT"}
          order={readyQueue}
          onClickCard={isAdmin ? (o) => dispatch(moveToCollected(o)) : Nothing}
        />
      </div>
    </div>
  );
};
export default Queue;