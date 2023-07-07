import axios from "axios";
import { useState } from "react";

interface FormInputs {
  username: string;
  member_type: string;
  member: any[];
  product: string;
  data_type: string;
  op_rights: string;
  role: string;
  portfolio_name: string;
  portfolio_code: string;
}

const Portfolio: React.FC = () => {
  const [formInputs, setFormInputs] = useState<FormInputs>({
    username: "",
    member_type: "",
    member: [],
    product: "",
    data_type: "",
    op_rights: "",
    role: "",
    portfolio_name: "",
    portfolio_code: "",
  });

  // const handleOnChange = (e) => {
  //   setFormInputs([...formInputs, [e.target.id]: e.target.value])
  // }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios
        .post(
          "https://100093.pythonanywhere.com/api/create_portfolio/",
          formInputs
        )
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="mt-8 w-full lg:flex gap-8">
        <div className="lg:w-1/2 h-full border border-[#54595F] card-shadow">
          <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
            <p>PORTFOLIO</p>
            <p>{"<Total enabled portfolio>"}</p>
          </span>
          <div className="p-[30px]  my-20">
            <p className="text-[#FF0000] text-lg font-roboto font-semibold">
              Assign Portfolio – Products, Data types, Operational Rights and
              Roles to Members
            </p>
          </div>
          <form className="px-[30px] mb-8" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Member Type{" "}
              </label>
              <select
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                required
              >
                <option>Owner </option>
                <option> Team Member </option>
                <option>User </option>
                <option> Public</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Member
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option> Member 01 </option>
                <option> Member 02 </option>
                <option> Member 03 </option>
                <option> Member 04 </option>
                <option> Member 05 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Product
              </label>
              <select
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                placeholder="Select Product"
              >
                <option> Product 01 </option>
                <option> Product 02 </option>
                <option> Product 03 </option>
                <option> Product 04 </option>
                <option> Product 05 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Data Type{" "}
              </label>
              <select
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                required
              >
                <option>Real Data </option>
                <option> Learning Member </option>
                <option>Testing DataData </option>
                <option> Archived Data</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Operational Rights{" "}
              </label>
              <select
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                required
              >
                <option>View </option>
                <option> Add/Edit </option>
                <option>Delete </option>
                <option> Admin</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Roles
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option> Role 01 </option>
                <option> Role 02 </option>
                <option> Role 03 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Portfolio Name
              </label>
              <input
                type="text"
                placeholder="Portfolio name"
                required
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Portfolio Code (Unique){" "}
              </label>
              <input
                type="text"
                placeholder="Portfolio code"
                required
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Portfolio Specification{" "}
              </label>
              <input
                type="text"
                placeholder="Portfolio specification"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Portfolio Universal Code{" "}
              </label>
              <input
                type="text"
                placeholder="Portfolio universal code"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Portfolio Details{" "}
              </label>
              <textarea
                rows={4}
                placeholder="Portfolio details"
                className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
              />
            </div>
            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Create Portfolio
            </button>
          </form>
        </div>
        <div className="lg:w-1/2 ">
          <h2 className="text-[#7A7A7A] text-lg font-roboto font-bold my-8">
            Show Assigned Portfolios, Search in Portfolios
          </h2>

          <form className=" mb-8 mt-12">
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Member Type
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>Owner </option>
                <option> Team Member </option>
                <option>User </option>
                <option> Public</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Member
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option> Member 01 </option>
                <option> Member 02 </option>
                <option> Member 03 </option>
                <option> Member 04 </option>
                <option> Member 05 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Product
              </label>
              <select
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                placeholder="Select Product"
              >
                <option> Product 01 </option>
                <option> Product 02 </option>
                <option> Product 03 </option>
                <option> Product 04 </option>
                <option> Product 05 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Data Type{" "}
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>Real Data </option>
                <option> Learning Member </option>
                <option>Testing DataData </option>
                <option> Archived Data</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Operational Rights{" "}
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option>View </option>
                <option> Add/Edit </option>
                <option>Delete </option>
                <option> Admin</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Roles
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option> Role 01 </option>
                <option> Role 02 </option>
                <option> Role 03 </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Enabled Portfolios
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option> Portfolio name 01, Role Name, Member Type </option>
                <option> Portfolio name 02, Role Name, Member Type </option>
                <option> Portfolio name 03, Role Name, Member Type </option>
                <option> Portfolio name 04, Role Name, Member Type </option>
                <option> Portfolio name 05, Role Name, Member Type </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Disabled Portfolios
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option> Portfolio name 01, Role Name, Member Type </option>
                <option> Portfolio name 02, Role Name, Member Type </option>
                <option> Portfolio name 03, Role Name, Member Type </option>
                <option> Portfolio name 04, Role Name, Member Type </option>
                <option> Portfolio name 05, Role Name, Member Type </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Details of selected Portfolio
              </label>
              <textarea
                rows={4}
                placeholder="Portfolio details"
                className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Enable / Disable Selected Portfolio
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                <option> Enable </option>
                <option> Disable </option>
              </select>
            </div>
            <button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
              Enable / Disable selected Portfolio
            </button>

            <button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
              Duplicate selected Portfolio to create new
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

export default Portfolio;
