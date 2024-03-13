import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import axios from "axios";
import { useState, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getAdminData } from "../../../store/slice/adminData";
import { Axios93Base } from "../../../api/axios";

const Form1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [levelName, setLevelName] = useState("");
  const dispatch = useDispatch();
  const currentadmindata = useSelector((state: RootState) => state.adminData);
  let userName = useSelector(
    (state: RootState) => state.userinfo?.userinfo?.username
  );

  let getLevelName = useSelector(
    (state: RootState) =>
      state.adminData.data[0]?.organisations[0]?.level1?.level_name
  );

  let getLevelItemLength = useSelector(
    (state: RootState) =>
      state.adminData.data[0]?.organisations[0]?.level1?.items.length
  );
  const isnewOwner = useSelector(
    (state: RootState) => state.adminData.data[0]?.isNewOwner
  );
  if (isnewOwner) {
    getLevelName = useSelector(
      (state: RootState) =>
        state.adminData.data[0]?.organisations[1]?.level1?.level_name
    );
    userName = useSelector(
      (state: RootState) => state.adminData.data[0]?.Username
    );
    getLevelItemLength = useSelector(
      (state: RootState) =>
        state.adminData.data[0]?.organisations[1]?.level1?.items.length
    );
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLevelName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      username: userName,
      level_name: levelName,
      level: "level1",
    };
    try {
      await Axios93Base.post("/update_level_name/", data).then((res) => {
        console.log(res.data);
        setErrMsg("");
        dispatch(
          getAdminData({
            ...currentadmindata,
            data: [
              {
                ...currentadmindata.data[0],
                organisations: [
                  {
                    ...currentadmindata.data[0].organisations[0],
                    level1: {
                      ...currentadmindata.data[0].organisations[0].level1,
                      level_name: levelName,
                    },
                  },
                ],
              },
            ],
          })
        );
        toast.success("success");
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        setErrMsg(error.response?.data);
      } else {
        console.error("An unknown error occurred:", error);
        setErrMsg("An unknown error occurred");
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
          <p id="level1headingtext">{`Level 1 – <${getLevelName}>,`}</p>
          <p id="level1headingtext_counter">{`${getLevelItemLength} – <total enabled items in level 1>`}</p>
        </span>

        <form className="px-[30px] mb-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              id="level1_subheading_1"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              Name for Level 1
            </label>
            <input
              type="text"
              placeholder="Name"
              defaultValue={getLevelName}
              required
              onChange={handleOnChange}
              id="level_name"
              className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>

          <button
            id="level1_subheading_2"
            disabled={isLoading}
            className={`w-full h-12  ${
              isLoading == true
                ? "bg-[#b8b8b8]"
                : color_scheme == "Red"
                ? "bg-[#DC4C64]"
                : color_scheme == "Green"
                ? "bg-[#14A44D]"
                : "bg-[#7A7A7A]"
            } mb-8 hover:bg-[#61CE70] rounded-[4px] text-white font-roboto`}
          >
            Save Name
          </button>
          <p
            id="level1_subheading_3"
            className="text-xs text-[#FF0000] text-center pt-2"
          >
            {errMsg}
          </p>
        </form>
      </div>
    </>
  );
};

export default Form1;
