import React, { useState } from "react";
import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, Badge } from "@mui/material";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
const SideBar = () => {
    const [isCollapsed, setisCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [broken, setBroken] = useState(false);

    return (
        <div
            style={{
                display: "flex",
                height: "100%",
            }}
        >
            <Sidebar
                collapsed={isCollapsed}
                toggled={toggled}
                onBackdropClick={() => setToggled(false)}
                onBreakPoint={setBroken}
                image="/assets/logo.png"
                breakPoint="md"
                style={{ height: "100%" }}

            >
                <div
                    style={{ display: "flex", flexDirection: "column", height: "100%" }}
                >
                    <div style={{ flex: 1, marginTop: "32px" }}>
                        <Menu iconShape="square">
                            {/* LOGO */}
                            <MenuItem
                                onClick={() => setisCollapsed(!isCollapsed)}
                                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                                style={{
                                    margin: "10px 0 20px 0",
                                }}
                            >
                                {!isCollapsed && (
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        ml="85px"
                                    >
                                        <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                                            <MenuOutlinedIcon />
                                        </IconButton>
                                    </Box>
                                )}
                            </MenuItem>
                            {!isCollapsed && (
                                <Box mb="25px">
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <img
                                            alt="profile-user"
                                            width="100px"
                                            height="100px"
                                            src={`/assets/user.jpg`}
                                            style={{ cursor: "pointer", borderRadius: "50%" }}
                                        />
                                    </Box>
                                    <Box textAlign="center">
                                        <Typography sx={{ m: "10px 0 0 0" }}>J.S POWER ELECTRIC</Typography>
                                        <Typography>LIMITED PARTNERSHIP </Typography>
                                    </Box>
                                </Box>
                            )}

                            <Link className="Adminmenu-bars" to={"/admin/index"}>
                                <MenuItem icon={<HomeOutlinedIcon />}>Dashboard</MenuItem>
                            </Link>

                            <SubMenu icon={<MapOutlinedIcon />} label="ข้อมูลสินค้า">

                                <Link to={"/admin/viewtable"} className="Adminmenu-bars"></Link>

                                <Link to={"/admin/create-product"} className="Adminmenu-bars">

                                    <MenuItem icon={<StoreIcon />}>
                                        {" "}
                                        เพิ่มสินค้า
                                    </MenuItem>
                                </Link>
                                <Link to={"/admin/product"} className="Adminmenu-bars">
                                    <MenuItem icon={<InventoryIcon />}>
                                        {" "}
                                        สินค้า
                                    </MenuItem>
                                </Link>
                                <Link to={"/admin/create-category"} className="Adminmenu-bars">
                                    <MenuItem icon={<CategoryIcon />}>
                                        {" "}
                                        หมวดหมู่
                                    </MenuItem>
                                </Link>
                            </SubMenu>

                            <SubMenu icon={<MapOutlinedIcon />} label="การจัดการ">
                                <Link to={"/admin/manage"} className="Adminmenu-bars">
                                    <MenuItem icon={<AccountCircleIcon />}>ผู้ใช้|ผู้ดูแล</MenuItem>
                                </Link>
                                <Link to={"/admin/logmanage"} className="Adminmenu-bars">
                                    <MenuItem icon={<AccountCircleIcon />}>ตรวจสอบการทำงาน</MenuItem>
                                </Link>
                            </SubMenu>
                        </Menu>
                        <Menu>
                            <Link to={"/admin/orders"} className="Adminmenu-bars">
                                <MenuItem icon={<ShoppingCartIcon />}>
                                    แก้ไขประวัติการสั่งซื้อ
                                </MenuItem>
                            </Link>
                        </Menu>
                    </div>
                </div>
            </Sidebar>
            <main>
                <div style={{ padding: "16px 2px ", color: "#44596e" }}>
                    <div style={{ marginBottom: "16px" }}>
                        {broken && (
                            <IconButton onClick={() => setToggled(!toggled)}>
                                <MenuOutlinedIcon />
                            </IconButton>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
export default SideBar;