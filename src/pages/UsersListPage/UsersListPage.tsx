import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IUser } from "../../models/IUser";
import { RootState, AppDispatch } from "../../store";
import { fetchUsers } from "./UsersListSlice";
import UserListItem from "../../components/UserListItem/UserListItem";
import Spinner from "../../components/Spinner/Spinner";
import { Typography, List } from "antd";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { IconContext } from "react-icons";
import { NavLink, useNavigate } from "react-router-dom";
import "./UsersListPage.css";

const { Title } = Typography;

const UsersListPage: FC = () => {
  const navigate = useNavigate();

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

  // const elements = renderUsersList(Object.values(users));

  // return <>{elements}</>;

  const redirectOnFormPage = (user: IUser) => {
    navigate("/UserForm", { state: user });
  };

  return (
    <>
      <NavLink to="UserForm">
        {" "}
        <IconContext.Provider value={{ color: "blue", size: "3em" }}>
          <AiOutlineUserAdd /> Добавить нового пользователя
        </IconContext.Provider>
      </NavLink>
      <h2>Список пользователей:</h2>
      <List
        itemLayout="horizontal"
        dataSource={Object.values(users)}
        renderItem={(item, index) => (
          <List.Item onClick={() => redirectOnFormPage(item)}>
            <List.Item.Meta
              avatar={
                // <AiOutlineUser src={`https://joesch.moe/api/v1/random?key=${index}`} />
                <AiOutlineUser
                // src={`https://joesch.moe/api/v1/random?key=${index}`}
                />
              }
              // title={<a href="https://ant.design">{item.username}</a>}
              title={item.username}
              // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              description={`${item.firstName} ${item?.lastName}  
            ${item.arrRole.toString()}`}
              // onClick={redirectOnFormPage(item.id)}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default UsersListPage;
