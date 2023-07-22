const Form2 = () => {
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
            <select
              id="no_portfolio"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              placeholder="Select Product"
            >
              <option>...Select...</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Users having assigned Portfolio
            </label>
            <select
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              placeholder="Select Product"
            >
              <option> Member 01 </option>
              <option> Member 02 </option>
              <option> Member 03 </option>
              <option> Member 04 </option>
              <option> Member 05 </option>
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
