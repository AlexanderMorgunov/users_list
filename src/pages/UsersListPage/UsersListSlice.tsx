import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { dataUsers } from "../../resources/data";

export type TypeLoadingStatus = "idle" | "loading" | "error";

export interface IinitialStateUsers {
  users: IUser[];
  usersLoadingStatus: TypeLoadingStatus;
}

const initialState: IinitialStateUsers = {
  users: [
    // {
    //   arrRole: [""],
    //   arrWorkBorders: [""],
    //   firstName: "",
    //   id: "",
    //   lastName: "",
    //   password: "",
    //   username: "",
    // },
  ],
  usersLoadingStatus: "idle",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return dataUsers;
});

const UsersListSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userCreated: (state, action) => {
      state.users.push(action.payload);
    },
    userDeleted: (state, action) => {
      state.users = state.users.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoadingStatus = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersLoadingStatus = "idle";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.usersLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

export const { reducer, actions } = UsersListSlice;

export default reducer;
export const { userCreated, userDeleted } = actions;
