import {
    FaBuilding,
    FaClipboardCheck,
    FaThLarge,
    FaUserTie
} from "react-icons/fa"

export const DB_COLLECTION = {
    USERS: "users",
    ORGANIZATIONS: "organizations"
}

export const USER_ROLES = {
    ADMIN: "ADMIN",
    EMPLOYEE: "EMPLOYEE"
}

export const DrawerData = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: < FaThLarge  />
    },
    {
        title: "Employee",
        path: "/employee",
        icon: < FaUserTie  />
    },
    {
        title: "Organization",
        path: "/organization",
        icon: < FaBuilding  />
    },
    {
        title: "Tasks",
        path: "/tasks",
        icon: < FaClipboardCheck  />
    },

];