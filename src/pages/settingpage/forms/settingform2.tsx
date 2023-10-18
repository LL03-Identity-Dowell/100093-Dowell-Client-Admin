import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useState, useEffect } from "react";
import { getsetting } from "../../../store/slice/setting";
import axios from "axios";
import { toast } from "react-toastify";

const Settingform2 = () => {
  const maxtime_member = useSelector(
    (state: RootState) => state.setting?.data?.maxtime_member
  );

  const currentSetting = useSelector((state: RootState) => state.setting?.data);

  const [selectedmaxtime_member, setselectedmaxtime_member] =
    useState(maxtime_member);

  const maxtime_member_list = ["70", "120", "180"];
  const [isLoading, setIsLoading] = useState(false);
  const membertime_filterlist = maxtime_member_list.filter(
    (item) => item !== maxtime_member
  );

  const maxtime_user = useSelector(
    (state: RootState) => state.setting?.data?.maxtime_user
  );

  const [selectedmaxtime_user, setselectedmaxtime_user] =
    useState(maxtime_user);
  const maxtime_user_list = ["70", "120", "180"];

  const usertime_filterlist = maxtime_user_list.filter(
    (item) => item !== maxtime_user
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
          timelimit_member: selectedmaxtime_member,
          timelimit_users: selectedmaxtime_user,
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
              maxtime_member: selectedmaxtime_member,
              maxtime_user: selectedmaxtime_user,
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
      <div className="bg-[#CEF9D2] p-3 text-[18px] font-semibold text-[#7A7A7A] border-[1px] border-[#61CE70] border-solid">
        Set time limit for invitation to join; the invitation link will be
        automatically disabled after this limit
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
            Maximum time limit for invitation for Team Member
          </label>
          <select
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            aria-label="Default select example"
            value={selectedmaxtime_member}
            onChange={(e) => setselectedmaxtime_member(e.target.value)}
          >
            <option value={maxtime_member}>{maxtime_member} Hours</option>
            {membertime_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item} Hours
              </option>
            ))}
          </select>
        </div>
        <div className="w-full mb-3">
          <label
            htmlFor=""
            className="text-[18px] font-semibold text-[#7A7A7A]"
          >
            Maximum time limit for invitation for Users
          </label>
          <select
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            value={selectedmaxtime_user}
            onChange={(e) => setselectedmaxtime_user(e.target.value)}
          >
            <option value={maxtime_user}>{maxtime_user} Hours</option>
            {usertime_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item} Hours
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
            {isLoading ? "saving..." : "Set Limit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settingform2;
