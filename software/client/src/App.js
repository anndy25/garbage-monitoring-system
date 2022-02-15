import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Overview from "./components/Overview";
import { UserInfoProvider } from "./contexts/UserInfoContext";
import AdminPage from "./pages/AdminPage";
import Project from "./components/Project";

const App = () => {
  return (
    <>
      <UserInfoProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={<Navigate replace to="/admin/overview" />}
            />
            <Route
              path="/admin"
              element={<Navigate replace to="/admin/overview" />}
            />
            <Route path="/admin" element={<AdminPage />}>
              <Route path="overview" element={<Overview />} />
              <Route path="project/:id" element={<Project />} />
            </Route>
          </Route>
        </Routes>
      </UserInfoProvider>
    </>
  );
};

export default App;
