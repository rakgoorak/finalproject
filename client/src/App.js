import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layout
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { currentUser } from "./components/functions/auth";
import { useDispatch } from "react-redux";
import { login } from "./components/store/userSlice";
import ResponsiveAppBar from "./components/layout/ResponsiveAppBar";

// Pages
import Homepage from "./components/pages/Homepage";
import Product from "./components/pages/Product";
import Shop from "./components/pages/Shop";
import NotFound404 from "./components/pages/NotFound404";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import CheckOut from "./components/pages/CheckOut";

// Admin
import Dashboard from "./components/pages/admin/Dashborad";
import ManageUser from "./components/pages/admin/ManageUser";
import CreateCategory from "./components/pages/admin/category/CreateCategory";
import UpdateCategory from "./components/pages/admin/category/UpdateCategory";
import CreateProduct from "./components/pages/admin/product/CreateProduct";
import UpdateProduct from "./components/pages/admin/product/UpdateProduct";
import PageProduct from "./components/pages/admin/product/PageProduct";
import Order from "./components/pages/admin/Order";

// User
import { HomePagesUser } from "./components/pages/users/HomePagesUser";
import Wishlist from "./components/pages/users/Wishlist";
import History from "./components/pages/users/History";
import Profileuser from "./components/Profileuser";

// Routes
import AdminRoute from "./components/routes/AdminRoute";
import UserRoute from "./components/routes/UserRoute";
import Cart from "./components/pages/Cart";

// pagehome
import Review from "./components/pagehome/Review";
import Aboutus from "./components/pagehome/Aboutus";
import Contact from "./components/pagehome/Contact";
import Reviewproductpage from "./components/pagehome/Reviewproductpage";
import Reviewserviewpage from "./components/pagehome/Reviewservicepage";
import Footer from "./components/pagehome/Footer";
import CreateAddress from "./components/address/CreateAddress";
import AddressList from "./components/address/GetAddress";
import EditUserAddress from "./components/address/EditAddress";

function App() {
    const dispatch = useDispatch();
    const idToken = localStorage.getItem("token");

    currentUser(idToken)
        .then((res) => {
            console.log(res.data);
            dispatch(
                login({
                    name: res.data.username,
                    role: res.data.role,
                    user_id: res.data._id,
                    token: idToken,
                })
            );
        })
        .catch((err) => console.log(err));

    return (
        <BrowserRouter>
            <CssBaseline />
            <ToastContainer />
            <Routes>
                {/* Registers and Login Routes */}
                <Route path="*" element={<NotFound404 />} />
                <Route
                    path="/"
                    element={
                        <>
                            <ResponsiveAppBar />
                            <Homepage />
                        </>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                {/* Other Routes */}
                <Route path="/product/:id" element={<Product />} />
                <Route
                    path="/shop"
                    element={
                        <>
                            <ResponsiveAppBar />
                            <Shop />
                        </>
                    }
                />
                <Route
                    path="/review"
                    element={
                        <>
                            <ResponsiveAppBar />
                            <Review />
                        </>
                    }
                />
                <Route
                    path="/aboutus"
                    element={
                        <>
                            <ResponsiveAppBar />
                            <Aboutus />
                        </>
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <>
                            <ResponsiveAppBar />
                            <Contact />
                        </>
                    }
                />
                <Route
                    path="/review/การทำงาน"
                    element={
                        <>
                            <ResponsiveAppBar />
                            <Reviewproductpage />
                        </>
                    }
                />
                <Route
                    path="/review/การให้บริการ"
                    element={
                        <>
                            <ResponsiveAppBar />
                            <Reviewserviewpage />
                        </>
                    }
                />

                {/* User */}
                <Route
                    path="/user/profileuser"
                    element={
                        <UserRoute>
                            <Profileuser />
                        </UserRoute>
                    }
                />
                <Route
                    path="/user/address"
                    element={
                        <UserRoute>
                            <CreateAddress />
                        </UserRoute>
                    }
                />
                <Route
                    path="/user/address/list"
                    element={
                        <UserRoute>
                            <AddressList />
                        </UserRoute>
                    }
                />
                <Route
                    path="/user/address/editAddress"
                    element={
                        <UserRoute>
                            <EditUserAddress />
                        </UserRoute>
                    }
                />
                <Route
                    path="/user/index"
                    element={
                        <UserRoute>
                            <HomePagesUser />
                        </UserRoute>
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <UserRoute>
                            <CheckOut />
                        </UserRoute>
                    }
                />
                <Route
                    path="/user/wishlist"
                    element={
                        <UserRoute>
                            <Wishlist />
                        </UserRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <UserRoute>
                            <Cart />
                        </UserRoute>
                    }
                />
                <Route
                    path="/user/history"
                    element={
                        <UserRoute>
                            <History />
                        </UserRoute>
                    }
                />
                {/* Admin Routes */}
                <Route
                    path="/admin/viewtable"
                    element={
                        <AdminRoute>
                            <PageProduct />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/create-product"
                    element={
                        <AdminRoute>
                            <CreateProduct />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/update-product/:id"
                    element={
                        <AdminRoute>
                            <UpdateProduct />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/product"
                    element={
                        <AdminRoute>
                            <PageProduct />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/create-category"
                    element={
                        <AdminRoute>
                            <CreateCategory />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/update-category/:id"
                    element={
                        <AdminRoute>
                            <UpdateCategory />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/manage"
                    element={
                        <AdminRoute>
                            <ManageUser />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/index"
                    element={
                        <AdminRoute>
                            <Dashboard />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/orders"
                    element={
                        <AdminRoute>
                            <Order />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/edit/:id"
                    element={
                        <AdminRoute>
                            <UpdateProduct />
                        </AdminRoute>
                    }
                />
            </Routes>
            <div className="Footercontact">
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;