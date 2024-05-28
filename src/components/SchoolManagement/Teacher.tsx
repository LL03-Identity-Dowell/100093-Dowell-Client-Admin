import { useEffect, useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/Store";
import Loader from "../../pages/whiteloader";
import { Axios93Base } from "../../api/axios";
import {TeacherInput} from "../../pages/solutionTypes"
import { isNewOwner, setAdminData } from "../../store/slice/adminData"
import { getselectedorgs } from "../../store/slice/selectedorg";
import { getViewAccess } from "../../store/slice/viewAccess";

interface portfolioProps {
  data_type: string;
  member_type: string;
  operations_right: string;
  portfolio_code: string;
  portfolio_details: string;
  portfolio_name: string;
  portfolio_specification: string;
  portfolio_uni_code: string;
  role: string;
  security_layer: string;
  product: string;
  status: string;
  username: string[];
}


const initialFormInputs: TeacherInput = {
  teacherName:"",
  departmentName:"",
  };
const Class = () => {
  const [formInputs, setFormInputs] = useState(initialFormInputs);
  const [portfolioReport, setPortfolioReport] = useState<portfolioProps[]>();
  const userData = useSelector((state: RootState) => state.userinfo);
  const username = userData.userinfo.username;
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

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await Axios93Base.post("/portfolio_reports/", {
          username: username,
        });

        setPortfolioReport(response.data);
        console.log(response.data)
      } catch (error) {
        console.log("error =", error);
      }
    };
    fetchPortfolios();
  }, [username]);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };

  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  return (
    <div className="w-full my-10 relative overflow-x-scroll">
      {Object.prototype.toString.call(portfolioReport) === "[object Array]" ? (
         <form>

         {/* teacher name  */}
         <div className="mb-4">
           <div className="flex items-center gap-3">
             <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
               <span id="teacherName">Teacher Name</span>
               <span className="text-[#ff0000] text-base">*</span>
             </label>
           
           </div>
           <div className="w-full">
             <input
               type="text"
               placeholder="Teacher Name"
               className="w-full outline-none border border-black mb-[10px] p-2 rounded-[4px]"
               id="teacherName"
               onChange={handleOnChange}
               value={formInputs.teacherName}
             />
           </div>
         </div>

         
         {/* department name  */}
         <div className="mb-4">
           <div className="flex items-center gap-3">
             <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
               <span id="departmentName">Department Name</span>
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
          Create Teacher
        </button>
         </form>
       ) : ( 
        <Loader />
      )} 
    </div>
  );
};

export default Class;
