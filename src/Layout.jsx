"use client";
import { useState } from "react";
import { Drawer, Button,  } from "antd";
import {
  FaBars,
  FaCog,
  FaSignOutAlt,
  FaClipboardCheck,
} from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import "./global.css";
import { logoutUser } from "./store/slices/user";
import { useTheme } from "./context/ThemeContext";
import { DrawerData } from "./lib/constant.jsx";
import { NavLink } from "react-router";
import Footer from "./components/Footer.jsx";
import { QuestionCircleOutlined } from "@ant-design/icons";

const Layout = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleHandler } = useTheme();

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const userConfirmation = async () => {
    const res = await Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#1677ff",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes",
    });
    return res.isConfirmed;
  };

  return (
    <>
      <div className="layout-wrapper">
        <div className={theme ? "navbar-wrapper-light" : "navbar-wrapper-dark"}>
          <div className={theme ? "logo-light" : "logo-dark"}>
            <FaClipboardCheck />
            TMS
          </div>
          <Button type="none" className="drawer-btn" onClick={showDrawer}>
            <FaBars />
          </Button>

          <Drawer
            width={250}
            onClose={onClose}
            title={
              <div className="drawer-title">
                <FaClipboardCheck />
                <span>TMS</span>
              </div>
            }
            placement="left"
            open={open}
            className="custom-drawer"
          >
            <div className="drawer-menu">
              <p>Menu</p>
              {DrawerData.map((item, index) => (
                <NavLink
                  onClick={onClose}
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "nav-link-active" : ""
                  }
                >
                  <Button type="none" className="drawer-btn-link">
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </Button>
                </NavLink>
              ))}
            </div>
            <div className="drawer-others">
              <p>Others</p>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link-active" : ""
                }
                to="/setting"
                onClick={onClose}
              >
                <Button
                  type="none"
                  icon={<FaCog />}
                  className="drawer-btn-link"
                >
                  Settings
                </Button>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link-active" : ""
                }
                to="/helptms"
                onClick={onClose}
              >
                <Button
                  type="none"
                  icon={<QuestionCircleOutlined />}
                  className="drawer-btn-link"
                >
                  Help
                </Button>
              </NavLink>

              <Button
                type="none"
                icon={<FaSignOutAlt />}
                className="drawer-btn-link logout"
                onClick={async () => {
                  const confirmed = await userConfirmation();
                  if (confirmed) {
                    dispatch(logoutUser());
                    navigate("/");
                  }
                }}
              >
                Logout
              </Button>
            </div>
          </Drawer>
        </div>
        <div className="main-container">
          <div className="outlet-container">
            <Outlet />
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
