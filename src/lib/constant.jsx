import {
  FaBuilding,
  FaClipboardCheck,
  FaThLarge,
  FaUserTie,
} from "react-icons/fa";

export const DB_COLLECTION = {
  USERS: "users",
  ORGANIZATIONS: "organizations",
  TICKETS: "tickets",
};

export const USER_ROLES = {
  ADMIN: "ADMIN",
  EMPLOYEE: "EMPLOYEE",
};

export const DrawerData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FaThLarge />,
  },
  {
    title: "Employee",
    path: "/employee",
    icon: <FaUserTie />,
  },
  {
    title: "Organization",
    path: "/organization",
    icon: <FaBuilding />,
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: <FaClipboardCheck />,
  },
];

export const TICKET_PRIORITIES = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

export const TICKET_STATUSES = [
  { label: "Pending", value: "Pending" },
  { label: "In-Progress", value: "In-Progress" },
  { label: "Completed", value: "Completed" },
  { label: "Rejected", value: "Rejected" },
];
