import { getDatabase, ref, set, child, get, update } from "firebase/database";
import * as firebase from "firebase/app";
import { IUser } from "../models/IUser";

const firebaseConfig = {
  apiKey: "AIzaSyBgQb9uF3SWf_QnIS5v-k5X7uCkj26UpIc",
  authDomain: "userslist-1c90d.firebaseapp.com",
  databaseURL:
    "https://userslist-1c90d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "userslist-1c90d",
  storageBucket: "userslist-1c90d.appspot.com",
  messagingSenderId: "1099049677014",
  appId: "1:1099049677014:web:ed0582bb83a78d8cf91977",
};

firebase.initializeApp(firebaseConfig);

const db = getDatabase();

export const useFirebase = () => {
  function writeUserData({
    id,
    arrRole,
    firstName,
    arrWorkBorders,
    password,
    username,
    lastName,
  }: IUser) {
    set(ref(db, "Users/" + id), {
      id,
      arrRole,
      firstName,
      arrWorkBorders,
      password,
      username,
      lastName,
    });
  }

  const getData = (dataReq: string) => {
    const dbRef = ref(getDatabase());
    const data = get(child(dbRef, dataReq))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return false;
        }
      })
      .catch((error) => {
        return error;
      });
    return data;
  };

  const getUsers = () => getData("/Users");

  return { writeUserData, getUsers };
};
