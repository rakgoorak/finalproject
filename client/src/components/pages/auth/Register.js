import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { register } from "../../functions/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const username = data.get("username");
        const password = data.get("password");

        // Validate username and password
        if (username.includes(" ") || password.includes(" ")) {
            toast.error("ชื่อผู้ใช้และรหัสผ่านไม่สามารถมีช่องว่างได้");
            return;
        }

        const specialChars = /[!#$%^&*(),?":{}|<>]/;
        if (specialChars.test(username)) {
            toast.error("ชื่อผู้ใช้ไม่สามารถมีอักขระพิเศษได้");
            return;
        }
        if (specialChars.test(password)) {
            toast.error("รหัสผ่านไม่สามารถมีอักขระพิเศษได้");
            return;
        }

        const regis = {
            username,
            password,
            confirmPassword: data.get("confirmPassword"),
        };

        // Validate password and confirmPassword
        if (regis.password !== regis.confirmPassword) {
            toast.error("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
            return;
        }

        register(regis)
            .then(res => {
                console.log(res);
                toast.success("ลงทะเบียนสมัครสมาชิกสำเร็จ");
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
                toast.error("การลงทะเบียนไม่สำเร็จ. กรุณาลองอีกครั้ง.");
            });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={false}
                    md={7}
                    sx={{
                        backgroundImage: "url(/assets/logo.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: { xs: "none", md: "block" },
                    }}
                />
                <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            สมัครสมาชิก
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="ชื่อผู้ใช้"
                                name="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="รหัสผ่าน"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="ยืนยันรหัสผ่าน"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="จดจำในระบบ"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                สมัครสมาชิก
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <p>
                                        หากคุณยังไม่ได้เป็นสมาชิก
                                        <Link href="/login" variant="body2" style={{ fontSize: '20px', textDecoration: 'none' }}>
                                            {" เข้าสู่ระบบ"}
                                        </Link>
                                    </p>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

        </ThemeProvider>
    );
}