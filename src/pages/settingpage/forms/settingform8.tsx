import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useEffect, useState } from "react";
import { getloaderstate } from "../../../store/slice/loaderstate";
import axios from "axios";
import { getsetting } from "../../../store/slice/setting";
import { toast } from "react-toastify";

const Settingform8 = () => {
  const currentSetting = useSelector((state: RootState) => state.setting?.data);
  console.log("settings", currentSetting);
  const internet_min_speed = useSelector(
    (state: RootState) => state.setting?.data?.internet_min_speed
  );
  const [internet_min_speed_value, setinternet_min_speed_value] =
    useState(internet_min_speed);
  const [isLoading, setIsLoading] = useState(false);
  const internetspeedlist = ["10 Mbps", "20 Mbps", "40 Mbps"];

  const internetspeedfilter = internetspeedlist.filter(
    (item) => item !== internet_min_speed
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
        setIsLoading(true);
        dispatch(getloaderstate(true));

        const data = {
          username: defaultusername,
          minimum_speed: internet_min_speed_value,
        };

        await axios.post(
          "https://100093.pythonanywhere.com/api/settings/",
          data
        );

        dispatch(
          getsetting({
            isSuccess: true,
            data: {
              ...currentSetting,
              internet_min_speed: internet_min_speed_value,
            },
          })
        );
		toast.success("Success");
        setIsLoading(false);
        dispatch(getloaderstate(false));
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
      <div className="bg-[#CEF9D2] p-3 text-[18px] font-semibold text-[#7A7A7A] border-[1px] border-[#61CE70] border-solid">
        Internet Settings
      </div>
      <form
        action=""
        className="p-3 border-[1px] border-[#61CE70] border-solid"
      >
        <div className="w-full mb-3">
          <label
            htmlFor=""
            className="text-[18px] font-semibold text-[#7A7A7A]"
          >
            Minimum Speed needed
          </label>
          <select
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            aria-label="Default select example"
            value={internet_min_speed_value}
            onChange={(e) => setinternet_min_speed_value(e.target.value)}
          >
            <option value={internet_min_speed}>{internet_min_speed}</option>
            {internetspeedfilter.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mb-3">
          <label
            htmlFor=""
            className="text-[18px] font-semibold text-[#7A7A7A]"
          >
            Number of Speed tests per day
          </label>
          <select
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            aria-label="Default select example"
          >
            <option>No Speed Test</option>
            <option>1 test per day</option>
          </select>
        </div>
        <div className="w-full mb-1">
          <button
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
            {isLoading ? "saving..." : "Set as default Internet Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settingform8;
