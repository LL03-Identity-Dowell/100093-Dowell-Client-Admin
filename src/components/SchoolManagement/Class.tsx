import { useEffect, useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/Store";
import Loader from "../../pages/whiteloader";
import { Axios93Base } from "../../api/axios";
import {ClassInput} from "../../pages/solutionTypes"
import { isNewOwner, setAdminData } from "../../store/slice/adminData"
import { getselectedorgs } from "../../store/slice/selectedorg";
import { getViewAccess } from "../../store/slice/viewAccess";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { getschoolclass } from "../../store/slice/class";

const initialFormInputs: ClassInput = {
  className:"",
  portfolio:""
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
  
  interface SchoolClassProps {
  class_name:string,
portfolio:string,
workspace_id:number,
_id:number
}

interface BusProps {
  bus_admin:string
  bus_num:number
  portfolio:number,
  workspace_id:number,
  _id:number,
}

const Class = () => {
  const [formInputs, setFormInputs] = useState(initialFormInputs);
  const [portfolioReport, setPortfolioReport] = useState<portfolioProps[]>();
  const [schoolclass, setSchoolClass] = useState<SchoolClassProps[]>();
  const [bus, setBus] = useState<BusProps[]>();
  const [loading, setLoading] = useState(false)
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
      } catch (error) {
        console.log("error =", error);
      }
    };
    fetchPortfolios();
  }, [username]);
  const client_admin_id = userData.userinfo.client_admin_id;
    // fetch class names 
    useEffect(() => {
      const fetchClass = async () => {
        try {
          const response = await Axios93Base.post("/class/", {
            owner_id: client_admin_id,
          });
          setSchoolClass(response.data.data);
          console.log(response.data)
        } catch (error) {
          console.log("error =", error);
        }
      };
      fetchClass();
    }, [client_admin_id]);
  
      // fetch Bus number 
      useEffect(() => {
        const fetchBus = async () => {
          try {
            const response = await Axios93Base.post("/bus/", {
              owner_id: client_admin_id,
            });
            setBus(response.data.data);
            console.log(response.data)
          } catch (error) {
            console.log("error =", error);
          }
        };
        fetchBus();
      }, [client_admin_id]);
  
   

  
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };
  const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  
  const livingLabMap_Portfolios = portfolioReport?.filter(item => item.product === 'Living Lab Maps')|| [];
  const portfolioNames = livingLabMap_Portfolios.map(item => item.portfolio_name);
  const class_portfolio :string[] | undefined = schoolclass?.map(item => item.portfolio);
  const bus_portfolio : string[] | undefined | any = bus?.map(item => item.portfolio);
 

  const livingLabMapPortfolios = portfolioNames.filter(item => !class_portfolio?.includes(item) && !bus_portfolio?.includes(item));

  const handleSubmitClass = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const postClass = async () => {
      if (!formInputs.className) {
        toast.error("Class name is required.");
        return; 
      }
      if (!formInputs.portfolio) {
        toast.error("Select Portfolio.");
        return; 
      }
  const client_admin_id = userData.userinfo.client_admin_id
      try {
        setLoading(true)
        const dataClass={
          "workspace_id":client_admin_id,
          "class_name":formInputs.className,
          "portfolio":formInputs.portfolio
      }
      console.log(dataClass)

        await Axios93Base.post("/class/", dataClass);

        dispatch(
          getschoolclass({
            "workspace_id":client_admin_id,
            "class_name":formInputs.className,
            "portfolio":formInputs.portfolio
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
    postClass();

    // Make your API call here using the selectedLanguage value
    // For example:
  };
  return (
    <div className="w-full my-10 relative lg:justify-center lg:flex">
      <ToastContainer position="top-right" />

      {Object.prototype.toString.call(portfolioReport) === "[object Array]" ? (
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
              <p id="portfolioForm1Text1" className="text-center">Class</p>
            </span>
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
              {livingLabMapPortfolios?.length > 0 ?( 
              livingLabMapPortfolios?.map((portfolio, index) => (
                <option key={index} value={portfolio}>
                  {" "}
                  {portfolio}{" "}
                </option>
              )) ) : (
                <option>No portfolios exist</option>
            )}
            </select>
        </div>        

        <button
          id="portfoliotext43"
          onClick={handleSubmitClass}
          className={`w-full ${
            color_scheme == "Red"
              ? "bg-[#DC4C64]"
              : color_scheme == "Green"
              ? "bg-[#14A44D]"
              : "bg-[#7A7A7A]"
          }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
        >
          {loading ? "Creating":"Create Class"}
        </button>
      </form>
      </div>
       ) : ( 
        <Loader />
      )} 
    </div>
  );
};

export default Class;
