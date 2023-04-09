import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Select, Modal, SelectProps } from "antd";
import { nanoid } from "nanoid";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { userCreated } from "../../pages/UsersListPage/UsersListSlice";
import { useFirebase } from "../../hooks/firebase.hook";
import { IUser } from "../../models/IUser";
import { workBordersArr } from "../../resources/data";
import "./UserForm.css";

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const generateId = () => {
  const id = nanoid(8);
  return id;
};

type FormValues = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

const UserForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userValues: IUser | null = location.state || null;

  useEffect(() => {
    if (userValues) {
      setArrWorkBorders(userValues.arrWorkBorders);
      setArrRole(userValues.arrRole);
    }
  }, []);

  console.log(userValues);

  const { writeUserData, deleteUserData } = useFirebase();

  const [isSend, setIssend] = useState<boolean>(false);
  const [arrRole, setArrRole] = useState(["ANT"]);
  const [arrWorkBorders, setArrWorkBorders] = useState([
    workBordersArr[0].name,
  ]);

  const dispatch = useDispatch();

  const handleChangeRole = (value: string[]) => {
    setArrRole(value);
  };

  const handleChangeWorkBorders = (value: string[]) => {
    setArrWorkBorders(value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "onBlur" });

  const onSubmit = handleSubmit((data) => {
    let user: IUser;
    userValues
      ? (user = { ...data, arrRole, arrWorkBorders, id: userValues.id })
      : (user = user = { ...data, arrRole, arrWorkBorders, id: generateId() });
    console.log(user);
    reset({
      firstName: "",
      lastName: "",
      password: "",
      username: "",
    });
    setArrRole(["ANT"]);
    setArrWorkBorders([workBordersArr[0].name]);
    setIssend(true);
    writeUserData(user);
    dispatch(userCreated(user));
  });

  const handleOk = () => {
    setIssend(false);
  };
  return (
    <>
      <Modal
        title="Спасибо!"
        open={isSend}
        onOk={handleOk}
        closable={false}
        style={{ textAlign: "center" }}
        cancelButtonProps={{ style: { display: "none" } }}
        afterClose={() => {
          if (userValues) {
            navigate("/");
          }
        }}
      >
        <CheckCircleTwoTone style={{ fontSize: "50px" }} />
        <p>{userValues ? "Данные обновлены" : "Пользователь добавлен"}</p>
        <NavLink to="/">На главную</NavLink>
      </Modal>
      <div className="UserForm-container">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 3,
                message: "Минимально 3 символов",
              },
            })}
            defaultValue={userValues?.username}
            placeholder="Имя пользователя"
          />
          {errors?.username && (
            <span className="form_errorMessage">{errors.username.message}</span>
          )}

          <input
            type="text"
            {...register("password", {
              required: "Установите пароль",
              minLength: {
                value: 4,
                message: "Минимально 4 символа",
              },
            })}
            placeholder="Пароль"
            defaultValue={userValues?.password}
          />
          {errors?.password && (
            <span className="form_errorMessage">{errors.password.message}</span>
          )}

          <input
            {...register("firstName", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Минимально 2 символа",
              },
            })}
            defaultValue={userValues?.firstName}
            placeholder="Имя"
          />
          {errors?.firstName && (
            <span className="form_errorMessage">
              {errors.firstName.message}
            </span>
          )}
          <input
            {...register("lastName")}
            placeholder="Фамилия"
            defaultValue={userValues?.lastName}
          />
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Выберите должность"
            value={arrRole}
            onChange={handleChangeRole}
            options={
              [
                { label: "Специалист", value: "ANT" },
                { label: "Менеджер", value: "ANT_MANAGER" },
                { label: "Руководитель", value: "ANT_OFFICER" },
                { label: "Разрабочик", value: "DEVELOPER" },
              ] as SelectProps["options"]
            }
          />
          {!arrRole.length ? (
            <span className="form_errorMessage">Выберите должность</span>
          ) : null}

          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Выберите город"
            value={arrWorkBorders}
            onChange={handleChangeWorkBorders}
            options={workBordersArr.map((el) => {
              return { label: el.name, value: el.name };
            })}
          />
          {!arrWorkBorders.length ? (
            <span className="form_errorMessage">Выберите город</span>
          ) : null}
          <input
            value={
              userValues
                ? "Обновить информацию о пользователе"
                : "Создать пользователя"
            }
            type="submit"
            disabled={
              arrRole.length === 0 || !isValid || arrWorkBorders.length === 0
            }
            className="btn btn-danger"
          />
          {userValues ? (
            <>
              <Link to={"/"} className="">
                <button className="btn btn-danger userForm-btn">
                  Вернуться к списку
                </button>
              </Link>
              <button
                className="btn btn-danger userForm-btn"
                type="button"
                onClick={() => {
                  deleteUserData(userValues.id);
                  setIssend(true);
                }}
              >
                Удалить пользователя
              </button>
            </>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default UserForm;
