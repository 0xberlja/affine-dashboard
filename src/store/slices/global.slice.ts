import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  miners: any[];
  last_update: number;
  best: number;
} = {
  miners: [],
  last_update: Date.now() / 1000,
  best: 0,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMiners: (state, action) => {
      state.miners = action.payload;
    },
    setLastUpdate: (state, action) => {
      state.last_update = action.payload;
    },
    setBest: (state, action) => {
      state.best = action.payload;
    },
  },
});

export const { setMiners, setLastUpdate, setBest } = globalSlice.actions;

export default globalSlice.reducer;
