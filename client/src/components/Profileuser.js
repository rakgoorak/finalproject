import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Input } from "antd";
import { resetPasswordUser, getUserName, listAddress } from "./functions/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditUserAddress from "./address/EditAddress";

const Profileuser = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [username, setUserName] = useState({});
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUserName(user.user.token);
    }, []);

    useEffect(() => {
        if (user.user.token) {
            loadData();
        }
    }, [user.user.token]);

    const loadData = () => {
        listAddress(user.user.token, user.user.user_id)
            .then((res) => {
                console.log("res", res);
                const responseData = res.data;

                if (Array.isArray(responseData)) {
                    setAddresses(responseData);
                } else {
                    console.error("Invalid response format. Expected an array.");
                    setError("มีข้อผิดพลาดเกิดขึ้นเกี่ยวกับที่อยู่");
                }

                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching addresses:", err);
                setError("มีข้อผิดพลาดเกิดขึ้นเกี่ยวกับที่อยู่");
                setLoading(false);
            });
    };

    const loadUserName = () => {
        getUserName(user.user.token)
            .then((res) => {
                setUserName(res.data);
            })
            .catch((error) => {
                console.error("Error fetching username:", error);
            });
    };

    const showPasswordModal = () => {
        setIsPasswordModalVisible(true);
    };

    const handlePasswordOk = () => {
        setIsPasswordModalVisible(false);

        if (newPassword !== confirmPassword) {
            toast.error("รหัสผ่านไม่ตรงกัน โปรดลองอีกครั้ง");
            setNewPassword("");
            setConfirmPassword("");
            return;
        }

        resetPasswordUser(user.user.token, user.user.user_id, { password: newPassword })
            .then((res) => {
                console.log(res);
                loadUserName();
                toast.success("รหัสผ่านได้รับการเปลี่ยนแปลงเรียบร้อยแล้ว!");
            })
            .catch((err) => {
                console.error("Error resetting password:", err);
                toast.error("มีข้อผิดพลาดเกิดขึ้นในขณะที่เปลี่ยนรหัสผ่าน");
            });
    };

    const handlePasswordCancel = () => {
        setIsPasswordModalVisible(false);
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <div>
                        <div className="card profile-card">
                            <div className="card-body">
                                <h5 className="card-title">โปรไฟล์ผู้ใช้</h5>
                                <p>ชื่อผู้ใช้: {username.username}</p>
                                <div className="d-flex flex-column align-items-start">
                                    <Button onClick={showPasswordModal}>เปลี่ยนรหัสผ่าน</Button>
                                </div>
                            </div>
                        </div>
                        <div className="card" style={{ marginBottom: '50px' }}>
                            <div className="card-body">
                                <EditUserAddress loadData={loadData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="เปลี่ยนรหัสผ่าน"
                visible={isPasswordModalVisible}
                onOk={handlePasswordOk}
                onCancel={handlePasswordCancel}
                okText="ตกลง"
                cancelText="ยกเลิก"
            >
                <Input
                    type="password"
                    placeholder="รหัสผ่านใหม่"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input
                    style={{ marginTop: '10px' }}
                    type="password"
                    placeholder="ยืนยันรหัสผ่านใหม่"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default Profileuser;
