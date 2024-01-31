import React, { useEffect, useState } from 'react';
import SideBar from '../layout/SideBar';
import HeaderBar from '../layout/HeaderBar';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { currentAdmin } from '../functions/auth';
import NotFound404 from '../pages/NotFound404';

const AdminRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [pass, setpass] = useState(false);

    useEffect(() => {
        if (user && user.user.token) {
            currentAdmin(user.user.token)
                .then((res) => {
                    setpass(true)
                    // Perform actions with the response if needed
                })
                .catch((err) => {
                    console.log(err)
                    setpass(false)
                });
        }
    }, [user]);

    return pass ? (
        <div className="Admincentercontent">
            <div className="Adminapp">
                <SideBar />
                <main className="Admincontent">
                    <HeaderBar />
                    <div className="Admincontent_body">
                        <Box m="20px">
                            {children}
                        </Box>
                    </div>
                </main>
            </div>
        </div>
    ) : <NotFound404 />
};

export default AdminRoute;
