import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import axios from "axios";
import { useState, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";

const Form1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [levelName, setLevelName] = useState("");

  const userName = useSelector(
    (state: RootState) => state.userinfo?.userinfo?.username
  );

  const getLevelName = useSelector(
    (state: RootState) =>
      state.adminData.data[0]?.organisations[0]?.level2?.level_name
  );

  const getLevelItemLength = useSelector(
    (state: RootState) =>
      state.adminData.data[0]?.organisations[0]?.level2?.items.length
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLevelName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      username: userName,
      level_name: levelName,
      level: "level2",
    };

    try {
      await axios
        .post("https://100093.pythonanywhere.com/api/update_level_name/", data)
        .then((res) => {
          console.log(res.data);
          setErrMsg("");
          toast.success("success");
          window.location.reload()
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

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="lg:w-1/3 border border-[#54595F] card-shadow">
        <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
          <p>{`Level 2 – <${getLevelName}>,`}</p>
          <p>{`${getLevelItemLength} – <total enabled items in level 2>`}</p>
        </span>

        <form className="px-[30px] mb-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Name for Level 2
            </label>
            <input
              type="text"
              placeholder="Name"
              required
              onChange={handleOnChange}
              id="level_name"
              className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>

          <button
            disabled={isLoading}
            className={`w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto ${
              isLoading ? "hover:bg-[#7a7a7a] opacity-50" : ""
            }`}
          >
            Save Name
          </button>
          <p className="text-xs text-[#FF0000] text-center pt-2">{errMsg}</p>
        </form>
      </div>
    </>
  );
};

export default Form1;
