import { FC } from "react";
import { IUser } from "../../models/IUser";
import "./UserListItem.css";

const UserListItem: FC<IUser> = ({
  arrRole,
  arrWorkBorders,
  firstName,
  username,
  id,
  lastName,
  password,
}) => {
  return <div>{username}</div>;
};
