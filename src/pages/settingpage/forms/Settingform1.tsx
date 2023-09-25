import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useState } from "react";
import products from "../../../store/slice/products";

const Settingform1 = () => {
  const allproducts = useSelector(
    (state: RootState) => state.products.products
  );
  const [statusValue, SetstatusValue] = useState("enable");
  const [selectedProduct, SetselectedProduct] = useState("");

  return (
    <div className="form-item">
      <div className="bg-[#CEF9D2] p-3 text-[18px] font-semibold text-[#7A7A7A] border-[1px] border-[#61CE70] border-solid">
        Enable / Disable Products in my Organisation
      </div>
      <form
        action=""
        className=" p-3 border-[1px] border-[#61CE70] border-solid"
      >
        <div className=" w-full mb-3">
          <label
            htmlFor=""
            className="text-[18px] font-semibold text-[#7A7A7A] "
          >
            Select Product
          </label>
          <select
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            value={selectedProduct}
            onChange={(e) => SetselectedProduct(e.target.value)}
          >
            <option value={""}>Select Product</option>
            {allproducts.map((item, index) => (
              <option key={index} value={item.product_name}>
                {item.product_name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full mb-3">
          <label
            htmlFor=""
            className="text-[18px] font-semibold text-[#7A7A7A]"
          >
            Enable / Disable selected product
          </label>
          <select
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            aria-label="Default select example"
            value={statusValue}
            onChange={(e) => {
              SetstatusValue(e.target.value);
            }}
          >
            <option value="enable">Enable</option>
            <option value="disable">Disable</option>
          </select>
        </div>
        <div className="w-full mb-1">
          <button className="w-full bg-[#7A7A7A] hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md">
            Click here to Enable / Disable
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settingform1;
