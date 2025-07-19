"use client";
import { useState } from "react";
import { Drawer, Button, Switch } from "antd";
import {
    FaBars,
    FaCog,
    FaSignOutAlt,
    FaClipboardCheck,
    FaMoon,
    FaSun,
} from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import "./global.css"
import { logoutUser } from "./store/slices/user";
import { useTheme } from "./context/ThemeContext";
import { DrawerData } from "./lib/constant.jsx";
import { NavLink } from "react-router";


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
            <div className={theme?"navbar-wrapper-light":"navbar-wrapper-dark"}>
                <div className={theme?"logo-light":"logo-dark"}>
                    <FaClipboardCheck />
                    TMS
                </div>
                <Button type="none" className="drawer-btn" onClick={showDrawer}>
                    <FaBars />
                </Button>

                <Drawer
                    width={250}
                    onClose={onClose}
                    title={<div className="drawer-title">
                        <FaClipboardCheck />
                        <span>TMS</span>
                    </div>}
                    placement="left"
                    open={open}
                    className="custom-drawer"
                >
                    <div className="drawer-menu">
                        <p>Menu</p>
                     {
                        DrawerData.map((item,index)=>(
                       <NavLink
                       onClick={onClose}
                      key={index}
                      to={item.path}
                      className={({ isActive }) => (isActive ? "nav-link-active" : "")}
                    >
                      <Button type="none" className="drawer-btn-link">
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </Button>
                    </NavLink>

                        ))
                     }

                    </div>
                    <div className="drawer-others">
                        <p>Others</p>
                    <div className="theme">
                      <Button
                        type="none"
                        icon={theme ? <FaMoon /> : <FaSun />}
                        className="drawer-btn-link"
                      >
                        {theme ? "Dark Mode" : "Light Mode"}
                        <Switch  checked={theme} onChange={toggleHandler} />
                      </Button>
                         </div>

                        <NavLink className={({ isActive }) => (isActive ? "nav-link-active" : "")}  to="/settings" onClick={onClose}>
                              <Button type="none" icon={<FaCog />} className="drawer-btn-link">
                                Settings
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
            </div >
            <div className="main-container">
                <div className="outlet-container">
                    <Outlet />
                </div>
            </div>
            <div className="footer">
                Footer
            </div>
        </>
    )
}

export default Layout
