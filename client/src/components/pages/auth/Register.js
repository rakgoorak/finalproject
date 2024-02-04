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

// function
import { register } from "../../functions/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
    const navi = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const regis = {
            username: data.get("username"),
            password: data.get("password"),
        };

        register(regis)
            .then(res => {
                console.log(res);
                toast.success("ลงทะเบียนสมัครสมาชิกสำเร็จ"); // Show success message
                navi('/login');
            })
            .catch(err => {
                console.log(err);
                toast.error("การลงทะเบียนไม่สำเร็จ. กรุณาลองอีกครั้ง."); // Show error message
            });
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        // backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundImage: "url(/assets/logo.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5" style={{ marginTop: '200px' }}>
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
                                    <p>หากคุณยังไม่ได้เป็นสมาชิก
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
        </ThemeProvider >
    );
}