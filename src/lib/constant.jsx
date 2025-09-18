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
    title: "Tickets",
    path: "/tasks",
    icon: <FaClipboardCheck />,
  },
];

export const salesData = [
  { date: "1/1/2023", sales: 1200, returns: 200 },
  { date: "1/2/2023", sales: 1800, returns: 300 },
  { date: "1/3/2023", sales: 1500, returns: 150 },
  { date: "1/4/2023", sales: 2000, returns: 250 },
  { date: "1/5/2023", sales: 2200, returns: 400 },
];

export const weeklyData = [
  { week: "W1", netSales: 2.1 },
  { week: "W2", netSales: 2.6 },
  { week: "W3", netSales: 2.0 },
  { week: "W4", netSales: 1.8 },
  { week: "W5", netSales: 1.7 },
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
