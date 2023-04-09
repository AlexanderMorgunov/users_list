import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
};

const LayoutSearchSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterUpdate: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { reducer, actions } = LayoutSearchSlice;

export default reducer;
export const { filterUpdate } = actions;
