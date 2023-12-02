import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useEffect, useState } from "react";
import axios from "axios";
import { getsetting } from "../../../store/slice/setting";
import { toast } from "react-toastify";
const Settingform6 = () => {
  const currentSetting = useSelector((state: RootState) => state.setting?.data);
  const defaultorg = useSelector(
    (state: RootState) => state.setting?.data?.default_org
  );
  const [defaultorgValue, setdefaultorgValue] = useState(defaultorg);
  const organizations = useSelector((state: RootState) => state.org);

  const [isLoading, setIsLoading] = useState(false);
  const [workspacelist, setWorkspacelist] = useState(organizations);
  useEffect(() => {
    setdefaultorgValue(defaultorg);
  }, [defaultorg]);
  useEffect(() => {
    setWorkspacelist(organizations);
  }, [organizations]);

  const filterworkspace = workspacelist.filter(
    (item) => item.orgname !== defaultorgValue
  );
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
        setIsLoading(true);
        const data = {
          username: defaultusername,
          selected_workspace: defaultorgValue,
        };
        console.log({ data });
        await axios
          .post("https://100093.pythonanywhere.com/api/settings/", data)
          .then((res) => {
            console.log(res);
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
				Set default Workspace for me
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
							<option key={index} value={item.orgname}>
								{item.orgname}
							</option>
						))}
					</select>
				</div>

				<div className="w-full mb-1">
					<button
						disabled={isLoading}
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
						{isLoading ? "saving..." : "Set as default Workspace for me"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Settingform6;
