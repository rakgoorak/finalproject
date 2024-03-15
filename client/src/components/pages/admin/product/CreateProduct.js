import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/Category";
import FileUpload from "./FileUpload";
import { Spin } from "antd";
import { editProductTime } from "../../../functions/user";
const initialstate = {
  id: "",
  name: "",
  detail: "",
  categories: [],
  category: "",
  price: "",
  images: [],
  state: "Create Product",
};
const CreateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    loadData(user.user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setValues({ ...values, categories: res.data });
        console.log("cate", values);
      })
      .catch((err) => {
        console.log(err);
        toast.error("เกิดข้อผิดพลาดในการสร้างหมวดหมู่");
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the ID already exists
    const isIdDuplicate = values.categories.some(
      (category) =>
        category.products &&
        category.products.some((product) => product.id === values.id)
    );

    if (isIdDuplicate) {
      // Display an error message or handle the duplicate ID case
      toast.error("ID สินค้าซ้ำ กรุณากรอก ID ที่ไม่ซ้ำ");
    } else {
      // Proceed with creating the product if the ID is not duplicate
      createProduct(user.user.token, values)
        .then((res) => {
          editProductTime(user.user.token, user.user.user_id, values);
          toast.success("สร้างสินค้าสำเร็จ");
          navigate("/admin/product");
        })
        .catch((err) => {
          console.log(err);
          toast.error("เกิดข้อผิดพลาดในการสร้างสินค้า");
        });
    }
  };

  return (
    <div>
      {loading ? (
        <h1>
          Loading...
          <Spin />
        </h1>
      ) : (
        <h1>สร้างสินค้า</h1>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <lable>ID สินค้า</lable>
          <input
            className="form-control"
            type="text"
            name="id"
            value={values.id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <lable>ชื่อสินค้า</lable>
          <input
            className="form-control"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <lable>รายละเอียดสินค้า</lable>
          <input
            className="form-control"
            type="text"
            name="detail"
            value={values.detail}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <lable>หมวดหมู่</lable>
          <select
            className="form-control"
            name="category"
            onChange={handleChange}
          >
            <option>Please Select</option>
            {values.categories.length > 0 &&
              values.categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <lable>ราคาสินค้า</lable>
          <input
            className="form-control"
            type="number"
            name="price"
            value={values.price}
            onChange={handleChange}
          />
        </div>
        <FileUpload
          values={values}
          setValues={setValues}
          loading={loading}
          setLoading={setLoading}
        />
        <button className="btn btn-outline-primary">ส่ง</button>
      </form>
    </div>
  );
};

export default CreateProduct;