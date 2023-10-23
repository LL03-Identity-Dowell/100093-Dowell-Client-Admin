import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useState, useEffect } from "react";
import axios from "axios";
import { getsetting } from "../../../store/slice/setting";
import { toast } from "react-toastify";

const Settingform7 = () => {
  const defaultlang = useSelector(
    (state: RootState) => state.setting?.data?.default_language
  );
  const currentSetting = useSelector((state: RootState) => state.setting?.data);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(defaultlang);

  const workspacelist = ["Traditional Chinese", "Spanish", "Hindi", "English"];

  const filterlang = workspacelist.filter((item) => item !== defaultlang);

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
        const data = {
          username: defaultusername,
          selected_language: selectedLanguage,
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
              default_language: selectedLanguage,
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
				Set Language for owner
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
				<div className="w-full mb-3">
					<label
						htmlFor=""
						className="text-[18px] font-semibold text-[#7A7A7A]"
					>
						Languages
					</label>
					<select
						className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
						value={selectedLanguage}
						onChange={(e) => setSelectedLanguage(e.target.value)}
						aria-label="Default select example"
					>
						<option value={defaultlang}>{defaultlang}</option>
						{filterlang.map((item, index) => (
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
						{isLoading ? "saving..." : "Set as default Language for me"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Settingform7;
