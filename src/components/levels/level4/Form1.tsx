const Form1 = () => {
  return (
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
            id="level_name"
            className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
          />
        </div>

        <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
          Save Name
        </button>
      </form>
    </div>
  );
};

export default Form1;
