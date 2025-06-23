import { Route, Routes } from "react-router";
import "./App.css";
import AdminForm from "./pages/adminForm/AdminForm";
import Dashboard from "./pages/dashboard/Dashboard";
import Organization from "./pages/orgnaization/Organization";
import OrganizationForm from "./pages/orgnaization/OrganizationForm";
import User from "./pages/user/User";
import UserForm from "./pages/user/UserForm";
import NonAuth from "./layout/NonAuth";
import Auth from "./layout/auth";


function App() {
  return (
    <>
      <Routes>
        <Route element={<Auth />}>
          <Route path="/admin/form" element={<AdminForm />} />
        </Route>
        <Route element={<NonAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/organization">
            <Route index element={<Organization />} />
            <Route path="form" element={<OrganizationForm />} />
          </Route>
          <Route path="/user">
            <Route index element={<User />} />
            <Route path="form" element={<UserForm />} />
          </Route>
        </Route>
      </Routes>

    </>
  );
}

export default App;
