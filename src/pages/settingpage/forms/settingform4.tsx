import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useState } from "react";
import { getsetting } from "../../../store/slice/setting";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Axios93Base } from "../../../api/axios";
const Settingform4 = () => {
  const disconn_idle = useSelector(
    (state: RootState) => state.setting?.data?.disconn_idle
  );
  const currentSetting = useSelector((state: RootState) => state.setting?.data);

  const disconn_idlelist = ["30", "45", "10"];

  const filterdisconn_idlelist = disconn_idlelist.filter(
    (item) => item !== disconn_idle
  );

  const permit_to_connect = useSelector(
    (state: RootState) => state.setting?.data?.permit_to_connect
  );

  const permit_to_connectlist = ["30", "45", "90"];

  const filterpermit_to_connectlist = permit_to_connectlist.filter(
    (item) => item !== permit_to_connect
  );

  const no_of_conn = useSelector(
    (state: RootState) => state.setting?.data?.no_of_conn
  );

  const no_of_connlist = ["30", "45", "3"];

  const filterno_of_connlist = no_of_connlist.filter(
    (item) => item !== disconn_idle
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selecteddisconn_idle, setSelecteddisconn_idle] =
    useState(disconn_idle);
  const [selectedno_of_conn, setSelectedno_of_conn] = useState(no_of_conn);
  const [selectedpermit_to_connect, setSelectedpermit_to_connect] =
    useState(permit_to_connect);

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
          time_limit_disconnect: selecteddisconn_idle,
          time_limit_connect: selectedpermit_to_connect,
          permitted_attempts: selectedno_of_conn,
        };

        await Axios93Base.post(
          "/settings/",
          data
        );

        dispatch(
          getsetting({
            isSuccess: true,
            data: {
              ...currentSetting,
              disconn_idle: selecteddisconn_idle,
              permit_to_connect: selectedpermit_to_connect,
              no_of_conn: selectedno_of_conn,
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
        id="settingForm4text1"
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
        Set limit for Connection attempts for Team members and Users in my
        organisation
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
            id="settingForm4text2"
            htmlFor=""
            className="text-[18px] font-semibold text-[#7A7A7A]"
          >
            Disconnect if idle for
          </label>
          <select
            id="settingForm4Select1"
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            aria-label="Default select example"
            value={selecteddisconn_idle}
            onChange={(e) => setSelecteddisconn_idle(e.target.value)}
          >
            <option value={disconn_idle}>{disconn_idle} Minutes</option>
            {filterdisconn_idlelist.map((item, index) => (
              <option key={index} value={item}>
                {item} Minutes
              </option>
            ))}
          </select>
        </div>
        <div className="w-full mb-3">
          <label
            id="settingForm4text3"
            htmlFor=""
            className="text-[18px] font-semibold text-[#7A7A7A]"
          >
            If Disconnected, permit to Connect
          </label>
          <select
            id="settingForm4Select2"
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            aria-label="Default select example"
            value={selectedpermit_to_connect}
            onChange={(e) => setSelectedpermit_to_connect(e.target.value)}
          >
            <option value={permit_to_connect}>
              {permit_to_connect} Minutes
            </option>
            {filterpermit_to_connectlist.map((item, index) => (
              <option key={index} value={item}>
                {item} Minutes
              </option>
            ))}
          </select>
        </div>
        <div className="w-full mb-3">
          <label
            id="settingForm4text4"
            htmlFor=""
            className="text-[18px] font-semibold text-[#7A7A7A]"
          >
            Number of connection attempts permitted
          </label>
          <select
            id="settingForm4Select3"
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            aria-label="Default select example"
            value={selectedno_of_conn}
            onChange={(e) => setSelectedno_of_conn(e.target.value)}
          >
            <option value={no_of_conn}>{no_of_conn} Minutes</option>
            {filterno_of_connlist.map((item, index) => (
              <option key={index} value={item}>
                {item} Minutes
              </option>
            ))}
          </select>
        </div>
        <div className="w-full mb-1">
          <button
            id="settingForm4text5"
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

export default Settingform4;
