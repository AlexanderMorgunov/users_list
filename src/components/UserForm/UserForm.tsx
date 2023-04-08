import { FC, ReactNode, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { IworkBordersArr } from "../../models/IworkBorders";
import { workBordersArr } from "../../resources/data";
import { Select, Modal } from "antd";
import type { SelectProps } from "antd";
import { nanoid } from "nanoid";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { IUser } from "../../models/IUser";
import { useDispatch } from "react-redux";
import {
  userDeleted,
  userCreated,
} from "../../pages/UsersListPage/UsersListSlice";
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
    const user: IUser = { ...data, arrRole, arrWorkBorders, id: generateId() };
    console.log(user);
    reset();
    setArrRole(["ANT"]);
    setArrWorkBorders([workBordersArr[0].name]);
    setIssend(true);
    dispatch(userCreated(user));
  });

  const handleOk = () => {
    setIssend(false);
  };

  const handleCancel = () => {
    setIssend(false);
  };
  // const workBordersSelect: ReactNode[] = workBordersArr.map((el) => {
  //   return (
  //     <option value={el.name} key={el.id}>
  //       {el.name}
  //     </option>
  //   );
  // });

  return (
    <>
      <Modal
        title="Спасибо!"
        open={isSend}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ textAlign: "center" }}
      >
        <CheckCircleTwoTone style={{ fontSize: "50px" }} />
        <p>Пользователь добавлен</p>
        <NavLink to="/">На главную</NavLink>
      </Modal>

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
          placeholder="Имя"
        />
        {errors?.firstName && (
          <span className="form_errorMessage">{errors.firstName.message}</span>
        )}

        <input {...register("lastName")} placeholder="Фамилия" />

        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          // defaultValue={["ANT"]}
          value={arrRole}
          onChange={handleChangeRole}
          options={
            [
              { label: "ANT", value: "ANT" },
              { label: "ANT_MANAGER", value: "ANT_MANAGER" },
              { label: "ANT_OFFICER", value: "ANT_OFFICER" },
              { label: "DEVELOPER", value: "DEVELOPER" },
            ] as SelectProps["options"]
          }
        />
        {!arrRole.length ? (
          <span className="form_errorMessage">Выберите значение</span>
        ) : null}

        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          // defaultValue={[workBordersArr[0].name]}
          value={arrWorkBorders}
          onChange={handleChangeWorkBorders}
          options={workBordersArr.map((el) => {
            return { label: el.name, value: el.name };
          })}
        />
        {!arrWorkBorders.length ? (
          <span className="form_errorMessage">Выберите значение</span>
        ) : null}

        <input
          type="submit"
          disabled={
            arrRole.length === 0 || !isValid || arrWorkBorders.length === 0
          }
          className="btn btn-danger"
        />
      </form>
    </>
  );
};

export default UserForm;
