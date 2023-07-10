import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { ChangeEvent, useState } from "react";

const Level3 = () => {
  const level3Items = useSelector(
    (state: RootState) =>
      state.adminData.data[0]?.organisations[0]?.level3?.items
  );

  const levelName = useSelector((state: RootState) => {
    return state.adminData.data[0]?.organisations[0]?.level3?.level_name || "";
  });

  const [formInputs, setFormInputs] = useState({
    level_name: "",
    item_name: "",
    item_code: "",
    item_details: "",
    item_universal_code: "",
    item_specification: "",
    item_barcode: "",
    item_image1: "",
    item_image2: "",
    status: "",
  });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };

  const handleOnChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormInputs({ ...formInputs, item_details: e.target.value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedItems((prevSelectedItems) => [
      ...prevSelectedItems,
      ...selectedOptions,
    ]);
  };

  const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormInputs({ ...formInputs, status: e.target.value });
  };

  return (
    <>
      <div className="lg:flex w-full  h-full mt-8">
        <div className="lg:w-1/3 border border-[#54595F] card-shadow">
          <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
            <p>{"Level 3 – <Name>,"}</p>
            <p>{"Total Items – <total enabled items in level 3>"}</p>
          </span>

          <form className="px-[30px] mb-8">
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Name for Level 3
              </label>
              <input
                type="text"
                placeholder="Name"
                required
                value={levelName}
                onChange={handleOnChange}
                id="level_name"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>

            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Save Name
            </button>
          </form>
        </div>

        <div className="lg:w-1/3 border border-[#54595F] card-shadow">
          <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
            Create Level 3 Items
          </p>
          <form className="px-[30px] mb-8">
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Item Name
              </label>
              <input
                type="text"
                placeholder="Item Name"
                required
                onChange={handleOnChange}
                id="item_name"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Item Code (Unique)
              </label>
              <input
                type="text"
                placeholder="Item code"
                required
                onChange={handleOnChange}
                id="item_code"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Item Specification
              </label>
              <input
                type="text"
                placeholder="Item specification"
                onChange={handleOnChange}
                id="item_specification"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Item Universal Code
              </label>
              <input
                type="text"
                placeholder=" Item universal code"
                onChange={handleOnChange}
                id="item_universal_code"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Items Details
              </label>
              <textarea
                rows={4}
                placeholder="Item details"
                onChange={handleOnChangeTextArea}
                id="item_details"
                className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Barcode
              </label>
              <input type="file" />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Image 1
              </label>
              <input type="file" />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Image 2
              </label>
              <input type="file" />
            </div>

            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Create Item
            </button>
          </form>
        </div>
        <div className="lg:w-1/3 border border-[#54595F] card-shadow">
          <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
            Items created in Level 3
          </p>
          <form className="px-[30px] mb-8">
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Enabled Items
              </label>
              <select
                multiple
                onChange={handleSelectChange}
                id="enable_item"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              >
                {level3Items.map((item, index) =>
                  item.status === "enable" ? (
                    <option key={index}>{item.item_name}</option>
                  ) : null
                )}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Disabled Items
              </label>
              <select
                multiple
                onChange={handleSelectChange}
                id="disable_item"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              >
                {level3Items.map((item, index) =>
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
                value={selectedItems.join("\n")}
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
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              >
                <option> Enable </option>
                <option> Disable </option>
              </select>
            </div>

            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Enable / Disable selected Item
            </button>
            <button className="w-full h-12 mt-20 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Duplicate selected Item to create new
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Level3;
