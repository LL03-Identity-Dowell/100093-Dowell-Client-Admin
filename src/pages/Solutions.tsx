import Layout from "../components/layout";
import Sidebar from "./admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import Loader from "./whiteloader";
import { isNewOwner, setAdminData } from "../store/slice/adminData";
import { getselectedorgs } from "../store/slice/selectedorg";
import { getViewAccess } from "../store/slice/viewAccess";
import Header from "./admin/Header";
import { Axios93Base } from "../api/axios";
import { ToastContainer } from "react-toastify";
import { FormInputs } from "./solutionTypes";
import { useState, ChangeEvent } from "react";

const initialFormInputs: FormInputs = {
  processName: "",
  processId: "",
  predecessor: "",
  product: "",
  portfolio: "",
  teammember: "",
  user: "",
  public: "",
  successer: "",
  notes: "",
};
const Solutions = () => {
  const loadingstate = useSelector((state: RootState) => state.loaderslice);
 
  const [formInputs, setFormInputs] = useState(initialFormInputs);
  const overlaysidebarstate = useSelector(
    (state: RootState) => state.overlaysidebar
  );
console.log(formInputs)
  
  const productData = useSelector((state: RootState) => state.products);


console.log(productData)
  const isnewOwner = useSelector(
    (state: RootState) => state.adminData.data[0].isNewOwner
  );
  const userName = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );
  const dispatch = useDispatch();
  const sessionId = localStorage.getItem("sessionId");
  const fetchIsOwnerData = async () => {
    if (localStorage.getItem("username")) {
      if (!isnewOwner) {
        const username = localStorage.getItem("username");
        const responseAdmin = await Axios93Base.post("/get_data/", {
          username: username,
          session_id: sessionId,
        });
        const response = await Axios93Base.post("/settings/", {
          username: username,
        });
        dispatch(isNewOwner(username));
        dispatch(setAdminData(responseAdmin.data.data[0]));
        dispatch(getselectedorgs({ orgname: userName, type: "owner" }));
        dispatch(getViewAccess(response.data.data.processes_to_portfolio));
      }
    } else {
      dispatch(isNewOwner(null));
    }
  };
  fetchIsOwnerData();
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );

  const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };

//   const portfolio = useSelector(
//     (state: RootState) => state.adminData.data[0]?.portpolio
//   );
  const getUsers = useSelector(
    (state: RootState) => state.adminData.data[0]?.members.guest_members.pending_members
    
  );
  console.log(getUsers)
  const getPublicUsers = useSelector(
    (state: RootState) => state.adminData.data[0]?.members.public_members.pending_members

  );
  const getTeammembers = useSelector(
    (state: RootState) => state.adminData.data[0]?.members.team_members.accept_members

  );

  console.log(getTeammembers)
  return (
    <>
      <div className="relative">
      <ToastContainer position="top-right" />
        <Layout>
          <main>
            <div className="container mx-auto mb-20 lg:px-0 px-4">
              <Header />

              <section className="mt-4 flex lg:flex-row flex-col-reverse gap-8 justify-end">
                {loadingstate === true ? (
                  <div className="lg:w-full">

                    <div className="lg:w-full h-full border border-[#54595F] card-shadow px-[30px] pb-4">
                      <span
                        className={`${
                          color_scheme == "Red"
                            ? "bg-[#DC4C64]"
                            : color_scheme == "Green"
                            ? "bg-[#14A44D]"
                            : "bg-[#7A7A7A]"
                        } font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center`}
                        >
                        <p id="portfolioForm1Text1">SOLUTIONS</p>
                      </span>
                      <form>

                        {/* process name  */}
                        <div className="mb-4">
                          <div className="flex items-center gap-3">
                            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                              <span id="ProcessName">Process Name </span>
                              <span className="text-[#ff0000] text-base">*</span>
                            </label>
                          
                          </div>
                          <div className="w-full">
                            <input
                              type="text"
                              placeholder="Process Name"
                              className="w-full outline-none border border-black mb-[10px] p-2 rounded-[4px]"
                              id="processName"
                              onChange={handleOnChange}
                              value={formInputs.processName}
                            />
                          </div>
                        </div>

                         {/* process id  */}
                         <div className="mb-4">
                          <div className="flex items-center gap-3">
                            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                              <span id="ProcessId">Process ID </span>
                              <span className="text-[#ff0000] text-base">*</span>
                            </label>
                          
                          </div>
                          <div className="w-full">
                            <input
                              type="text"
                              placeholder="Process ID"
                              onChange={handleOnChange}
                              className="w-full outline-none border border-black mb-[10px] p-2 rounded-[4px]"
                              id="processId"
                              value={formInputs.processId}
                            />
                          </div>
                        </div>

                         {/* predecesser */}
                         <div className="mb-4">
                          <div className="flex items-center gap-3">
                            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                              <span id="Predesessor">Predecessor</span>
                              <span className="text-[#ff0000] text-base">*</span>
                            </label>
                          
                          </div>
                          <div className="w-full">
                            <input
                              type="text"
                              placeholder="Predecessor"
                              onChange={handleOnChange}
                              className="w-full outline-none border border-black mb-[10px] p-2 rounded-[4px]"
                              id="predecessor"
                              value={formInputs.predecessor}
                            />
                          </div>
                        </div>
                        {/* product  */}
                        <div className="mb-4">
                          <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
                            <span id="Product">Select Product </span>
                            <span className="text-[#ff0000] text-base">*</span>
                          </label>
                          <select
                            required
                            onChange={handleSelectStatus}
                            value={formInputs.product}
                            id="product"
                            name="product"
                            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                            placeholder="Select Product"
                          >
                            <option value="">...select...</option>
                            {productData?.products?.map((product) => (
                              <option key={product._id} value={product.product_name}>
                                {" "}
                                {product.product_name}{" "}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* portfolio  */}
                        <div className="mb-4">
                          <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
                            <span id="Portfolio">Select Portfolio </span>
                            <span className="text-[#ff0000] text-base">*</span>
                          </label>
                          <select
                            required
                            onChange={handleSelectStatus}
                            value={formInputs.portfolio}
                            id="portfolio"
                            name="portfolio"
                            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                            placeholder="Select Product"
                          >
                            <option value="">...select...</option>
                            {productData?.products?.map((product) => (
                              <option key={product._id} value={product.product_name}>
                                {" "}
                                {product.product_name}{" "}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* team member  */}
                        <div className="mb-4">
                          <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
                            <span id="Teammember">Select Team Member </span>
                            <span className="text-[#ff0000] text-base">*</span>
                          </label>
                          <select
                            required
                            onChange={handleSelectStatus}
                            value={formInputs.teammember}
                            id="teammember"
                            name="teammember"
                            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                            placeholder="Select Product"
                          >
                            <option value="">...select...</option>
                            {getTeammembers?.map((team, index) => (
                              <option key={index} value={team.first_name}>
                                {" "}
                                {team.first_name+" "+team.last_name}{" "}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* user  */}
                        <div className="mb-4">
                          <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
                            <span id="User">Select User </span>
                            <span className="text-[#ff0000] text-base">*</span>
                          </label>
                          <select
                            required
                            onChange={handleSelectStatus}
                            value={formInputs.user}
                            id="user"
                            name="user"
                            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                            placeholder="Select User"
                          >
                            <option value="">...select...</option>
                            {getUsers?.map((user, index) => (
                              <option key={index} value={user.name}>
                                {" "}
                                {user.name}{" "}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* public  */}
                        <div className="mb-4">
                          <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
                            <span id="Public">Select Public </span>
                            <span className="text-[#ff0000] text-base">*</span>
                          </label>
                          <select
                            required
                            onChange={handleSelectStatus}
                            value={formInputs.public}
                            id="public"
                            name="public"
                            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                            placeholder="Select public"
                          >
                            <option value="">...select...</option>
                            {getPublicUsers?.map((publi_user,index) => (
                              <option key={index} value={publi_user.name}>
                                {" "}
                                {publi_user.name}{" "}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* successor */}
                        <div className="mb-4">
                          <div className="flex items-center gap-3">
                            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                              <span id="Successer">Successer</span>
                              <span className="text-[#ff0000] text-base">*</span>
                            </label>
                          
                          </div>
                          <div className="w-full">
                            <input
                              type="text"
                              placeholder="Successer"
                              className="w-full outline-none border border-black mb-[10px] p-2 rounded-[4px]"
                              id="successer"
                              
                              onChange={handleOnChange}
                              value={formInputs.successer}
                            />
                          </div>
                        </div>
                        {/* notes */}
                        <div className="mb-4">
                          <div className="flex items-center gap-3">
                            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                              <span id="Notes">Notes </span>
                              <span className="text-[#ff0000] text-base">*</span>
                            </label>
                          
                          </div>
                          <div className="w-full">
                            <input
                              type="text"
                              placeholder="Notes"
                              className="w-full outline-none border border-black mb-[10px] p-2 rounded-[4px]"
                              id="notes"
                              onChange={handleOnChange}
                              value={formInputs.notes}
                            />
                          </div>
                        </div>
                        <button
                          id="portfoliotext43"
                          // onClick={handleDownloadClick}
                          // disabled={teamMemberAccess === "View"}
                          className={`w-full ${
                            color_scheme == "Red"
                              ? "bg-[#DC4C64]"
                              : color_scheme == "Green"
                              ? "bg-[#14A44D]"
                              : "bg-[#7A7A7A]"
                          }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
                        >
                          Create Solutions
                        </button>
                    </form>
                    </div>
                   
                  </div>
                ) : (
                  <Loader></Loader>
                )}
              </section>
            </div>
          </main>
        </Layout>
        <div
          className={`absolute transition  duration-500 ease-in-out top-0 left-0  w-full  bg-black bg-opacity-50 ${
            overlaysidebarstate ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Solutions;
