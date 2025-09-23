import { createSlice } from "@reduxjs/toolkit";
export const beverageslice = createSlice({
  name: "Beverage",
  initialState: {
    inTheQueue: [],
    mixingQueue: [],
    readyQueue: [],
    collectedQueue: [],
  },
  reducers: {
    addToInQueue: (state, action) => {
      state.inTheQueue.push(action.payload);
      console.log(action.payload);
    },
    //first remove orderthat order in the InTheQueue and add to the MixingQueue
    moveToBeingMixQueue: (state, action) => {
      state.inTheQueue = state.inTheQueue.filter(
        (o) => o.id !== action.payload.id
      );
      state.mixingQueue.push(action.payload);
      // const order = state.InTheQueue.shift()
      // state.MixingQueue.push(order);
    },
    //first remove from mixing queue and add to ready queue
    moveToReadyQueue: (state, action) => {
      // const order = state.MixingQueue.shift()
      // state.ReadyQueue.push(order);
      state.mixingQueue = state.mixingQueue.filter(
        (o) => o.id !== action.payload.id
      );
      state.readyQueue.push(action.payload);
    },
    //when user click on the Ready to collect means the user is collected that item so remove from ready to collect
    moveToCollected: (state, action) => {
      state.readyQueue = state.readyQueue.filter(
        (o) => o.id !== action.payload.id
      );
      state.collectedQueue.push(action.payload);
      // state.ReadyQueue.shift();
    },
    resetQueue: (state) => {
      state.inTheQueue = [];
    },
  },
});
export default beverageslice.reducer;
export const {
  addToInQueue,
  moveToBeingMixQueue,
  moveToReadyQueue,
  moveToCollected,
  resetQueue
} = beverageslice.actions;
