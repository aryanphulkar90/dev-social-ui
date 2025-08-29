import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addAllConnections: (state, action) => {
      return action.payload;
    },
    addConnection: (state,action) => {
      state.push(action.payload)
      return state
    },
    removeAllConnections: () => {
      return null;
    }
  },
});

export const {addAllConnections, addConnection, removeAllConnections} = connectionSlice.actions;

export default connectionSlice.reducer;