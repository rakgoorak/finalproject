import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { ShoppingOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LoginIcon from "@mui/icons-material/Login";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { Badge } from "antd"
import { StarOutlined } from '@ant-design/icons'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Search from "../card/Search";
const shopPage = {
    title: "ผลิตภัตฑ์",
    icon: <ShoppingOutlined />,
    to: "/shop",
};
const cartPage = {
    title: "Cart",
    icon: <ShoppingCartIcon />,
    to: "/cart", // Update with the correct path for your shop
};
const WishlistPage = {
    title: "Wishlist",
    icon: <StarOutlined />,
    to: "/user/wishlist", // Update with the correct path for your shop
};
const pages = [
    {
        title: "ติดต่อเรา",
        icon: "",
        to: "/contract",
    },
];

const authen = [
    {
        title: "สมัครสมาชิก",
        icon: <PeopleAltOutlinedIcon />,
        to: "/register",
    },
    {
        title: "เข้าสู่ระบบ",
        icon: <LoginIcon />,
        to: "/login",
    },
];
const settings = [
    {
        title: "โปรไฟล์",
        icon: "",
        to: "/profile",
    },
    {
        title: "ประวัติการสั่งซื้อ",
        icon: "",
        to: "/user/history",
    },
    {
        title: "ออกจากระบบ",
        icon: "",
        to: "#",
    },
];

function ResponsiveAppBar() {
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(user)

    const handleLogout = () => {
        dispatch(logout());
        handleCloseUserMenu();
        navigate("/");
    };

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    useEffect(() => {
        const handleCartChange = () => {
            // Reload the page when cart length changes
            window.location.reload();
        };

        // Add event listener for changes in the cart length
        window.addEventListener("cartChange", handleCartChange);

        // Remove the event listener on component unmount
        return () => {
            window.removeEventListener("cartChange", handleCartChange);
        };
    }, [cart.length]);


    return (
        <AppBar position="static" style={{ backgroundColor: "#f9a0a1" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* LOGO */}
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <IconButton>
                            <Avatar
                                alt="Remy Sharp"
                                src={`/assets/user.jpg`}
                            />
                        </IconButton>
                    </Typography>
                    {/* /LOGO */}

                    {/* Minimize Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Link to={page.to} style={{ textDecoration: "none" }}>
                                        <Typography textAlign="center">{page.title}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}

                            {user.user.length === 0 &&
                                authen.map((page, index) => (
                                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                                        <Link to={page.to} style={{ textDecoration: "none" }}>
                                            <Typography textAlign="center">{page.title}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>
                    {/* /Minimize Menu */}
                    {/* Add the "Shop" menu item */}
                    <Link to={shopPage.to}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                color: "white",
                                mr: 2,
                            }}
                            startIcon={shopPage.icon}
                        >
                            {shopPage.title}
                        </Button>
                    </Link>
                    {
                        user.user.length !== 0 && (
                            <Link to={WishlistPage.to}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        mr: 2,
                                    }}
                                    startIcon={WishlistPage.icon}
                                >
                                    {WishlistPage.title}
                                </Button>
                            </Link>
                        )}
                    <Link to={cartPage.to}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                color: "white",
                                mr: 2,
                            }}
                            startIcon={cartPage.icon}
                        >
                            <Badge count={cart.length} offset={[9, 0]}>
                                {cartPage.title}
                            </Badge>
                        </Button>
                    </Link>
                    {/* /Menu Right Full */}

                    {/* LOGO Minimize */}
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <IconButton>
                            <Avatar
                                alt="Remy Sharp"
                                src="https://i.pinimg.com/736x/d3/d6/88/d3d688089e9dcb43cf0e5a3e3989ef0f.jpg"
                            />
                        </IconButton>
                    </Typography>
                    {/* /LOGO Minimize */}

                    {/* Menu Left Full */}
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page, index) => (
                            <Link to={page.to}>
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: "white", mr: 5 }}
                                >
                                    {page.title}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {/* /Menu Left Full */}

                    {/* Menu Right Full */}
                    <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                        {user.user.length === 0 &&
                            authen.map((page, index) => (
                                <Link to={page.to}>
                                    <Button
                                        key={index}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: "white",
                                            mr: 2,
                                        }}
                                        startIcon={page.icon}
                                    >
                                        {page.title}
                                    </Button>
                                </Link>
                            ))}
                    </Box>
                    {/* /Menu Right Full */}

                    <Box sx={{ flexGrow: 0.2, display: { xs: "flex", md: "flex" }, float: "right" }}>
                        <Search />
                    </Box>

                    {/* User Menu */}
                    {
                        user.user.length !== 0 && (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="https://1.bp.blogspot.com/-gBFaZsSyZko/WbETftGiwKI/AAAAAAAAI9I/dEH4ueuWHAwDb-O4bbw3xCLJTzpAYqk9gCLcBGAs/s1600/11.jpg"
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting, index) => (
                                        <MenuItem
                                            key={index}
                                            onClick={
                                                setting.title === "ออกจากระบบ"
                                                    ? handleLogout
                                                    : handleCloseUserMenu
                                            }
                                        >
                                            <Link to={setting.to} style={{ textDecoration: "none" }}>
                                                <Typography textAlign="center">
                                                    {setting.title}
                                                </Typography>
                                            </Link>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        )
                    }

                    {/* /User Menu */}
                </Toolbar >
            </Container >
        </AppBar >
    );
}
export default ResponsiveAppBar;