import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useEffect, useState } from "react";
import { getloaderstate } from "../../../store/slice/loaderstate";
import axios from "axios";
import { getsetting } from "../../../store/slice/setting";

const Settingform5 = () => {
  const [selectValue, setSelectValue] = useState("Chat");
  const currentSetting = useSelector((state: RootState) => state.setting?.data);

  const chat_method = useSelector(
    (state: RootState) => state.setting?.data?.chat_method
  );
  const [selectedchat_method, setselectedchat_method] = useState(chat_method);
  console.log("selectedchat_method", selectedchat_method);

  const uxlivinglab_method = useSelector(
    (state: RootState) => state.setting?.data?.uxlivinglab_method
  );

  const [selecteduxlivinglab_method, setselecteduxlivinglab_method] =
    useState(uxlivinglab_method);
  console.log("selecteduxlivinglab_method", selecteduxlivinglab_method);

  const dispatch = useDispatch();
  const adminusername = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );

  const [defaultusername, setdefaultusername] = useState(adminusername);
  console.log(defaultusername);
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
          uxlivinglab_method:
            typeof selecteduxlivinglab_method == "object"
              ? selecteduxlivinglab_method
              : [selecteduxlivinglab_method],
          chat_method:
            typeof selectedchat_method == "object"
              ? selectedchat_method
              : [selectedchat_method],
        };
        console.log(data);
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
        Set Notifications to my email and phone message
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
            <option value="UxLiving LAb">UxLiving LAb</option>
          </select>
        </div>
        <div className="w-full mb-3">
          <label
            htmlFor=""
            className="text-[18px] font-semibold text-[#7A7A7A]"
          >
            Methods
          </label>
          <select
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            aria-label="Default select example"
            multiple
            onChange={(e) => {
              selectValue == "Chat"
                ? setselectedchat_method(e.target.value)
                : setselecteduxlivinglab_method(e.target.value);
            }}
            value={
              selectValue == "Chat"
                ? selectedchat_method
                : selecteduxlivinglab_method
            }
          >
            {selectValue == "Chat" ? (
              <>
                <option value="Email Messages">Email Messages</option>
                <option value="SMS/Text Messages">SMS/Text Messages</option>
              </>
            ) : (
              <>
                <option value="Email Messages">Email Messages</option>
                <option value="SMS/Text Messages">SMS/Text Messages</option>
              </>
            )}
          </select>
        </div>
        <div className="w-full mb-1">
          <button
            className="w-full bg-[#7A7A7A] hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md"
            onClick={handleSubmit}
          >
            Forward Notifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settingform5;
