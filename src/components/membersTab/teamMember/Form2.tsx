import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useState } from "react";

const Form2 = () => {
  const [selectedItems, setSelectedItems] = useState<string>("");

  const team_member = useSelector(
    (state: RootState) => state.adminData.data[0]?.members.team_members
  );

  const handleSelectOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedItemName = event.target.value;
    setSelectedItems(selectedItemName);
  };

  const selectedPendingMembers = team_member?.pending_members.find(
    (item) => item?.member_code === selectedItems
  );
  const selectedAcceptMembers = team_member?.accept_members.find(
    (item) => item?.member_code === selectedItems
  );

  return (
    <>
      <div className="lg:w-1/3 border border-[#54595F] card-shadow">
        <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] m-5 flex flex-col items-center">
          Search Team Members in my organisation
        </p>
        <form className="px-[30px] mb-8">
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Team Members not having Portfolio
            </label>
            <select
              multiple
              onChange={handleSelectOnChange}
              id="no_portfolio"
              // value={selectedItems}
              className="outline-none w-full h-24 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            >
              {team_member?.pending_members.map((members, index) => (
                <option key={index} value={members?.member_code}>
                  {" "}
                  {members?.name}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Team Members having assigned Portfolio
            </label>
            <select
              multiple
              onChange={handleSelectOnChange}
              id="have_portfolio"
              // value={selectedItems}
              className="outline-none w-full h-24 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            >
              {team_member?.accept_members.map((members, index) => (
                <option key={index} value={members?.member_code}>
                  {" "}
                  {members?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Search Team Members
            </label>
            <input
              type="text"
              placeholder="Name"
              // onChange={(event) => handleSearch(event)}
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Details of selected Team member
            </label>
            <textarea
              rows={4}
              placeholder="Member details"
              readOnly
              value={JSON.stringify(
                selectedPendingMembers || selectedAcceptMembers,
                null,
                1
              )?.slice(1, -1)}
              className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
            />
          </div>

          <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
            Remove Selected Team Member
          </button>
        </form>
      </div>
    </>
  );
};

export default Form2;
