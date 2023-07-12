import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";

interface FormInputs {
  username: string;
  member_type: string;
  member: string[];
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
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const portfolio = useSelector(
    (state: RootState) => state.adminData.data[0]?.portpolio
  );
  const userName = useSelector(
    (state: RootState) => state.adminData.data[0]?.Username
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
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
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      username: userName,
      member_type: formInputs.member_type,
      member: JSON.stringify(selectedItems),
      product: formInputs.product,
      data_type: formInputs.data_type,
      op_rights: formInputs.op_rights,
      role: formInputs.role,
      portfolio_name: formInputs.portfolio_name,
      portfolio_code: formInputs.portfolio_code,
    };
    console.log(data, "data");

    try {
      await axios
        .post("https://100093.pythonanywhere.com/api/create_portfolio/", data)
        .then((res) => {
          console.log(res.data);
          setErrMsg("");
        });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        setErrMsg(error.response?.data);
      } else {
        console.error("An unknown error occurred:", error);
        setErrMsg("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
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
                <span className="text-[#ff0000] text-xs">*</span>
              </label>
              <select
                onChange={handleSelectStatus}
                id="member_type"
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
                Select Member <span className="text-[#ff0000] text-xs">*</span>
              </label>
              <select
                multiple
                onChange={handleSelectChange}
                id="member"
                className="outline-none w-full h-24 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              >
                {portfolio?.map((products, key) => (
                  <option key={key}> {products.portfolio_name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Product <span className="text-[#ff0000] text-xs">*</span>
              </label>
              <select
                onChange={handleSelectStatus}
                id="product"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                placeholder="Select Product"
              >
                {portfolio?.map((products, key) => (
                  <option key={key}> {products.product}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Data Type{" "}
                <span className="text-[#ff0000] text-xs">*</span>
              </label>
              <select
                onChange={handleSelectStatus}
                id="data_type"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                required
              >
                {portfolio?.map((products, key) => (
                  <option key={key}> {products.data_type}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Operational Rights{" "}
                <span className="text-[#ff0000] text-xs">*</span>
              </label>
              <select
                onChange={handleSelectStatus}
                id="op_rights"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                required
              >
                {portfolio?.map((products, key) => (
                  <option key={key}> {products.operations_right}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Roles <span className="text-[#ff0000] text-xs">*</span>
              </label>
              <select
                onChange={handleSelectStatus}
                id="role"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              >
                <option>...Select...</option>
                {portfolio?.map((products, key) => (
                  <option key={key}> {products.role}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Portfolio Name{" "}
                <span className="text-xs text-[#FF0000]">
                  {" "}
                  (Don't use & symbol in portfolio name){" "}
                  <span className="text-[#ff0000] text-xs">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Portfolio name"
                required
                onChange={handleOnChange}
                id="portfolio_name"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Portfolio Code (Unique){" "}
                <span className="text-[#ff0000] text-xs">*</span>
              </label>
              <input
                type="text"
                placeholder="Portfolio code"
                required
                onChange={handleOnChange}
                id="portfolio_code"
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
                onChange={handleOnChange}
                id="specification"
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
                onChange={handleOnChange}
                id="universal_code"
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
                // onChange={handleOnChangeTextArea}
                // id='detais'
                className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
              />
            </div>
            <button
              disabled={isLoading}
              className={`w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto ${
                isLoading ? "hover:bg-[#7a7a7a] opacity-50" : ""
              }`}
            >
              Create Portfolio
            </button>
            <p className="text-xs text-[#FF0000] text-center pt-2">{errMsg}</p>
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
              <select
                multiple
                onChange={handleSelectStatus}
                id="member_type"
                className="outline-none w-full h-24 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              >
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
              <textarea
                rows={4}
                placeholder="member"
                readOnly
                value={formInputs.member_type}
                // onChange={handleOnChangeTextArea}
                id="members"
                className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Product
              </label>
              <select
                multiple
                className="outline-none w-full h-24 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                placeholder="Select Product"
              >
                {portfolio?.map((products, key) => (
                  <option key={key}> {products.product}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Data Type{" "}
              </label>
              <select
                multiple
                className="outline-none w-full h-24 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              >
                {portfolio?.map((products, key) => (
                  <option key={key}> {products.data_type}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Operational Rights{" "}
              </label>
              <select
                multiple
                className="outline-none w-full h-24 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              >
                {portfolio?.map((products, key) => (
                  <option key={key}> {products.operations_right}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Roles
              </label>
              <select
                multiple
                className="outline-none w-full h-24 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              >
                {portfolio?.map((products, key) => (
                  <option key={key}> {products.role}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Enabled Portfolios
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                {portfolio?.map((products, key) =>
                  products.status === "enable" ? (
                    <option key={key}> {products.portfolio_name}</option>
                  ) : null
                )}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Disabled Portfolios
              </label>
              <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                {portfolio?.map((products, key) =>
                  products.status === "disable" ? (
                    <option key={key}> {products.portfolio_name}</option>
                  ) : null
                )}
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
