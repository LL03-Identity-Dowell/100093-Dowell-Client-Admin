import { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";

const Form3 = () => {
  const level1Items = useSelector(
    (state: RootState) =>
      state.adminData.data[0]?.organisations[0]?.level1?.items
  );
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [status, setStatus] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItemName = event.target.value;
    setSelectedItem(selectedItemName);
  };

  const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };
  const selectedItemData = level1Items.find(
    (item) => item.item_name === selectedItem
  );


  return (
    <div className="lg:w-1/2 border border-[#54595F] card-shadow">
      <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
        Items created in Level 1
      </p>
      <form className="px-[30px] mb-8">
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Enabled Items
          </label>
          <select
            onChange={handleSelectChange}
            value={selectedItem}
            id="enable_item"
            className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
          >
            {level1Items.map((item, index) =>
              item.status === "enable" ? (
                <option key={index} value={item.item_name}>
                  {item.item_name}
                </option>
              ) : null
            )}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Disabled Items
          </label>
          <select
            onChange={handleSelectChange}
            id="disable_item"
            className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
          >
            {level1Items.map((item, index) =>
              item.status === "disable" ? (
                <option key={index}>{item.item_name}</option>
              ) : null
            )}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Details of selected Item
          </label>
          <textarea
            rows={4}
            placeholder=""
            readOnly
            value={selectedItem ? JSON.stringify(selectedItemData, null, 1)?.slice(1, -1) : ''}
            className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
          />
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Enable / Disable selected Item
          </label>
          <select
            onChange={handleSelectStatus}
            id="status"
            className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
          >
            <option> Enable </option>
            <option> Disable </option>
          </select>
        </div>

        <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white text-[14px] font-roboto">
          Enable / Disable selected Item
        </button>
        <button className="w-full h-12 mt-20 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white text-[14px] font-roboto">
          Duplicate selected Item to create new
        </button>
      </form>
    </div>
  );
};

export default Form3;
