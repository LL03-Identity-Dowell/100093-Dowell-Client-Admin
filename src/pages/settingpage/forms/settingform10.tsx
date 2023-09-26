// import { useSelector } from 'react-redux';
// import { RootState } from "../../../store/Store";

import { useState } from "react";

const Settingform10 = () => {
  const [processValue, setProcessValue] = useState("");
  const [rightValue, setRightValue] = useState("");
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
            <option>Portfolio Management</option>
            <option>Team Member Management</option>
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
            <option>View</option>
            <option>Add/Edit</option>
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
          >
            <option>Portfolio 1</option>
            <option>Portfolio 2</option>
          </select>
        </div>
        <div className="w-full mb-1">
          <button className="w-full bg-[#7A7A7A] hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md">
            Assign Process management to selected Portfolios
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settingform10;
