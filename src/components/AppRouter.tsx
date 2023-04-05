import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "./Spinner/Spinner";
import Layout from "./Layout/Layout";
import UsersListPage from "../pages/UsersListPage/UsersListPage";
import UserFormPage from "../pages/UserFormPage/UserFormPage";

const AppRouter = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UsersListPage />}></Route>
          <Route path="UserForm" element={<UserFormPage />}></Route>
        </Route>
        <Route path="*" element={<Layout />}></Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
