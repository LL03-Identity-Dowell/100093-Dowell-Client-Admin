import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Option } from "../../portfolio/types";
import Select from "react-select";

const Form2 = () => {
  const public_member = useSelector(
    (state: RootState) => state.adminData.data[0]?.members.public_members
  );
  const [getUsedAndUnusedData, setUsedAndUnusedData] = useState([]);
  const [getUsedAndUnusedUnassigned, setUsedAndUnusedUnassigned] = useState([]);
  const viewAccess = useSelector((state: RootState) => state.viewAccess);
  const [publicAccess, setPublicAccess] = useState(null);
  useEffect(() => {
    if (viewAccess !== null) {
      setPublicAccess(viewAccess[2]["Portfolio Management"]["rights"]);
    }
  }, [viewAccess]);
  const sessionId = localStorage.getItem("sessionId");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [rangeInput, setRangeInput] = useState<string>("");
  const getUsedAndUnusedLink = async () => {
    const assignedData = {
      session_id: sessionId,
      portfolio_status: "unassigned",
    };

    const unassignedData = {
      session_id: sessionId,
      portfolio_status: "assigned",
    };
    try {
      await axios
        .post(
          "https://100093.pythonanywhere.com/api/get_used_unused_links/",
          assignedData
        )
        .then((res) => {
          setUsedAndUnusedData(res.data);
        });

      await axios
        .post(
          "https://100093.pythonanywhere.com/api/get_used_unused_links/",
          unassignedData
        )
        .then((res) => {
          setUsedAndUnusedUnassigned(res.data);
        });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
      } else {
        console.error("An unknown error occurred:", error);
        toast.error("An unknown error occurred");
      }
    }
  };
  const query: Option[] = getUsedAndUnusedData.map((option) => ({
    value: option,
    label: option,
  }));
  const handleSelectRange = (start: number, end: number) => {
    const allOptions = getUsedAndUnusedData;
    const selectedRange = allOptions.slice(start - 1, end);
    setSelectedItems(selectedRange);
  };
  const handleRangeInput = () => {
    const [startStr, endStr] = rangeInput.split("-").map((str) => str.trim());
    const start = parseInt(startStr);
    const end = parseInt(endStr);

    if (!isNaN(start) && !isNaN(end)) {
      handleSelectRange(start, end);
    }
  };

  const handleSelectAll = () => {
    let allOptions: string[] = [];
    allOptions = getUsedAndUnusedData.map((member) => member) || [];

    const selected: HTMLSelectElement | null = document.getElementById(
      "unassignedPublicLinks"
    ) as HTMLSelectElement;
    Array.from(selected.options).forEach((option) => {
      if (allOptions.includes(option.textContent || "")) {
        option.selected = true;
      }
    });
    setSelectedItems(allOptions);
  };
  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      handleSelectAll();
    } else {
      setSelectedItems([]);
    }
  };
  const handleKeyPress = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRangeInput();
    }
  };
  const handleSearchInputChange = (query: unknown) => {
    if (query) {
      const selectedOptions = (query as Option[]).map((option) => option.value);
      const selected: HTMLSelectElement | null = document.getElementById(
        "unassignedPublicLinks"
      ) as HTMLSelectElement;
      Array.from(selected.options).forEach((option) => {
        if (selectedOptions.includes(option.textContent || "")) {
          option.selected = true;
        }
      });
      setSelectedItems([...selectedOptions]);
    } else {
      setSelectedItems([]);
    }
  };
  useEffect(() => {
    getUsedAndUnusedLink();
  }, []);
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  console.log(selectedItems);
  return (
    <>
      <div className="lg:w-1/3 border border-[#54595F] card-shadow">
        <i
          id="publictext8"
          className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] m-5 flex flex-col items-center"
        >
          Public in my organisation
        </i>
        <form className="px-[30px] mb-8">
          <div className="mb-4">
            <label
              id="publictext9"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              Unused Public Links not having Portfolio
            </label>
            {/* <select
              id="publicselect2"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            >
              <option>...Select...</option>
              {getUsedAndUnusedData?.map((members, index) => (
                <option key={index} value={members}>
                  {members}
                </option>
              ))}
            </select> */}
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                <span id="portfolioForm1Text4">Select links to disable </span>
                <span className="text-[#ff0000] text-base">*</span>
              </label>
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold flex items-center gap-2">
                <span id="portfolioForm1Text5"> Select All</span>
                <input
                  type="checkbox"
                  onChange={handleSelectAllChange}
                  checked={
                    selectedItems.length > 0 &&
                    selectedItems.length === getUsedAndUnusedData.length
                  }
                />
              </label>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="separate numbers with '-'e.g 1-10"
                onChange={(e) => setRangeInput(e.target.value)}
                className="w-full outline-none border border-black mb-[10px] p-2 rounded-[4px]"
                onBlur={handleRangeInput}
                onKeyDown={handleKeyPress}
              />
            </div>

            <div className="mb-4 flex items-center justify-between border border-black rounded-[4px] p-2 gap-2">
              <span id="portfolioForm1Text6" className="font-roboto text-base">
                (Total links: {getUsedAndUnusedData.length})
              </span>
              <Select
                classNames={{
                  control: () => "border border-none shadow-none rounded-md",
                }}
                className="w-full outline-none shadow-none"
                isMulti
                options={query}
                placeholder="Search..."
                onChange={handleSearchInputChange}
              />
            </div>
            <select
              required
              multiple
              id="unassignedPublicLinks"
              className="outline-none w-full h-40 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            >
              {getUsedAndUnusedData.map((option, key) => (
                <option
                  key={key}
                  className={
                    selectedItems.includes(option)
                      ? "bg-[#007BFF] text-white"
                      : ""
                  }
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              id="publictext10"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              Unused Public Links with assigned Portfolio
            </label>
            <select
              id="publicselect3"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            >
              <option>...Select...</option>

              {getUsedAndUnusedUnassigned?.map((members, index) => (
                <option key={index} value={members}>
                  {members}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              id="publictext11"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              Used Public Links
            </label>
            <select
              id="publicselect4"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            >
              <option>...Select...</option>
              {public_member?.pending_members.map((members, index) =>
                members.status === "used" ? (
                  <option key={index} value={members?.link}>
                    {members?.portfolio_name}{" "}
                  </option>
                ) : null
              )}
            </select>
          </div>
          <button
            id="publictext12"
            disabled={publicAccess === "View"}
            className={`w-full ${
              color_scheme == "Red"
                ? "bg-[#DC4C64]"
                : color_scheme == "Green"
                ? "bg-[#14A44D]"
                : "bg-[#7A7A7A]"
            }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
          >
            Hide used Public Links
          </button>
        </form>
      </div>
    </>
  );
};

export default Form2;
