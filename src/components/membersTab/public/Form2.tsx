import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";

const Form2 = () => {
  const public_member = useSelector(
    (state: RootState) => state.adminData.data[0]?.members.public_members
  );

  return (
    <>
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
              <option>...Select...</option>
              {public_member?.pending_members.map((members, index) => (
                <option key={index} value={members?.link}>
                  {" "}
                  {members?.portfolio_name}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Unused Public Links with assigned Portfolio
            </label>
            <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
              <option>...Select...</option>

              {public_member?.pending_members.map((members, index) =>
                members.status === "unused" ? (
                  <option key={index} value={members?.link}>
                    {" "}
                    {members?.portfolio_name}{" "}
                  </option>
                ) : null
              )}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Used Public Links
            </label>
            <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
              <option>...Select...</option>
              {public_member?.pending_members.map((members, index) =>
                members.status === "used" ? (
                  <option key={index} value={members?.link}>
                    {" "}
                    {members?.portfolio_name}{" "}
                  </option>
                ) : null
              )}
            </select>
          </div>
          <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
            Hide used Public Links
          </button>
        </form>
      </div>
    </>
  );
};

export default Form2;
