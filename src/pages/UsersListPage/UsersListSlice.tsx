import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { useFirebase } from "../../hooks/firebase.hook";

export type TypeLoadingStatus = "idle" | "loading" | "error";

export interface IinitialStateUsers {
  users: IUser[];
  usersLoadingStatus: TypeLoadingStatus;
}

const initialState: IinitialStateUsers = {
  users: [],
  usersLoadingStatus: "idle",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { getUsers } = useFirebase();
  return await getUsers();
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
