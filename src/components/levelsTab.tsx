import { useState } from "react";
import { FaLevelDownAlt } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const LevelsTab = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div>
      <Tabs
        className=""
        selectedTabClassName="levels_tabs"
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-4 mt-4">
          {["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"].map(
            (level) => {
              return (
                <Tab key={level}>
                  <span className="bg-[#7A7A7A] flex items-center rounded-lg px-6 py-3 gap-x-12 hover:bg-[#61CE70] cursor-pointer card-shadow border border-[#F5F5F5] active:bg-[#61CE70]">
                    <FaLevelDownAlt className="text-[#4CAF50] " />
                    <p className="font-roboto text-white font-medium">
                      {level}
                    </p>
                  </span>
                </Tab>
              );
            }
          )}
        </TabList>
        <TabPanel>
          <div className="lg:flex w-full  h-full mt-8">
            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
                <p>{"Level 1 – <Name>,"}</p>
                <p>{"Total Items – <total enabled items in level 1>"}</p>
              </span>

              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Name for Level 1
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>

                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save Name
                </button>
              </form>
            </div>

            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                Create Level 1 Items
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
              <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                Items created in Level 1
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enabled Items
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Item 1 </option>
                    <option> Item 2 </option>
                    <option> Item 3 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Disabled Items
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Item 1 </option>
                    <option> Item 2 </option>
                    <option> Item 3 </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Details of selected Item
                  </label>
                  <textarea
                    rows={4}
                    placeholder=""
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enable / Disable selected Item
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
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
        </TabPanel>
        <TabPanel>
          <div className="lg:flex w-full  h-full mt-8">
            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
                <p>{"Level 2 – <Name>,"}</p>
                <p>{"Total Items – <total enabled items in level 2>"}</p>
              </span>

              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Name for Level 2
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>

                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save Name
                </button>
              </form>
            </div>

            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                Create Level 2 Items
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
              <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                Items created in Level 2
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enabled Items
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Item 1 </option>
                    <option> Item 2 </option>
                    <option> Item 3 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Disabled Items
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Item 1 </option>
                    <option> Item 2 </option>
                    <option> Item 3 </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Details of selected Item
                  </label>
                  <textarea
                    rows={4}
                    placeholder=""
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enable / Disable selected Item
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
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
        </TabPanel>
        <TabPanel>
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
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>

                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save Name
                </button>
              </form>
            </div>

            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <p className="text-[#FF0000] text-lg font-roboto font-semibold">
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
              <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                Items created in Level 1
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enabled Items
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Item 1 </option>
                    <option> Item 2 </option>
                    <option> Item 3 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Disabled Items
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Item 1 </option>
                    <option> Item 2 </option>
                    <option> Item 3 </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Details of selected Item
                  </label>
                  <textarea
                    rows={4}
                    placeholder=""
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enable / Disable selected Item
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
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
        </TabPanel>
        <TabPanel>
          <div className="lg:flex w-full  h-full mt-8">
            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
                <p>{"Level 4 – <Name>,"}</p>
                <p>{"Total Items – <total enabled items in level 4>"}</p>
              </span>

              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Name for Level 4
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>

                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save Name
                </button>
              </form>
            </div>

            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                Create Level 4 Items
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
              <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                Items created in Level 1
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enabled Items
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Item 1 </option>
                    <option> Item 2 </option>
                    <option> Item 3 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Disabled Items
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Item 1 </option>
                    <option> Item 2 </option>
                    <option> Item 3 </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Details of selected Item
                  </label>
                  <textarea
                    rows={4}
                    placeholder=""
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enable / Disable selected Item
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
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
        </TabPanel>
        <TabPanel>
          <div className="lg:flex w-full  h-full mt-8">
            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
                <p>{"Level 5 – <Name>,"}</p>
                <p>{"Total Items – <total enabled items in level 5>"}</p>
              </span>

              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Name for Level 5
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>

                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save Name
                </button>
              </form>
            </div>

            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                Create Level 5 Items
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
              <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                Items created in Level 1
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enabled Items
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Item 1 </option>
                    <option> Item 2 </option>
                    <option> Item 3 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Disabled Items
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Item 1 </option>
                    <option> Item 2 </option>
                    <option> Item 3 </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Details of selected Item
                  </label>
                  <textarea
                    rows={4}
                    placeholder=""
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enable / Disable selected Item
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
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
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default LevelsTab;
