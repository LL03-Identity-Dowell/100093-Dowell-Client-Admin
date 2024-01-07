import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { toast } from "react-toastify";

const Form1 = () => {
  const [formInputs, setFormInputs] = useState({
    public_count: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);
  const userName = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id == "public_count") {
      const inputValue = parseInt(e.target.value, 10);
      // Allow positive numbers only
      if (!isNaN(inputValue) && inputValue >= 0) {
        setValue(inputValue);
        setFormInputs({ ...formInputs, [e.target.id]: inputValue });
      }
    } else {
      setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      username: userName,
      present_org: userName,
      public_count: formInputs.public_count,
    };

    try {
      console.log(data);
      await axios
        .post(
          "https://100093.pythonanywhere.com/api/create_public_member/",
          data
        )
        .then((res) => {
          if (res.status === 201) {
            toast.success(res.statusText);
            // window.location.reload();
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
  const viewAccess = useSelector((state: RootState) => state.viewAccess);
  const [publicAccess, setPublicAccess] = useState(null);
  useEffect(() => {
    if (viewAccess !== null) {
      setPublicAccess(viewAccess[2]["Portfolio Management"]["rights"]);
    }
  }, [viewAccess]);
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  return (
    <>
      <div className="lg:w-1/3 border border-[#54595F] card-shadow">
        <i
          id="publictext4"
          className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] m-5 flex flex-col items-center"
        >
          Invite PUBLIC to my organisation
        </i>
        <form className="px-[30px] mb-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              id="publictext5"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              Number of Public Links needed now
            </label>
            <input
              type="number"
              placeholder="Number"
              id="public_count"
              min={1}
              value={value}
              onChange={handleOnChange}
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label
              id="publictext6"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              Create automatically if less than
            </label>
            <select
              id="publicselect1"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            >
              <option>5 </option>
              <option> 10 </option>
              <option>25 </option>
              <option>50 </option>
              <option>100 </option>
              <option>500 </option>
              <option>1000 </option>
            </select>
          </div>
          <button
            id="publictext7"
            disabled={isLoading || publicAccess === "View"}
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
            {" "}
            {isLoading ? "loading..." : "Create Public Invitation Link"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Form1;
