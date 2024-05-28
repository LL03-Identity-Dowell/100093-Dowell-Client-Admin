import { useEffect, useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/Store";
import Loader from "../../pages/whiteloader";
import { Axios93Base } from "../../api/axios";
import {ClassInput} from "../../pages/solutionTypes"
import { isNewOwner, setAdminData } from "../../store/slice/adminData"
import { getselectedorgs } from "../../store/slice/selectedorg";
import { getViewAccess } from "../../store/slice/viewAccess";

const initialFormInputs: ClassInput = {
  className:"",
  portfolio:[]
  };

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
  const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  return (
    <div className="w-full my-10 relative overflow-x-scroll">
      {Object.prototype.toString.call(portfolioReport) === "[object Array]" ? (
         <form>

         {/* department name  */}
         <div className="mb-4">
           <div className="flex items-center gap-3">
             <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
               <span id="className">Class Name </span>
               <span className="text-[#ff0000] text-base">*</span>
             </label>
           
           </div>
           <div className="w-full">
             <input
               type="text"
               placeholder="Class Name"
               className="w-full outline-none border border-black mb-[10px] p-2 rounded-[4px]"
               id="className"
               onChange={handleOnChange}
               value={formInputs.className}
             />
           </div>
         </div>

          {/* portfolio  */}
         <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
              <span id="portfolio">Select Portfolio </span>
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <select
              required
              onChange={handleSelectStatus}
              value={formInputs.portfolio}
              id="portfolio"
              name="portfolio"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              placeholder="Select Portfolio"
            >
              <option value="">...select...</option>
              {portfolioReport?.map((portfolio, index) => (
                <option key={index} value={portfolio.portfolio_name}>
                  {" "}
                  {portfolio.portfolio_name}{" "}
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
                        >
                          Create Class
                        </button>
         </form>
       ) : ( 
        <Loader />
      )} 
    </div>
  );
};

export default Class;
