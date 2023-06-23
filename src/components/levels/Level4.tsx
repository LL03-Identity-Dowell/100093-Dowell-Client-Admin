const Level4 = () => {
  return (
    <>
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
          <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
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
          <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
            Items created in Level 4
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
    </>
  );
};

export default Level4;
