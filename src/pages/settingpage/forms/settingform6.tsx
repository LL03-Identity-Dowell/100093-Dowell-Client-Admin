import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useEffect, useState } from "react";
import { getloaderstate } from "../../../store/slice/loaderstate";
import axios from "axios";
import { getsetting } from "../../../store/slice/setting";
const Settingform6 = () => {
  const currentSetting = useSelector((state: RootState) => state.setting?.data);
  console.log("settings", currentSetting);
  const defaultorg = useSelector(
    (state: RootState) => state.setting?.data?.default_org
  );
  const [defaultorgValue, setdefaultorgValue] = useState(defaultorg);
  const workspacelist = ["Workspace 1", "Workspace 2", "noumanhayat"];

  const filterworkspace = workspacelist.filter((item) => item !== defaultorg);
  const dispatch = useDispatch();

  const adminusername = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );
  const [defaultusername, setdefaultusername] = useState(adminusername);

  useEffect(() => {
    setdefaultusername(adminusername);
  }, [adminusername]);
  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const postData = async () => {
      try {
        dispatch(getloaderstate(true));
        const data = {
          username: defaultusername,
          selected_workspace: defaultorgValue,
        };
        console.log({ data });
        await axios
          .post("https://100093.pythonanywhere.com/api/settings/", data)
          .then((res) => {
            console.log(res);
            console.log("response data", res.data);
            dispatch(
              getsetting({
                isSuccess: true,
                data: {
                  ...currentSetting,
                  defaultorg: defaultorgValue,
                },
              })
            );
          });

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
        Set default Workspace for me
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
            Workspace Name
          </label>
          <select
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            aria-label="Default select example"
            value={defaultorgValue}
            onChange={(e) => setdefaultorgValue(e.target.value)}
            placeholder="....Select Workspace Name...."
          >
            <option value={defaultorgValue}>{defaultorgValue}</option>
            {filterworkspace.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mb-1">
          <button
            onClick={handleSubmit}
            className="w-full bg-[#7A7A7A] hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md"
          >
            Set as default Workspace for me
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settingform6;
