import { Route, Routes } from "react-router";
import Dashboard from "./pages/dashboard/Dashboard";
import Organization from "./pages/orgnaization/Organization";
import OrganizationForm from "./pages/orgnaization/OrganizationForm";
import User from "./pages/user/User";
import UserForm from "./pages/user/UserForm";
import NonAuth from "./layout/NonAuth";
import Auth from "./layout/Auth";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Layout from "./Layout";
import Setting from "./pages/setting/Setting";
import Tasks from "./pages/tasks/Tasks";
import AddTasks from "./pages/tasks/AddTasks";
import ApiReferences from "./Resources/api/ApiReferences";
import Documentation from "./Resources/documentation/Documentation";
import Support from "./Resources/support/Support";
import Help from "./pages/help/Help";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<NonAuth />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/api_references" element={<ApiReferences />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/support" element={<Support />} />
            <Route path="/organization">
              <Route index element={<Organization />} />
              <Route path="form" element={<OrganizationForm />} />
            </Route>
            <Route path="/employee">
              <Route index element={<User />} />
              <Route path="form" element={<UserForm />} />
            </Route>
            <Route path="/setting" element={<Setting />} />
            <Route path="/helptms" element={<Help />} />
            <Route path="/tasks">
              <Route index element={<Tasks />} />
              <Route path="addTasks" element={<AddTasks />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
