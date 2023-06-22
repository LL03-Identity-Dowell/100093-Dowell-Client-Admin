
const Roles = () => {
  return (
    <>
      <div className="mt-8 w-full lg:flex gap-8">
        <div className="lg:w-1/2 h-full border border-[#54595F] card-shadow">
          <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
            <p>ROLE</p>
            <p>{"<Total enabled roles>"}</p>
          </span>
          <div className="p-[30px]  my-20">
            <p className="text-[#FF0000] text-lg font-roboto font-semibold">
              Create Roles – Define Roles in my organisation
            </p>
          </div>
          <form className="px-[30px] mb-8">
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Item in Level 1
              </label>
              <select
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                required
              >
                <option>Item 1 </option>
                <option> Item 2 </option>
                <option>Item 3 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Item in Level 2
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>Item 1 </option>
                <option> Item 2 </option>
                <option>Item 3 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Item in Level 3
              </label>
              <select
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                placeholder="Select Product"
              >
                <option>Item 1 </option>
                <option> Item 2 </option>
                <option>Item 3 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Item in Level 4
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>Item 1 </option>
                <option> Item 2 </option>
                <option>Item 3 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Item in Level 5
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>Item 1 </option>
                <option> Item 2 </option>
                <option>Item 3 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Security Layer
              </label>
              <select
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                required
              >
                <option>Layer 01 </option>
                <option> Layer 02 </option>
                <option>Layer 03 </option>
                <option>Layer 04 </option>
                <option>Layer 05 </option>
              </select>
            </div>

            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Role Name
              </label>
              <input
                type="text"
                placeholder="Role name"
                required
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Role Code (Unique){" "}
              </label>
              <input
                type="text"
                placeholder="Role code"
                required
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Role Specification{" "}
              </label>
              <input
                type="text"
                placeholder="Role specification"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Role Universal Code{" "}
              </label>
              <input
                type="text"
                placeholder="Role universal code"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Role Details{" "}
              </label>
              <textarea
                rows={4}
                placeholder="Role details"
                className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
              />
            </div>
            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Create Role
            </button>
          </form>
        </div>
        <div className="lg:w-1/2 ">
          <h2 className="text-[#7A7A7A] text-lg font-roboto font-bold my-8">
            Roles created in my organisation
          </h2>

          <form className=" mb-8 mt-12">
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Level 1
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>Item 1 </option>
                <option>Item 2 </option>
                <option>Item 3 </option>
                <option>Item 4 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Level 2
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>Item 1 </option>
                <option>Item 2 </option>
                <option>Item 3 </option>
                <option>Item 4 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Level 3
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>Item 1 </option>
                <option>Item 2 </option>
                <option>Item 3 </option>
                <option>Item 4 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Level 4
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>Item 1 </option>
                <option>Item 2 </option>
                <option>Item 3 </option>
                <option>Item 4 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Level 5
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>Item 1 </option>
                <option>Item 2 </option>
                <option>Item 3 </option>
                <option>Item 4 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Security Layer
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>Layer 1 </option>
                <option>Layer 2 </option>
                <option>Layer 3 </option>
                <option>Layer 4 </option>
                <option>Layer 5 </option>
                <option>Layer 6 </option>
              </select>
            </div>

            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Enabled Roles
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option> Role 1 </option>
                <option> Role 2 </option>
                <option> Role 3 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Disabled Roles
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option> Role 1 </option>
                <option> Role 2 </option>
                <option> Role 3 </option>
              </select>
            </div>

            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Details of selected Role
              </label>
              <textarea
                rows={4}
                placeholder=""
                className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Enable / Disable Selected Role
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option> Enable </option>
                <option> Disable </option>
              </select>
            </div>
            <button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
              Enable / Disable selected Role
            </button>

            <button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
              Duplicate selected Role to create new
            </button>
            <button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
              Refresh Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Roles;
