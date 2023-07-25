const Form1 = () => {
  return (
    <>
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
    </>
  );
};

export default Form1;
