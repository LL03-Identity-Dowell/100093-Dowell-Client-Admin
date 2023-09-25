import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useState } from "react";
const Settingform6 = () => {
  const defaultorg = useSelector(
    (state: RootState) => state.setting?.data?.default_org
  );
  const [defaultorgValue, setdefaultorgValue] = useState(defaultorg);
  const workspacelist = ["Workspace 1", "Workspace 2", "noumanhayat"];

  const filterworkspace = workspacelist.filter((item) => item !== defaultorg);

  return (
    <div className="form-item">
      <div className="bg-[#CEF9D2] p-3 text-[18px] font-semibold text-[#7A7A7A] border-[1px] border-[#61CE70] border-solid">
        Set default Workspace for me
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
            Workspace Name
          </label>
          <select
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            aria-label="Default select example"
            value={defaultorgValue}
            onChange={(e) => setdefaultorgValue(e.target.value)}
          >
            <option value={defaultorg}>{defaultorg}</option>
            {filterworkspace.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mb-1">
          <button className="w-full bg-[#7A7A7A] hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md">
            Set as default Workspace for me
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settingform6;
