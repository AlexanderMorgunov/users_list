import { FC } from "react";
import { useSelector } from "react-redux";
import { IUser } from "../../models/IUser";
import { RootState } from "../../store";

const UsersListPage: FC = () => {
  const users: IUser[] = useSelector((state: RootState) => state.users.users);

  console.log(users);

  return <div>UsersListPage</div>;
};

export default UsersListPage;
