import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IUser } from "../../models/IUser";
import { RootState, AppDispatch } from "../../store";
import { fetchUsers } from "./UsersListSlice";
import UserListItem from "../../components/UserListItem/UserListItem";
import Spinner from "../../components/Spinner/Spinner";
import { Typography } from "antd";

const { Title } = Typography;

const UsersListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const users: IUser[] = useSelector((state: RootState) => state.users.users);
  const loadingStatus = useSelector(
    (state: RootState) => state.users.usersLoadingStatus
  );
  console.log(users);

  if (loadingStatus === "loading") {
    return <Spinner />;
  } else if (loadingStatus === "error") {
    return <Title level={2}>Ошибка загрузки</Title>;
  }

  const renderUsersList = (users: IUser[]) => {
    if (users.length === 0) {
      return (
        <>
          <Title level={2}>Список пуст</Title>
        </>
      );
    }
    return users.map(({ ...props }) => {
      return (
        <>
          <UserListItem key={props.id} {...props} />
        </>
      );
    });
  };

  const elements = renderUsersList(users);

  // const elements = users.map(el => {
  //   return(
  //     <>
  //     <UserListItem/>
  //     </>
  //   )
  // })

  // return <div>UsersListPage</div>;

  return <>{elements}</>;
};

export default UsersListPage;
