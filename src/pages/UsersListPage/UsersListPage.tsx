import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IUser } from "../../models/IUser";
import { RootState, AppDispatch } from "../../store";
import { fetchUsers } from "./UsersListSlice";

const UsersListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const users: IUser[] = useSelector((state: RootState) => state.users.users);
  console.log(users);

  return <div>UsersListPage</div>;
};

export default UsersListPage;
