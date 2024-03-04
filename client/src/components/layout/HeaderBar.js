import react, { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const HeaderBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        dispatch(logout());
        handleClose();
        navigate("/");
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* search  */}
            <Box display="flex" borderRadius="3px" backgroundColor="#F5EFE7">
            </Box>
            {/* icons */}
            <Box display="flex">
                <IconButton>
                    <PersonOutlinedIcon onClick={handleMenu} />
                    <Menu style={{ marginTop: '30px' }}
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>ออกจากระบบ</MenuItem>
                    </Menu>
                </IconButton>
            </Box>
        </Box>
    );
};

export default HeaderBar;