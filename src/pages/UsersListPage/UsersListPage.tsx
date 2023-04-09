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
  console.log(users);

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

  // const renderUsersList = (users: IUser[]) => {
  if (!users) {
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
  }

  // const elements = renderUsersList(Object.values(users));

  // return <>{elements}</>;
};

export default UsersListPage;
