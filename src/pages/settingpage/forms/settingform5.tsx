import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useEffect, useState } from "react";
import axios from "axios";
import { getsetting } from "../../../store/slice/setting";
import { toast } from "react-toastify";

const Settingform5 = () => {
  const [selectValue, setSelectValue] = useState("Chat");
  const currentSetting = useSelector((state: RootState) => state.setting?.data);
  console.log("settings", currentSetting);
  const chat_method = useSelector(
    (state: RootState) => state.setting?.data?.chat_method
  );
  const uxlivinglab_method = useSelector(
    (state: RootState) => state.setting?.data?.uxlivinglab_method
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedchat_method, setselectedchat_method] = useState([chat_method]);

  const [selecteduxlivinglab_method, setselecteduxlivinglab_method] = useState([
    uxlivinglab_method,
  ]);

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
          notifications: selectValue,
          methods:
            selectValue === "Chat"
              ? typeof selectedchat_method == "string"
                ? selectedchat_method
                : selectedchat_method[0]
              : typeof selecteduxlivinglab_method == "string"
              ? selecteduxlivinglab_method
              : selecteduxlivinglab_method[0],
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
                  uxlivinglab_method:
                    typeof selecteduxlivinglab_method == "object"
                      ? selecteduxlivinglab_method
                      : [selecteduxlivinglab_method],
                  chat_method:
                    typeof selectedchat_method == "object"
                      ? selectedchat_method
                      : [selectedchat_method],
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
				Set Notifications to my email and phone message
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
						Notifications from
					</label>
					<select
						onChange={(e) => {
							setSelectValue(e.target.value);
						}}
						className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
						aria-label="Default select example"
						value={selectValue}
					>
						<option value="Chat">Chat</option>
						<option value="UX Living Lab">UX Living Lab</option>
					</select>
				</div>
				<div className="w-full mb-3">
					<label
						htmlFor=""
						className="text-[18px] font-semibold text-[#7A7A7A]"
					>
						Methods
					</label>
					{selectValue == "Chat" ? (
						<select
							id="meselect"
							className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
							aria-label="Default select example"
							multiple
							onChange={(e) => {
								setselectedchat_method([e.target.value]);
							}}
							value={selectedchat_method}
						>
							<>
								<option value="Email Messages">Email Messages</option>
								<option value="SMS/Text Messages">SMS/Text Messages</option>
							</>
						</select>
					) : (
						<select
							className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
							aria-label="Default select example"
							multiple
							onChange={(e) => setselecteduxlivinglab_method([e.target.value])}
							value={selecteduxlivinglab_method}
						>
							<>
								<option value="Email Messages">Email Messages</option>
								<option value="SMS/Text Messages">SMS/Text Messages</option>
							</>
						</select>
					)}
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
						{isLoading ? "saving..." : "Forward Notifications"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Settingform5;
