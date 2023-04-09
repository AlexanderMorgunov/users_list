import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IUser } from "../../models/IUser";
import { RootState, AppDispatch } from "../../store";
import { fetchUsers } from "./UsersListSlice";
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
  const filter = useSelector((state: RootState) => state.filter.filter);

  let filteredUser: IUser[];
  if (!filter) {
    filteredUser = users;
  } else {
    filteredUser = Object.values(users).filter((el) =>
      el.username.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  }
  const redirectOnFormPage = (user: IUser) => {
    navigate("/UserForm", { state: user });
  };

  const AddNewUserElement = () => {
    return (
      <NavLink to="UserForm">
        {" "}
        <IconContext.Provider value={{ color: "blue", size: "3em" }}>
          <AiOutlineUserAdd /> Добавить нового пользователя
        </IconContext.Provider>
      </NavLink>
    );
  };

  if (loadingStatus === "loading") {
    return <Spinner />;
  } else if (loadingStatus === "error") {
    return <Title level={2}>Ошибка загрузки</Title>;
  }
  if (!filteredUser) {
    return (
      <>
        <Title level={2}>Список пользователей пуст</Title>
        {AddNewUserElement()}
      </>
    );
  } else {
    return (
      <>
        {AddNewUserElement()}
        <h2>Список пользователей:</h2>
        <List
          itemLayout="horizontal"
          dataSource={Object.values(filteredUser)}
          renderItem={(item, index) => (
            <List.Item onClick={() => redirectOnFormPage(item)}>
              <List.Item.Meta
                avatar={<AiOutlineUser />}
                title={item.username}
                description={`${item.firstName} ${item?.lastName}  
              ${item.arrRole.toString()}`}
              />
            </List.Item>
          )}
        />
      </>
    );
  }
};

export default UsersListPage;
