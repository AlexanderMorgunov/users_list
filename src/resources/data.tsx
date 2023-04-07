import { IworkBordersArr } from "../models/IworkBorders";
import { IUser } from "../models/IUser";

export const workBordersArr: IworkBordersArr[] = [
  { id: "1", name: "Белгатой" },
  { id: "2", name: "Шали" },
  { id: "3", name: "Урус-Мартан" },
];

export const dataUsers: IUser[] = [
  {
    arrRole: ["ANT", "ANT_OFFICER"],
    arrWorkBorders: ["Белгатой", "Шали", "Урус-Мартан"],
    firstName: "Алексей",
    id: "P-xOYAjW",
    lastName: "Федосенко",
    password: "123456",
    username: "Alexey",
  },
  {
    arrRole: ["ANT", "DEVELOPER"],
    arrWorkBorders: ["Белгатой", "Шали"],
    firstName: "Андрей",
    id: "P-xOssda",
    // lastName: "Федосенко",
    password: "678910",
    username: "Andrey",
  },
  {
    arrRole: ["ANT_MANAGER", "ANT_OFFICER"],
    arrWorkBorders: ["Шали", "Урус-Мартан"],
    firstName: "Денис",
    id: "P-xdsfgfdg",
    lastName: "Бородин",
    password: "111213",
    username: "Denis",
  },
];
