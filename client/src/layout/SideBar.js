import React, { useState } from "react";
import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarFooter,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Badge } from "@mui/material";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TableViewIcon from '@mui/icons-material/TableView';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
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
                image="/assets/sui.jpg"
                breakPoint="md"
                style={{ height: "100%" }}

            >
                <div
                    style={{ display: "flex", flexDirection: "column", height: "100%" }}
                >
                    <div style={{ flex: 1, marginBottom: "32px" }}>
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
                                        ml="15px"
                                    >
                                        <Typography>J.S POWER ELECTRIC LIMITED PARTNERSHIP</Typography>
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

                            <Link className="menu-bars" to={"/admin/index"}>
                                <MenuItem icon={<HomeOutlinedIcon />}>Dashboard</MenuItem>
                            </Link>

                            <SubMenu icon={<MapOutlinedIcon />} label="Data">
                                <Link to={"/admin/viewtable"} className="menu-bars">
                                    <MenuItem icon={<StoreIcon />}>
                                        {" "}
                                        Store
                                    </MenuItem>
                                </Link>
                            </SubMenu>

                            <SubMenu label="Manage" icon={<PeopleOutlinedIcon />}>
                                <Link to={"/admin/manage"} className="menu-bars">
                                    <MenuItem icon={<AccountCircleIcon />}>User</MenuItem>
                                </Link>
                                <MenuItem icon={<AdminPanelSettingsIcon />}> Admin</MenuItem>
                            </SubMenu>
                        </Menu>
                        <Menu>
                            <MenuItem icon={<ShoppingCartIcon />}>Orders</MenuItem>
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