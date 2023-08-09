import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useState } from "react";

const Form2 = () => {
  const [selectedItems, setSelectedItems] = useState<string>("");

  const guest_member = useSelector(
    (state: RootState) => state.adminData.data[0]?.members.guest_members
  );

  const handleSelectOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedItemName = event.target.value;
    setSelectedItems(selectedItemName);
  };

  const selectedItemsData = guest_member?.accept_members.find(
    (item) => item?.member_code === selectedItems
  );

  return (
    <>
      <div className="lg:w-1/3 border border-[#54595F] card-shadow">
        <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] m-5 flex flex-col items-center">
          Search Users in my organisation
        </p>
        <form className="px-[30px] mb-8">
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Users not having Portfolio
            </label>
            <select multiple
              id="no_portfolio"
              onChange={handleSelectOnChange}
              value={selectedItems}
              className="outline-none w-full h-24 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              placeholder="Select Product"
            >
              {/* <option>...Select...</option> */}
              {guest_member?.pending_members.map((members, index) => (
                <option key={index} value={members?.member_code}>
                  {" "}
                  {members?.name}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Users having assigned Portfolio
            </label>
            <select multiple
              onChange={handleSelectOnChange}
              id="have_portfolio"
              value={selectedItems}
              className="outline-none w-full h-24 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              placeholder="Select Product"
            >
              {/* <option>...Select...</option> */}
              {guest_member?.accept_members.map((members, index) => (
                <option key={index} value={members?.member_code}>
                  {" "}
                  {members?.first_name} {members?.last_name}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Search Users
            </label>
            <input
              type="text"
              placeholder="Name"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Details of selected User
            </label>
            <textarea
              rows={4}
              placeholder="Member details"
              readOnly
              value={JSON.stringify(selectedItemsData, null, 1)?.slice(1, -1)}
              className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
            />
          </div>

          <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
            Remove Selected User
          </button>
        </form>
      </div>
    </>
  );
};

export default Form2;
