import { FC, ReactNode, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { IworkBordersArr } from "../../models/IworkBorders";
import { workBordersArr } from "../../resources/data";
import { Select } from "antd";
import type { SelectProps } from "antd";
import "./UserForm.css";

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

type FormValues = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

const UserForm: FC = () => {
  const [arrRole, setArrRole] = useState(["ANT"]);
  const [arrWorkBorders, setArrWorkBorders] = useState([
    workBordersArr[0].name,
  ]);

  const handleChangeRole = (value: string[]) => {
    setArrRole(value);
  };

  const handleChangeWorkBorders = (value: string[]) => {
    setArrWorkBorders(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "onBlur" });

  const onSubmit = handleSubmit((data) => {
    console.log({ ...data, arrRole, arrWorkBorders });
  });

  const workBordersSelect: ReactNode[] = workBordersArr.map((el) => {
    return (
      <option value={el.name} key={el.id}>
        {el.name}
      </option>
    );
  });

  return (
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
        // disabled
        style={{ width: "100%" }}
        placeholder="Please select"
        defaultValue={["ANT"]}
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

      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Please select"
        defaultValue={[workBordersArr[0].name]}
        onChange={handleChangeWorkBorders}
        options={workBordersArr.map((el) => {
          return { label: el.name, value: el.name };
        })}
      />

      <input
        type="submit"
        disabled={
          arrRole.length === 0 || !isValid || arrWorkBorders.length === 0
        }
        className="btn btn-danger"
      />
    </form>
  );
};

export default UserForm;
