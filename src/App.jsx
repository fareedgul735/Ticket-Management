import { Route, Routes } from "react-router";
import "./App.css";
import AdminForm from "./pages/adminForm/AdminForm";
import Dashboard from "./pages/dashboard/Dashboard";
import Organization from "./pages/orgnaization/Organization";
import OrganizationForm from "./pages/orgnaization/OrganizationForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/form" element={<AdminForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organization">
          <Route index element={<Organization />} />
          <Route path="form" element={<OrganizationForm />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
