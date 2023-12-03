import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { toast } from "react-toastify";
import { getsetting } from "../../../store/slice/setting";

interface Portfolio {
  username: string[];
  member_type: string;
  product: string;
  data_type: string;
  operations_right: string;
  role: string;
  security_layer: string;
  portfolio_name: string;
  portfolio_code: string;
  portfolio_specification: string;
  portfolio_uni_code: string;
  portfolio_details: string;
  status: string;
}
interface UserManagement {
  [key: string]: {
    rights: string;
    portfolios: Portfolio[];
  };
}

const Settingform10 = () => {
  const initialArray: UserManagement[] = [
    {
      "User Management": {
        rights: "View",
        portfolios: [],
      },
    },
    {
      "Member Management": {
        rights: "View",
        portfolios: [],
      },
    },
    {
      "Portfolio Management": {
        rights: "View",
        portfolios: [],
      },
    },
  ];

  const Allportfolios = useSelector(
    (state: RootState) => state.adminData.data[0].portpolio
  );
  const selectedPortfolios = Allportfolios.filter(
    (portfolio) =>
      portfolio.member_type == "user" || portfolio.member_type == "team_member"
  );
  const currentSetting = useSelector((state: RootState) => state.setting?.data);
  const process_settings = useSelector(
    (state: RootState) => state.setting.data?.processes_to_portfolio
  );
  const dispatch = useDispatch();
  const mergedArrayOfObjects = (): UserManagement[] => {
    const updatedArray: UserManagement[] = [];
    initialArray.forEach((obj) => updatedArray.push({ ...obj }));
    process_settings.forEach((obj: any) => {
      if (obj !== undefined) {
        const key = Object.keys(obj)[0];
        const index = updatedArray.findIndex(
          (item) => Object.keys(item)[0] === key
        );
        if (index !== -1) {
          updatedArray[index][key] = obj[key];
        } else {
          updatedArray.push(obj);
        }
      }
    });
    return updatedArray;
  };

  const [process, setProcess] =
    useState<UserManagement[]>(mergedArrayOfObjects);
  const [processValue, setProcessValue] = useState<string>(
    Object.keys(process[0])[0]
  );
  const [rightValue, setRightValue] = useState<string>("");
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const adminusername = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );
  const [isLoading, setIsLoading] = useState(false);

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
          process: process,
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
              processes_to_portfolio: process,
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
  useEffect(() => {
    const selectedObject = process.find(
      (obj) => Object.keys(obj)[0] === processValue
    );
    if (selectedObject) {
      setRightValue(selectedObject[processValue].rights);
      setPortfolio(selectedObject[processValue].portfolios);
    }
  }, [processValue, process]);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setProcessValue(selectedValue);
  };
  const handleRightsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRightsValue = event.target.value;
    setRightValue(newRightsValue);

    const updatedArrayOfObjects = process.map((obj) => {
      const key = Object.keys(obj)[0];
      if (key === processValue) {
        return {
          [key]: {
            ...obj[key],
            rights: newRightsValue,
          },
        };
      }
      return obj;
    });
    console.log({ updatedArrayOfObjects });
    setProcess(updatedArrayOfObjects);
  };
  const handlePortfoliosChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPortfolioCodes = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    const selectedPortfoliostemp = selectedPortfolios.filter((portfolio) =>
      selectedPortfolioCodes.includes(JSON.stringify(portfolio))
    );
    setPortfolio(selectedPortfoliostemp);

    const updatedArrayOfObjects = process.map((obj) => {
      const key = Object.keys(obj)[0];
      if (key === processValue) {
        return {
          [key]: {
            ...obj[key],
            portfolios: selectedPortfoliostemp,
          },
        };
      }
      return obj;
    });

    setProcess(updatedArrayOfObjects);
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
        Set Client Admin processes to selected portfolios
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
            Process
          </label>
          <select
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            aria-label="Default select example"
            value={processValue}
            onChange={handleSelectChange}
          >
            {process.map((obj) => (
              <option key={Object.keys(obj)[0]} value={Object.keys(obj)[0]}>
                {Object.keys(obj)[0]}
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
            onChange={handleRightsChange}
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
            value={portfolio.map((portfolio) => JSON.stringify(portfolio))}
            onChange={handlePortfoliosChange}
          >
            {selectedPortfolios.map((portfolio) => {
              return (
                <option value={JSON.stringify(portfolio)}>
                  {portfolio.portfolio_name}, {portfolio.role},{" "}
                  {portfolio.data_type}
                </option>
              );
            })}
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
