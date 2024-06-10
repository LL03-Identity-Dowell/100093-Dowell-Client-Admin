import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/Store";
import Loader from "../../pages/whiteloader";
import { Axios93Base} from "../../api/axios";
import {DepartmentInput} from "../../pages/solutionTypes"
import { isNewOwner, setAdminData } from "../../store/slice/adminData"
import { getdepartment } from "../../store/slice/department";
import { getselectedorgs } from "../../store/slice/selectedorg";
import { getViewAccess } from "../../store/slice/viewAccess";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const initialFormInputs: DepartmentInput = {
    departmentName:"",
    departmentId: 0,
    departmentHead:[]
  };


const Department = () => {
  const [formInputs, setFormInputs] = useState(initialFormInputs);
  const [loading, setLoading] = useState(false)
  const userData = useSelector((state: RootState) => state.userinfo);
  const dispatch = useDispatch();
  const sessionId = localStorage.getItem("sessionId");
  const isnewOwner = useSelector(
    (state: RootState) => state.adminData.data[0].isNewOwner
  );
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
        dispatch(getselectedorgs({ orgname: username, type: "owner" }));
        dispatch(getViewAccess(response.data.data.processes_to_portfolio));
      }
    } else {
      dispatch(isNewOwner(null));
    }
  };
  fetchIsOwnerData();
  const getTeammembers = useSelector(
    (state: RootState) => state.adminData.data[0]?.members.team_members.accept_members

  );
//   useEffect(() => {
//     const fetchPortfolios = async () => {
//       try {
//         const response = await Axios93Base.post("/portfolio_reports/", {
//           username: username,
//         });

//         setPortfolioReport(response.data);
//       } catch (error) {
//         console.log("error =", error);
//       }
//     };
//     fetchPortfolios();
//   }, [username]);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };
  const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );

  const handleSubmitDepartment = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLoading(true)
    event.preventDefault();

    const postdepartment = async () => {
      if (!formInputs.departmentName) {
        toast.error("Department name is required.");
        return; 
      }
      if (!formInputs.departmentId) {
        toast.error("Department Id is required.");
        return; 
      }
      if (!formInputs.departmentHead) {
        toast.error("Department Head is required.");
        return;
      }
  const client_admin_id = userData.userinfo.client_admin_id
      try {
        setLoading(true)
        const dataDepartment={
          "workspace_id":client_admin_id,
          "dept_name":formInputs.departmentName,
          "dept_id":formInputs.departmentId,
          "dept_head":formInputs.departmentHead
      }
      console.log(dataDepartment)

        await Axios93Base.post("/departments/", dataDepartment);

        dispatch(
          getdepartment({
            "workspace_id":client_admin_id,
            "dept_name":formInputs.departmentName,
            "dept_id":formInputs.departmentId,
            "dept_head":formInputs.departmentHead
          })
        );
        setLoading(false)
        toast.success("success");
        // dispatch(getloaderstate(false));
      } catch (error) {
        toast.error("Failure")
        setLoading(false)
      }

      // fetch product
    };

    // Call the API when the component mounts
    postdepartment();

    // Make your API call here using the selectedLanguage value
    // For example:
  };
  return (
    <div className="w-full my-10 relative lg:justify-center lg:flex">
      <ToastContainer position="top-right" />

      {Object.prototype.toString.call(getTeammembers) === "[object Array]" ? (
             <div className="lg:w-1/2  h-full border border-[#54595F] card-shadow px-[30px] pb-4">
             <span
               className={`${
                 color_scheme == "Red"
                   ? "bg-[#DC4C64]"
                   : color_scheme == "Green"
                   ? "bg-[#14A44D]"
                   : "bg-[#7A7A7A]"
               } font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col`}
             >
               <p id="portfolioForm1Text1" className="text-center">Department</p>
             </span>
         <form>

         {/* department name  */}
         <div className="mb-4">
           <div className="flex items-center gap-3">
             <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
               <span id="departmentName">Department Name </span>
               <span className="text-[#ff0000] text-base">*</span>
             </label>
           
           </div>
           <div className="w-full">
             <input
               type="text"
               placeholder="Department Name"
               className="w-full outline-none border border-black mb-[10px] p-2 rounded-[4px]"
               id="departmentName"
               onChange={handleOnChange}
               value={formInputs.departmentName}
             />
           </div>
         </div>

          {/* department id  */}
          <div className="mb-4">
           <div className="flex items-center gap-3">
             <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
               <span id="departmentId">Department Id </span>
               <span className="text-[#ff0000] text-base">*</span>
             </label>
           
           </div>
           <div className="w-full">
             <input
               type="number"
               placeholder="Department Id"
               className="w-full outline-none border border-black mb-[10px] p-2 rounded-[4px]"
               id="departmentId"
               onChange={handleOnChange}
               value={formInputs.departmentId}
             />
           </div>
         </div>
         <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
              <span id="departmentHead">Select Department Head </span>
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <select
              required
              onChange={handleSelectStatus}
              value={formInputs.departmentHead}
              id="departmentHead"
              name="departmentHead"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              placeholder="Select Product"
            >
              <option value="">...select...</option>
              {getTeammembers?.map((team, index) => (
                <option key={index} value={team.first_name+ " "+ team.last_name}>
                  {" "}
                  {team.first_name+" "+team.last_name}{" "}
                </option>
              ))}
            </select>
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
          onClick={handleSubmitDepartment}
        >
          {loading ? "Creating":"Create Department"}
        </button>
         </form>
         </div>
       ) : ( 
        <Loader />
      )} 
    </div>
  );
};

export default Department;
