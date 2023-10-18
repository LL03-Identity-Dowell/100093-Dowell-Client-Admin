// import { useSelector } from 'react-redux';
// import { RootState } from "../../../store/Store";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getsetting } from "../../../store/slice/setting";
import { RootState } from "../../../store/Store";
import { toast } from "react-toastify";

const Settingform10 = () => {
  const process = useSelector(
    (state: RootState) => state.setting?.data.processes_to_portfolio[0].process
  );
  const processes = [
    "User Management",
    "Portfolio Management",
    "Team Member Management",
  ];

  const rights = useSelector(
    (state: RootState) => state.setting?.data.processes_to_portfolio[0].rights
  );
  const portfolios = Array.from(
    useSelector(
      (state: RootState) =>
        state.setting?.data.processes_to_portfolio[0].portfolios
    )
  );

  const [processValue, setProcessValue] = useState(process);
  const [rightValue, setRightValue] = useState(rights);
  const [portfolio, setPortfolio] = useState(portfolios);

  const adminusername = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );
  const [isLoading, setIsLoading] = useState(false);

  const currentSetting = useSelector((state: RootState) => state.setting?.data);
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
          admin_process: processValue,
          operational_rights: rightValue,
          portfolio_list: portfolio,
        };
        console.log({ data });
        await axios.post(
          "https://100093.pythonanywhere.com/api/settings/",
          data
        );

        dispatch(
          getsetting({
            isSuccess: true,
            data: {
              ...currentSetting,
              processes_to_portfolio: [
                {
                  portfolios: Array.from(portfolio),
                  process: processValue,
                  rights: rightValue,
                },
              ],
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
        Set Client Admin processes to selected portfolios
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
            Process
          </label>
          <select
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            aria-label="Default select example"
            value={processValue}
            onChange={(e) => setProcessValue(e.target.value)}
          >
            {processes.map((process) => (
              <option key={process} value={process}>
                {process}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mb-3">
          <label
            htmlFor=""
            className="text-[18px] font-semibold text-[#7A7A7A]"
          >
            Right
          </label>
          <select
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            aria-label="Default select example"
            value={rightValue}
            onChange={(e) => setRightValue(e.target.value)}
          >
            <option value={"View"}>View</option>
            <option value={"Add/Edit"}>Add/Edit</option>
          </select>
        </div>

        <div className="w-full mb-3">
          <label
            htmlFor=""
            className="text-[18px] font-semibold text-[#7A7A7A]"
          >
            Portfolios
          </label>
          <select
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            aria-label="Default select example"
            multiple
            value={portfolio}
            onChange={(e) => {
              if (portfolio.includes(e.target.value)) {
                const arr = Array.from(portfolio);
                const index = arr.indexOf(e.target.value);
                arr.splice(index, 1);
                setPortfolio(arr);
              } else {
                setPortfolio([...portfolio, e.target.value]);
              }
            }}
          >
            <option value={"Portfolio 1"}>Portfolio 1</option>
            <option value={"Portfolio 2"}>Portfolio 2</option>
            <option value={"Portfolio 3"}>Portfolio 03</option>
            <option value={"Portfolio 4"}>Portfolio 04</option>
          </select>
        </div>
        <div className="w-full mb-1">
          <button
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
            {isLoading
              ? "saving..."
              : "Assign Process management to selected Portfolios"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settingform10;
