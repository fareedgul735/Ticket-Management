import { Route, Routes } from "react-router";
import { Suspense, lazy } from "react";
import { Spin } from "antd";
import NotFound from "./NotFound";
import Network from "./Network";

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Organization = lazy(() => import("./pages/orgnaization/Organization"));
const OrganizationForm = lazy(() =>
  import("./pages/orgnaization/OrganizationForm")
);
const User = lazy(() => import("./pages/user/User"));
const UserForm = lazy(() => import("./pages/user/UserForm"));
const NonAuth = lazy(() => import("./layout/NonAuth"));
const Auth = lazy(() => import("./layout/Auth"));
const Signup = lazy(() => import("./pages/signup/Signup"));
const Login = lazy(() => import("./pages/login/Login"));
const Layout = lazy(() => import("./Layout"));
const Setting = lazy(() => import("./pages/setting/Setting"));
const Tasks = lazy(() => import("./pages/tasks/Tasks"));
const AddTasks = lazy(() => import("./pages/tasks/AddTasks"));
const ApiReferences = lazy(() => import("./Resources/api/ApiReferences"));
const Documentation = lazy(() =>
  import("./Resources/documentation/Documentation")
);
const Support = lazy(() => import("./Resources/support/Support"));
const Help = lazy(() => import("./pages/help/Help"));

const App = () => {
  return (
    <>
      <Network />
      <Suspense
        fallback={
          <div
            style={{
              minWidth: "100vw",
              minHeight: "100vh",
              background: "linear-gradient(135deg, #000000, #434343)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin size="large" />
          </div>
        }
      >
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
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
