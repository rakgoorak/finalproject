import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { readProduct, updateProduct } from "../../../functions/product";
import { useParams, useNavigate } from "react-router-dom";
import { listCategory } from "../../../functions/Category";
import { toast } from "react-toastify";
import FileUpload from "./FileUpload";
import { editProductTime } from "../../../functions/user";

const initialstate = {
  id: "",
  name: "",
  detail: "",
  categories: [],
  category: "",
  price: "",
  images: [],
};
const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    readProduct(params.id)
      .then((res) => {
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    listCategory(user.user.token)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateProduct(user.user.token, values._id, values)
      .then((res) => {
        editProductTime(user.user.token, user.user.user_id);
        console.log(res);
        toast.success("อัปเดตสินค้าเรียบร้อยแล้ว");
        setLoading(false);
        navigate("/admin/product");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        toast.error("ไม่สามารถอัปเดตสินค้าได้");
        setLoading(false);
      });
  };

  return (
    <div className="col">
      {loading ? <h1>Loading....</h1> : <h1>อัพเดทสินค้า</h1>}
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
            value={values.category._id}
            required
          >
            <option>โปรดเลือก</option>
            {category.length > 0 &&
              category.map((item) => (
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

export default UpdateProduct;
