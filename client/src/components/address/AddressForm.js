import Address from "./Autocomplete";

export default function AddressForm(props) {
    const {
        name,
        setName,
        phone,
        setPhone,
        setError,
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
        fullAddress,
        setFullAddress,
        onSelect,
    } = props;

    return (
        <div>
            <div className="name and phone number  flex  max-w-md space-x-0.5">
                <input style={{ width: '350px', height: '50px', marginBottom: '10px', outlineStyle: 'none' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ชื่อผู้รับสินค้า"
                    className=" w-full mb-3 rounded-sm  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent caret-pink-500"
                />
                <input
                    style={{ width: '350px', height: '50px', marginBottom: '10px', outlineStyle: 'none' }}
                    minLength="10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="เบอร์โทร"
                    className="w-full rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                />
            </div>

            <Address
                setError={setError}
                houseNumber={houseNumber}
                setHouseNumber={setHouseNumber}
                subdistrict={subdistrict}
                setSubDistrict={setSubDistrict}
                district={district}
                setDistrict={setDistrict}
                province={province}
                setProvince={setProvince}
                zipcode={zipcode}
                setZipcode={setZipcode}
                fullAddress={fullAddress}
                setFullAddress={setFullAddress}
                onSelect={onSelect}
            />
        </div>
    );
}