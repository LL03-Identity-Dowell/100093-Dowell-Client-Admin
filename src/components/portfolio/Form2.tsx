import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { useState, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

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
  portfolio_status: string;
}

const Form2 = () => {
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [statusErrMsg, setStatusErrMsg] = useState("");

  const portfolio = useSelector(
    (state: RootState) => state.adminData.data[0]?.portpolio
  );
  const userName = useSelector(
    (state: RootState) => state.adminData.data[0]?.Username
  );

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
    portfolio_status: "",
  });

  const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };

  const handleSubmitStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingStatus(true);

    const data = {
      username: userName,
      portfolio_code: formInputs.portfolio_code,
      portfolio_status: formInputs.portfolio_status.toLowerCase(),
    };

    try {
      await axios
        .post(
          "https://100093.pythonanywhere.com/api/update_portfolio_status/",
          data
        )
        .then((res) => {
          console.log(res.data);
          setStatusErrMsg("");
          toast.success(res.data.success);
        });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        setStatusErrMsg(error.response?.data);
      } else {
        console.error("An unknown error occurred:", error);
        setStatusErrMsg("An unknown error occurred");
      }
    } finally {
      setIsLoadingStatus(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="lg:w-1/2 ">
        <h2 className="text-[#7A7A7A] text-lg font-roboto font-bold my-8">
          Show Assigned Portfolios, Search in Portfolios
        </h2>

        <div className=" mb-8 mt-12">
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

          <form onSubmit={handleSubmitStatus}>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Enable / Disable Selected Portfolio
              </label>
              <select
                required
                onChange={handleSelectStatus}
                id="portfolio_status"
                className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              >
                <option> ...Select... </option>
                <option> Enable </option>
                <option> Disable </option>
              </select>
            </div>
            <button
              disabled={isLoadingStatus}
              className={`w-full h-10 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto ${
                isLoadingStatus ? "hover:bg-[#7a7a7a] opacity-50" : ""
              }`}
            >
              Enable / Disable selected Portfolio
            </button>
            {statusErrMsg && (
              <p className="text-xs text-[#FF0000] text-center pt-2">
                {statusErrMsg}
              </p>
            )}
          </form>

          <button className="w-full h-10 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
            Duplicate selected Portfolio to create new
          </button>
          <button className="w-full h-10 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
            Refresh Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Form2;
