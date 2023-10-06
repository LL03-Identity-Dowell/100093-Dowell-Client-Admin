import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { useState, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FormInputs } from "./types";

const initialFormInputs: FormInputs = {
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
  portfolio_spec: "",
  portfolio_u_code: "",
  portfolio_det: "",
};

const Form2 = () => {
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [statusErrMsg, setStatusErrMsg] = useState("");

  const portfolio = useSelector(
    (state: RootState) => state.adminData.data[0]?.portpolio
  );
  const userName = useSelector(
    (state: RootState) => state.adminData.data[0]?.Username
  );
  const productData = useSelector((state: RootState) => state.products);
  const rolesdata = useSelector(
    (state: RootState) => state.adminData.data[0]?.roles
  );

  const [formInputs, setFormInputs] = useState(initialFormInputs);

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

  const getMembers = useSelector(
    (state: RootState) => state.adminData.data[0]?.members
  );

  const filterUserMember = getMembers?.guest_members?.accept_members.filter(
    (item) => item
  );
  const filterTeamMember = getMembers?.team_members?.accept_members.filter(
    (item) => item
  );

  const selectedItemData = portfolio.find(
    (item) => item.portfolio_code === formInputs.portfolio_code
  );

  const refreshSearch = () => {
    setFormInputs(initialFormInputs);
  };

  const filterDataByProduct = portfolio?.filter(
    (item) => item.product === formInputs?.product
  );

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="lg:w-1/2 px-5">
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
              <option value="owner">Owner </option>
              <option value={"team_member"}> Team Member </option>
              <option value="user">User </option>
              <option value="public"> Public</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Select Member <span className="text-[#ff0000] text-xs">*</span>
            </label>
            <select
              multiple
              // onChange={handleSelectChange}
              id="member"
              className="outline-none w-full h-24 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            >
              {formInputs.member_type === "user" &&
                filterUserMember?.map((member, key) => (
                  <option key={key}> {member.name}</option>
                ))}
              {formInputs.member_type === "team_member" &&
                filterTeamMember?.map((member, key) => (
                  <option key={key}>
                    {" "}
                    {member.name === "owner" ? userName : member?.name}
                  </option>
                ))}
              {formInputs.member_type === "owner" && (
                <option> {userName}</option>
              )}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Product
            </label>
            <select
              multiple
              id="product"
              onChange={handleSelectStatus}
              className="outline-none w-full h-24 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              placeholder="Select Product"
            >
              {productData?.products?.map((product) => (
                <option key={product._id}> {product.product_name} </option>
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
              <option>Real Data</option>
              <option>Learning Data</option>
              <option>Testing Data</option>
              <option>Archived Data</option>{" "}
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
              <option>View</option>
              <option>Add/Edit</option>
              <option>Delete</option>
              <option>Admin</option>
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
              {rolesdata?.map((roles, key) =>
                roles.status === "enable" ? (
                  <option key={key}>{roles.role_name}</option>
                ) : null
              )}
            </select>
          </div>
          <form onSubmit={handleSubmitStatus}>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Enabled Portfolios
              </label>
              <select
                required
                onChange={handleSelectStatus}
                id="portfolio_code"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              >
                <option>...select...</option>
                {filterDataByProduct?.map((products, key) =>
                  products.status === "enable" &&
                  products.member_type === formInputs.member_type ? (
                    <option key={key} value={products.portfolio_code}>
                      {" "}
                      {products.portfolio_name}
                    </option>
                  ) : null
                )}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Disabled Portfolios
              </label>
              <select
                required
                onChange={handleSelectStatus}
                id="portfolio_code"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              >
                <option>...select...</option>
                {filterDataByProduct?.map((products, key) =>
                  products.status === "disable" &&
                  products.member_type === formInputs.member_type ? (
                    <option key={key} value={products.portfolio_code}>
                      {" "}
                      {products.portfolio_name}
                    </option>
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
                readOnly
                placeholder="Portfolio details"
                value={JSON.stringify(selectedItemData, null, 1)?.slice(1, -1)}
                className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
              />
            </div>

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
                <option value=""> ...Select... </option>
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
              {isLoadingStatus
                ? "Loading..."
                : "Enable / Disable selected Portfolio"}
            </button>
            {statusErrMsg && (
              <p className="text-xs text-[#FF0000] text-center pt-2 truncate">
                {statusErrMsg}
              </p>
            )}
          </form>

          <button className="w-full h-10 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
            Duplicate selected Portfolio to create new
          </button>
          <button
            className="w-full h-10 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto"
            onClick={refreshSearch}
          >
            Refresh Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Form2;
