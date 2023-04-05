import { FC } from "react";
import { useForm, Resolver } from "react-hook-form";

type FormValues = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

// const resolver: Resolver<FormValues> = async (values) => {
//   return {
//     values: values.firstName ? values : {},
//     errors: !values.firstName
//       ? {
//           firstName: {
//             type: "required",
//             message: "Имя обязательно для заполнения",
//             minLength: {
//               value: 2,
//               message: "Минимально 2 символа",
//             },
//           },
//         }
//       : {},
//   };
// };

// values: values.password ? values : {},
// errors: !values.firstName
//   ? {
//       firstName: {
//         type: "required",
//         message: "Имя обязательно для заполнения",
//         minLength: {
//           value: 2,
//           message: "Минимально 2 символа",
//         },
//       },
//     }
//   : {},
// };
// };

// password: {
//   type: "required",
//   message: "Установите пароль",
//   minLength: {
//     value: 4,
//     message: "Минимально 4 символа",
//   },
// },

const UserForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "onBlur" });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <input
        {...register("username", {
          required: "Поле обязательно для заполнения",
          minLength: {
            value: 3,
            message: "Минимально 3 символов",
          },
        })}
        placeholder="Имя пользователя"
      />
      {errors?.username && <p>{errors.username.message}</p>}

      <input
        {...register("password", {
          required: "Установите пароль",
          minLength: {
            value: 4,
            message: "Минимально 4 символа",
          },
        })}
        placeholder="Пароль"
      />
      {errors?.password && <p>{errors.password.message}</p>}

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
      {errors?.firstName && <p>{errors.firstName.message}</p>}

      <input {...register("lastName")} placeholder="Фамилия" />
      {/* {errors?.lastName && <p>{errors.lastName.message}</p>} */}

      <select
        name="roles "
        id="roles "
        // {...register("roles", {
        //   required: "Поле обязательно для заполнения",
        //   minLength: {
        //     value: 2,
        //     message: "Минимально 2 символа",
        //   },
        // })}
        defaultValue={"ANT"}
      >
        <option value="ANT">ANT</option>
        <option value="ANT_MANAGER">ANT_MANAGER</option>
        <option value="ANT_OFFICER">ANT_OFFICER</option>
        <option value="DEVELOPER">DEVELOPER</option>
      </select>

      <input type="submit" disabled={!isValid} />
    </form>
  );
};

export default UserForm;
