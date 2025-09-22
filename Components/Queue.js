import { useDispatch, useSelector } from "react-redux";
import UserDetails from "./UserDetails";
import "../style/Queue.css";
import {
  moveToBeingMixQueue,
  moveToReadyQueue,
  moveToCollected,
} from "../utils/ReduxStore/BevSlice";

const Queue = () => {
  const dispatch = useDispatch();

  const { inTheQueue, mixingQueue, readyQueue } = useSelector(
    (state) => state.Beverage
  );

  const queueStages = [
    {
      title: "IN THE QUEUE",
      order: inTheQueue,
      action: moveToBeingMixQueue,
    },
    {
      title: "BEING MIXED",
      order: mixingQueue,
      action: moveToReadyQueue,
    },
    {
      title: "READY TO COLLECT",
      order: readyQueue,
      action: moveToCollected,
    },
  ];

  return (
    <div className="queue">
      <center>
        <h2>BEVERAGE QUEUE</h2>
      </center>

      <div className="QueueContainer">
        {queueStages.map(({ title, order, action }) => (
          <UserDetails
            key={title}
            title={title}
            order={order}
            onClickCard={(orderItem) => dispatch(action(orderItem))}
          />
        ))}
      </div>
    </div>
  );
};

export default Queue;

// import { useDispatch, useSelector } from "react-redux";
// import UserDetails from "./UserDetails";
// import "../style/Queue.css"
// import {
//   moveToBeingMixQueue,
//   moveToReadyQueue,
//   moveToCollected,
// } from "../utils/ReduxStore/BevSlice";
// const Queue = () => {
//   const { inTheQueue, mixingQueue, readyQueue } = useSelector(
//     (state) => state.Beverage
//   );
//   const dispatch = useDispatch();
//   return (
//     <div className="queue">
//       <center>
//         <h2>BEVERAGE QUEUE</h2>
//       </center>

//       <div className="QueueContainer">
//         <UserDetails
//           title={"IN THE QUEUE"}
//           order={inTheQueue}
//           onClickCard={(o) => dispatch(moveToBeingMixQueue(o))}
//         />
//         <UserDetails
//           title={"BEING MIXED"}
//           order={mixingQueue}
//           onClickCard={(o) => dispatch(moveToReadyQueue(o))}
//         />
//         <UserDetails
//           title={"READY TO COLLECT"}
//           order={readyQueue}
//           onClickCard={(o) => dispatch(moveToCollected(o))}
//         />
//       </div>
//     </div>
//   );
// };
// export default Queue;
