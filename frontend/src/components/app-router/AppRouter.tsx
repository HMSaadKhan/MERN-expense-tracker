import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAppContext } from "../../context/AppContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import RootPathComponent from "../root-path-component/RootPathComponent";
import PagesLayout from "../pages-layout/PagesLayout";
import Login from "../../pages/LoginPage/Login";
import { routes } from "../../common/routes";
import Home from "../../pages/home/Home";
import AllExpenses from "../../pages/all-expenses/AllExpenses";
import Graphs from "../../pages/graphs/Graphs";
import UpdatePassword from "../../pages/update-password/UpdatePassword";
import ForgotPassword from "../../pages/forgotpassword/ForgotPassword";
import NewPassword from "../../pages/newpassword/NewPassword";
import AllCategories from "../../pages/categories/AllCategories";

function AppRouter() {
  const {
    appState: { isLoggedIn, loading },
    updateAppState,
  } = useAppContext();

  useEffect(() => {
    updateAppState({ loading: true });
    const token = localStorage.getItem("token");
    if (token && !isLoggedIn) {
      updateAppState({ isLoggedIn: true });
    }
    updateAppState({ loading: false });
  }, [isLoggedIn]);

  return (
    <>
      <LoadingScreen loading={loading} />
      <Routes>
        <Route path="/" element={<RootPathComponent />} />
        <Route path={routes.login} element={<Login mode="login" />} />
        <Route path={routes.signUp} element={<Login mode="signUp" />} />
        <Route path="/reset-password" element={<NewPassword />} />
        <Route
          path="/pages"
          element={
            <ProtectedRoute>
              <PagesLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/pages/all-expenses" />} />
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.expenses} element={<AllExpenses />} />
          <Route path={routes.updatePassword} element={<UpdatePassword />} />
          <Route path={routes.graphs} element={<Graphs />} />
          <Route path={routes.forgotPassword} element={<ForgotPassword />} />
          <Route path={routes.category} element={<AllCategories />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter;
