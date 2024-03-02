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
import { Link } from "react-router-dom";

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LoginIcon from "@mui/icons-material/Login";
import { StarOutlined } from '@ant-design/icons';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { Badge } from "antd";
import Search from "../card/Search";

const product = [
    {
        title: "ผลิตภัณฑ์",
        icon: "",
        to: "/shop",
    },
];
const review = [
    {
        title: "ผลงานการทำงาน",
        icon: "",
        to: "/review",
    },
];
const aboutus = [
    {
        title: "เกี่ยวกับเรา",
        icon: "",
        to: "/aboutus",
    },
];
const contact = [
    {
        title: "ติดต่อเรา",
        icon: "",
        to: "/contact",
    },
];

const cartPage = {
    title: "ตะกร้า",
    icon: <ShoppingCartIcon />,
    to: "/cart",
};
const WishlistPage = {
    title: "สินค้าที่ชอบ",
    icon: <StarOutlined />,
    to: "/user/wishlist",
};
const authen = [
    {
        title: "สมัครสมาชิก",
        icon: <PeopleAltIcon />,
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
        to: "/user/profileuser",
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
            window.location.reload();
        };
        window.addEventListener("cartChange", handleCartChange);
        return () => {
            window.removeEventListener("cartChange", handleCartChange);
        };
    }, [cart.length]);
    console.log(cart.length);

    return (
        <AppBar position="static" style={{ backgroundColor: "#f9a0a1", height: '100%' }}>
            <Container maxWidth="xxl">
                <Toolbar disableGutters>
                    {/* LOGO */}
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
                        <IconButton component={Link} to="/">
                            <Avatar style={{ width: '50px', height: '50px', marginRight: '10px' }} alt="Remy Sharp" src={`/assets/logo.png`} />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: 'Roboto, sans-serif', fontSize: '25px', color: 'inherit', textDecoration: 'none' }}>
                                <Typography variant="h6" style={{ margin: '0', lineHeight: '1' }}>J.S POWERELECTRIC</Typography>
                                <Typography variant="subtitle1" style={{ margin: '0', lineHeight: '1' }}>LIMITED PARTNERSHIP</Typography>
                            </div>
                        </IconButton>
                    </Typography>
                    {/* /LOGO */}

                    {/* Minimize Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
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
                                display: { xs: "block", lg: "none" },
                            }}
                        >
                            {product.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Link to={page.to} style={{ textDecoration: "none" }}>
                                        <Typography textAlign="center">{page.title}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                            {review.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Link to={page.to} style={{ textDecoration: "none" }}>
                                        <Typography textAlign="center">{page.title}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                            {aboutus.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Link to={page.to} style={{ textDecoration: "none" }}>
                                        <Typography textAlign="center">{page.title}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                            {contact.map((page, index) => (
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
                    {/* /Menu Right Full */}

                    {/* LOGO Minimize */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", lg: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                    </Typography>
                    {/* /LOGO Minimize */}

                    {/* Menu Left Full */}
                    <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
                        {product.map((page, index) => (
                            <Link to={page.to}>
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: "white", mr: 5 }}
                                    startIcon={page.icon}
                                >
                                    {page.title}
                                </Button>
                            </Link>
                        ))}
                        {review.map((page, index) => (
                            <Link to={page.to}>
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: "white", mr: 5 }}
                                    startIcon={page.icon}
                                >
                                    {page.title}
                                </Button>
                            </Link>
                        ))}
                        {aboutus.map((page, index) => (
                            <Link to={page.to}>
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: "white", mr: 5 }}
                                    startIcon={page.icon}
                                >
                                    {page.title}
                                </Button>
                            </Link>
                        ))}
                        {contact.map((page, index) => (
                            <Link to={page.to}>
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: "white", mr: 5 }}
                                    startIcon={page.icon}
                                >
                                    {page.title}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {/* /Menu Left Full */}

                    {/* Menu Right Full */}
                    <Box sx={{ flexGrow: 0, display: { xs: "none", lg: "flex" } }}>
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
                                        startIcon={page.icon} // ระบุไอคอนที่นี่
                                    >
                                        {page.title}
                                    </Button>
                                </Link>
                            ))}
                    </Box>
                    {/* /Menu Right Full */}
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
                                    startIcon={WishlistPage.icon} // ระบุไอคอนที่นี่
                                >
                                    {WishlistPage.title}
                                </Button>
                            </Link>
                        )}
                    {
                        user.user.length !== 0 && (
                            <Link to={cartPage.to}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        mr: 2,
                                    }}
                                    startIcon={cartPage.icon} // ระบุไอคอนที่นี่
                                >
                                    <Badge count={cart.length} offset={[9, 0]}>
                                        <a style={{ color: 'white' }}>
                                            {cartPage.title}
                                        </a>
                                    </Badge>
                                </Button>
                            </Link>
                        )}

                    <Box sx={{ flexGrow: 0.2, display: { sx: "flex", lg: "flex" }, float: "right" }}>
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
                                            src="#" // ระบุรูปภาพของผู้ใช้ที่นี่
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
