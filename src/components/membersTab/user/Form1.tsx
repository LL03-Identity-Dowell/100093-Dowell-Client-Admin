import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { ToastContainer, toast } from "react-toastify";
import { setAdminData } from "../../../store/slice/adminData";

const Form1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [link, setLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const viewAccess = useSelector((state: RootState) => state.viewAccess);
  const [userAccess, setUserAccess] = useState(null);
  useEffect(() => {
    if (viewAccess !== null) {
      setUserAccess(viewAccess[0]["User Management"]["rights"]);
    }
  }, [viewAccess]);
  const [formInputs, setFormInputs] = useState({
    user_name: "",
    user_code: "",
    user_spec: "",
    user_u_code: "",
    user_det: "",
  });

  const userName = useSelector(
    (state: RootState) => state.adminData.data[0]?.Username
  );
  const user_member_length = useSelector(
    (state: RootState) =>
      state.adminData.data[0]?.members.guest_members?.accept_members.length
  );

  const handleCopyToClipBoard = () => {
    if (link === "") {
      toast.error("Unable to copy link");
    } else {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          setIsCopied(true);
          toast.success("copied");
        })
        .catch((error) => console.error("Error copying link", error));
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };

  const handleOnChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormInputs({ ...formInputs, user_det: e.target.value });
  };
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      username: userName,
      user_name: formInputs.user_name,
      user_code: formInputs.user_code,
      user_spec: formInputs.user_spec,
      user_u_code: formInputs.user_u_code,
      user_det: formInputs.user_det,
    };

    try {
      await axios
        .post("https://100093.pythonanywhere.com/api/create_user_member/", data)
        .then((res) => {
          if (res.status === 201) {
            setErrMsg("");
            toast.success(res.statusText);
            setLink(res.data.link);
          }
        })
        .catch((error) => {
          console.log(error);

          if (error.response) {
            if (error.response?.status === 400) {
              toast.error(error.response?.data.error);
            } else if (error.response.status === 404) {
              toast.error(error.response?.data.error);
            } else if (error.response.status === 500) {
              toast.error(error.response?.data.error);
            }
          } else if (error.message) {
            toast.error(error.message);
          } else {
            toast.error("An unexpected error occurred");
          }
        });
      const responseAdmin = await axios.post(
        "https://100093.pythonanywhere.com/api/get_data/",
        { username: userName }
      );
      dispatch(setAdminData(responseAdmin.data.data[0]));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  return (
    <>
      <ToastContainer position="top-right" />

      <div className="lg:w-1/3 border border-[#54595F] card-shadow">
        <span
          className={`${
            color_scheme == "Red"
              ? "bg-[#DC4C64]"
              : color_scheme == "Green"
              ? "bg-[#14A44D]"
              : "bg-[#7A7A7A]"
          } font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center`}
        >
          <p id="usertext1">Users</p>

          <p>{`<${user_member_length}>`}</p>
        </span>
        <div className="p-[30px]  my-20">
          <i
            id="usertext2"
            className="text-[#FF0000] text-lg font-roboto font-semibold"
          >
            Invite USER to my Workspace
          </i>
        </div>
        <form className="px-[30px]" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              id="usertext3"
              className="text-[#7A7A7A] text-lg font-roboto font-bold flex items-end gap-1"
            >
              User Name
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <input
              type="text"
              placeholder="User name"
              required
              onChange={handleOnChange}
              id="user_name"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold flex items-end gap-1">
              <span id="usertext4">User Code (Unique)</span>
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <input
              type="text"
              placeholder="User code"
              required
              onChange={handleOnChange}
              id="user_code"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label
              id="usertext5"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              User Specifications
            </label>
            <input
              type="text"
              placeholder="User specifications"
              onChange={handleOnChange}
              id="user_spec"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label
              id="usertext6"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              User Universal Code
            </label>
            <input
              type="text"
              placeholder="User universal code"
              onChange={handleOnChange}
              id="user_u_code"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label
              id="usertext7"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              User Details
            </label>
            <textarea
              rows={4}
              placeholder="User details"
              onChange={handleOnChangeTextArea}
              id="user_det"
              className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
            />
          </div>
          <button
            id="usertext8"
            disabled={isLoading || userAccess == "View"}
            className={`w-full h-12  ${
              isLoading == true
                ? "bg-[#b8b8b8]"
                : color_scheme == "Red"
                ? "bg-[#DC4C64]"
                : color_scheme == "Green"
                ? "bg-[#14A44D]"
                : "bg-[#7A7A7A]"
            } hover:bg-[#61CE70] rounded-[4px] text-white font-roboto`}
          >
            {isLoading ? "Loading..." : "Create User Invitation Link"}
          </button>
          {userAccess == "View" && (
            <small id="usertext9" className="text-red-600">
              you have only view access
            </small>
          )}
          <p
            id="usertext10"
            className="text-xs text-[#FF0000] text-center pt-2"
          >
            {errMsg}
          </p>
        </form>

        <div className="px-[30px]">
          <span
            className={`${
              color_scheme == "Red"
                ? "bg-[lightcoral]"
                : color_scheme == "Green"
                ? "bg-[lightgreen]"
                : "bg-[#a1a1a1] "
            } font-roboto text-lg text-white p-6 my-8 font-semibold flex flex-col items-center`}
          >
            <p id="usertext11">User Invitation Link</p>
            <p className="w-full px-6 text-sm truncate">{link}</p>
          </span>

          <button
            id="usertext12"
            disabled={userAccess == "View"}
            className={`w-full ${
              color_scheme == "Red"
                ? "bg-[#DC4C64]"
                : color_scheme == "Green"
                ? "bg-[#14A44D]"
                : "bg-[#7A7A7A]"
            }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
            onClick={handleCopyToClipBoard}
          >
            {isCopied ? "Copied" : "Copy invitation link"}
          </button>
          {userAccess == "View" && (
            <small id="usertext13" className="text-red-600">
              you have only view access
            </small>
          )}
        </div>
        <form className="border-t border-[#FF0000] my-8">
          <div className="px-4 mt-8">
            <label
              id="usertext14"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Email of invitee"
              required
              className="outline-none w-full h-12 px-4 mb-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
            <button
              id="usertext15"
              disabled={userAccess == "View"}
              className={`w-full ${
                color_scheme == "Red"
                  ? "bg-[#DC4C64]"
                  : color_scheme == "Green"
                  ? "bg-[#14A44D]"
                  : "bg-[#7A7A7A]"
              }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
            >
              Send invitation email to selected User
            </button>
            {userAccess == "View" && (
              <small id="usertext16" className="text-red-600">
                you have only view access
              </small>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Form1;
