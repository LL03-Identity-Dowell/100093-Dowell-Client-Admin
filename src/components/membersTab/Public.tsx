function Public() {
  return (
    <>
      <div className="lg:flex w-full  h-full mt-8">
        <div className="lg:w-1/3 border border-[#54595F] card-shadow">
          <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] m-5 flex flex-col items-center">
            Invite PUBLIC to my organisation
          </p>
          <form className="px-[30px] mb-8">
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Number of Public Links needed now
              </label>
              <input
                type="text"
                placeholder="Number"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Create automatically if less than
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>5 </option>
                <option> 10 </option>
                <option>25 </option>
                <option>50 </option>
                <option>100 </option>
                <option>500 </option>
                <option>1000 </option>
              </select>
            </div>
            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Create Public Invitation Link
            </button>
          </form>
        </div>
        <div className="lg:w-1/3 border border-[#54595F] card-shadow">
          <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] m-5 flex flex-col items-center">
            Public in my organisation
          </p>
          <form className="px-[30px] mb-8">
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Unused Public Links not having Portfolio
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>Public 01 </option>
                <option> Public 02 </option>
                <option>Public 03 </option>
                <option>Public 04 </option>
                <option>Public 05 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Unused Public Links with assigned Portfolio
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>Public 01 </option>
                <option> Public 02 </option>
                <option>Public 03 </option>
                <option>Public 04 </option>
                <option>Public 05 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Used Public Links
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>Public 01 </option>
                <option> Public 02 </option>
              </select>
            </div>
            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Hide used Public Links
            </button>
          </form>
        </div>
        <div className="lg:w-1/3 border border-[#54595F] card-shadow">
          <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
            <p>Public</p>
            <p>{"<Total public links used>"}</p>
          </span>
        </div>
      </div>
    </>
  );
}

export default Public;
