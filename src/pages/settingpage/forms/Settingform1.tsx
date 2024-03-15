import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useEffect, useState } from "react";
import { getsetting } from "../../../store/slice/setting";
import { toast } from "react-toastify";
import { Axios93Base } from "../../../api/axios";

const Settingform1 = () => {
  const allproducts = useSelector(
    (state: RootState) => state.products.products
  );
  const currentSetting = useSelector((state: RootState) => state.setting?.data);
  const [isLoading, setIsLoading] = useState(false);

  const [statusValue, SetstatusValue] = useState(
    currentSetting?.product_status
  );
  const [selectedProduct, SetselectedProduct] = useState(
    currentSetting?.product_name
  );
  const adminusername = useSelector(
    (state: RootState) => state.userinfo?.userinfo?.username
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
        setIsLoading(true);
        const data = {
          username: defaultusername,
          product: selectedProduct,
          status: statusValue,
        };
        await Axios93Base.post("/settings/", data);

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
        toast.success("Success");
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);

      // fetch product
    };

    // Call the API when the component mounts
    postData();

    // Make your API call here using the selectedLanguage value
    // For example:
  };

  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );

  return (
    <div className="form-item">
      <div
        id="settingForm1text1"
        className={`${
          color_scheme == "Red"
            ? "bg-[lightcoral]"
            : color_scheme == "Green"
            ? "bg-[lightgreen]"
            : "bg-[#a1a1a1] "
        } p-3 text-[18px] font-semibold text-white border-[1px] border-[#61CE70] ${
          color_scheme == "Red"
            ? "border-[#DC4C64]"
            : color_scheme == "Green"
            ? "border-[#14A44D]"
            : "border-[#7A7A7A]"
        } border-solid`}
      >
        Enable / Disable Products in my Organisation
      </div>
      <form
        action=""
        className={` p-3 border-[1px] ${
          color_scheme == "Red"
            ? "border-[#DC4C64]"
            : color_scheme == "Green"
            ? "border-[#14A44D]"
            : "border-[#7A7A7A]"
        } border-solid`}
      >
        <div className=" w-full mb-3">
          <label
            id="settingForm1text2"
            htmlFor=""
            className="text-[18px] font-semibold text-[#7A7A7A] "
          >
            Select Product
          </label>
          <select
            id="settingForm1Select1"
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
            id="settingForm1text3"
            htmlFor=""
            className="text-[18px] font-semibold text-[#7A7A7A]"
          >
            Enable / Disable selected product
          </label>
          <select
            id="settingForm1Select2"
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
            id="settingForm1text4"
            onClick={handleSubmit}
            className={`w-full ${
              color_scheme == "Red"
                ? "bg-[#DC4C64]"
                : color_scheme == "Green"
                ? "bg-[#14A44D]"
                : "bg-[#7A7A7A]"
            }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md ${
              isLoading ? "opacity-50" : null
            }`}
          >
            {isLoading ? "saving..." : "Click here to Enable / Disable"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settingform1;
