import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useEffect, useState } from "react";
import { getloaderstate } from "../../../store/slice/loaderstate";
import axios from "axios";
import { getsetting } from "../../../store/slice/setting";

const Settingform1 = () => {
  const allproducts = useSelector(
    (state: RootState) => state.products.products
  );
  const currentSetting = useSelector((state: RootState) => state.setting?.data);

  const [statusValue, SetstatusValue] = useState(currentSetting.product_status);
  const [selectedProduct, SetselectedProduct] = useState(
    currentSetting.product_name
  );
  const adminusername = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );

  const [defaultusername, setdefaultusername] = useState(adminusername);

  useEffect(() => {
    setdefaultusername(adminusername);
  }, [adminusername]);
  const dispatch = useDispatch();

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const postData = async () => {
      try {
        dispatch(getloaderstate(true));
        const data = {
          username: defaultusername,
          product: selectedProduct,
          status: statusValue,
        };
        console.log(data);
        await axios.post(
          "https://100093.pythonanywhere.com/api/settings/",
          data
        );

        dispatch(
          getsetting({
            isSuccess: true,
            data: {
              ...currentSetting,
              product_name: selectedProduct,
              product_status: statusValue,
            },
          })
        );

        dispatch(getloaderstate(false));
      } catch (error) {
        console.error(error);
      }

      // fetch product
    };

    // Call the API when the component mounts
    postData();

    // Make your API call here using the selectedLanguage value
    // For example:
  };
 
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
            className="product-select w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            value={selectedProduct}
            onChange={(e) => {
              SetselectedProduct(e.target.value);
            }}
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
          <button
            onClick={handleSubmit}
            className="w-full bg-[#7A7A7A] hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md"
          >
            Click here to Enable / Disable
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settingform1;
