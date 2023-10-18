import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useState, useEffect } from "react";
import axios from "axios";
import { getsetting } from "../../../store/slice/setting";
import { getloaderstate } from "../../../store/slice/loaderstate";
import { toast } from "react-toastify";

const Settingform11 = () => {
  const currentSetting = useSelector((state: RootState) => state.setting?.data);

  const adminusername = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );
  const [isLoading, setIsLoading] = useState(false);

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
          colour_patterns: selectedColor,
        };

        await axios.post(
          "https://100093.pythonanywhere.com/api/settings/",
          data
        );
        toast.success("Success");
        dispatch(
          getsetting({
            isSuccess: true,
            data: {
              ...currentSetting,
              color_scheme: selectedColor,
            },
          })
        );
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
  const color_schemelist = ["Default", "Green", "Red"];
  const [selectedColor, setSelectedColor] = useState(color_scheme);

  const reorderedColorSchemelist = color_schemelist.includes(color_scheme)
    ? [
        color_scheme,
        ...color_schemelist.filter((color) => color !== color_scheme),
      ]
    : color_schemelist;
  useEffect(() => {
    // Update Redux state when selectedColor changes
    dispatch(
      getsetting({
        isSuccess: true,
        data: {
          ...currentSetting,
          color_scheme: selectedColor,
        },
      })
    );
  }, [selectedColor, dispatch]);

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div className="form-item">
      <div className="bg-[#CEF9D2] p-3 text-[18px] font-semibold text-[#7A7A7A] border-[1px] border-[#61CE70] border-solid">
        Set colour for client admin
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
            Colour Scheme
          </label>
          <select
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            value={selectedColor}
            onChange={handleColorChange}
            aria-label="Default select example"
          >
            {reorderedColorSchemelist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mb-1">
          <button
            className={`w-full ${
              color_scheme == "Red"
                ? "bg-[#DC4C64]"
                : color_scheme == "Green"
                ? "bg-[#14A44D]"
                : "bg-[#7A7A7A]"
            }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md ${
              isLoading ? "opacity-50" : null
            }`}
            onClick={handleSubmit}
          >
            {isLoading ? "saving..." : "Set Colour Scheme"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settingform11;
