import { useState } from "react";
import InputAddress from "react-thailand-address-autocomplete";

function App(props) {
    const {
        houseNumber,
        setHouseNumber,
        subdistrict,
        setSubDistrict,
        district,
        setDistrict,
        province,
        setProvince,
        zipcode,
        setZipcode,
        onSelect,
        setError
    } = props;
    // const [subdistrict, setSubDistrict] = useState("");
    // const [district, setDistrict] = useState("");
    // const [province, setProvince] = useState("");
    // const [zipcode, setZipcode] = useState("");
    // const [fullAddress, setFullAddress] = useState({});

    // function onSelect(fulladdress) {
    //   const { subdistrict, district, province, zipcode } = fulladdress;
    //   setSubDistrict(subdistrict);
    //   setDistrict(district);
    //   setProvince(province);
    //   setZipcode(zipcode);
    //   setFullAddress(fulladdress);
    // }

    return (
        <div className="address flex flex-col space-y-1">
            <div className="w-full flex justify-center ">
                <textarea
                    style={{ width: '350px', height: '50px', marginBottom: '10px', resize: 'none', outlineStyle: 'none' }}
                    value={houseNumber}
                    onChange={(e) => {
                        setHouseNumber(e.target.value);
                        console.log(houseNumber);

                        setError("");
                    }}
                    className="max-h-12 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                    placeholder="บ้านเลขที่ / อาคาร / ซอย / ถนน"
                />

                {/* <input
          className="max-w-md p-1 px-2 focus:outline-none rounded-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent"
          placeholder="บ้านเลขที่ / อาคาร / ซอย / ถนน"
          style={{ width: "100%" }}
          value={houseNumber}
          onChange={(e) => {
            setHouseNumber(e.target.value);
            setError("");
          }}
        /> */}
            </div>

            <div className="flex justify-center focus:outline-none">
                <InputAddress
                    style={{ width: '350px', height: '50px', marginBottom: '10px', outlineStyle: 'none' }}
                    placeholder="แขวง / ตำบล"
                    address="subdistrict"
                    value={subdistrict}
                    onChange={(e) => {
                        setSubDistrict(e.target.value);
                        setError("");
                    }}
                    onSelect={onSelect}
                />

                <InputAddress
                    style={{ width: '350px', height: '50px', marginBottom: '10px', outlineStyle: "none" }}
                    placeholder="เขต / อำเภอ"
                    address="district"
                    value={district}
                    onChange={(e) => {
                        setDistrict(e.target.value);
                        setError("");
                    }}
                    onSelect={onSelect}
                />
            </div>
            <div className="flex justify-center">
                <InputAddress
                    style={{ width: '350px', height: '50px', marginBottom: '10px', outlineStyle: "none" }}
                    placeholder="จังหวัด"
                    address="province"
                    value={province}
                    onChange={(e) => {
                        setProvince(e.target.value);
                        setError("");
                    }}
                    onSelect={onSelect}
                />

                <InputAddress
                    style={{ width: '350px', height: '50px', marginBottom: '10px', outlineStyle: "none" }}
                    placeholder="เลขไปรษณีย์"
                    address="zipcode"
                    value={zipcode}
                    onChange={(e) => {
                        setZipcode(e.target.value);
                        setError("");
                    }}
                    onSelect={onSelect}
                />
            </div>
        </div>
    );
}

export default App;
