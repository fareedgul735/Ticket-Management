"use client";
import { useState } from "react";
import { Drawer, Button, Switch } from "antd";
import {
    FaBars,
    FaCog,
    FaSignOutAlt,
    FaThLarge,
    FaUserTie,
    FaBuilding,
    FaClipboardCheck,
    FaMoon,
    FaSun,
} from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import "./global.css"
import { logoutUser } from "./store/slices/user";


const Layout = () => {
    const [toggle, setToggle] = useState(false)
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    const handlerToggle = () => {
        setToggle(!toggle)
    }

    return (
        <>
            <div className="navbar-wrapper">
                <div className="logo">
                    <FaClipboardCheck />
                    Taskly
                </div>
                <Button type="none" className="drawer-btn" onClick={showDrawer}>
                    <FaBars />
                </Button>

                <Drawer
                    width={250}
                    onClose={onClose}
                    title={<div>
                        <FaClipboardCheck />
                        <span>Taskly</span>
                    </div>}
                    placement="left"
                    open={open}
                    className="custom-drawer"
                >
                    <div className="drawer-menu">
                        <p>Menu</p>
                        <Link to="/dashboard" onClick={onClose}>
                            <Button type="none" icon={<FaThLarge />} className="drawer-btn-link">
                                Dashboard
                            </Button>
                        </Link>
                        <Link to="/employee" onClick={onClose}>
                            <Button type="none" icon={<FaUserTie />} className="drawer-btn-link">
                                Employee
                            </Button>
                        </Link>
                        <Link to="/organization" onClick={onClose}>
                            <Button type="none" icon={<FaBuilding />} className="drawer-btn-link">
                                Organization
                            </Button>
                        </Link>
                    </div>
                    <div className="drawer-others">
                        <p>Others</p>
                        <div className="theme">
                            <Button icon={toggle ? <FaSun /> : <FaMoon />}>
                                {toggle ? "Light Mode" : "Dark Mode"}
                                <Switch checked={toggle} onChange={handlerToggle} />
                            </Button>

                        </div>
                        <Link to="/settings" onClick={onClose}>
                            <Button type="none" icon={<FaCog />} className="drawer-btn-link">
                                Settings
                            </Button>
                        </Link>
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
