import { useEffect, useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/Store";
import Loader from "../../pages/whiteloader";
import { Axios93Base } from "../../api/axios";
import {BusInput} from "../../pages/solutionTypes"
import { isNewOwner, setAdminData } from "../../store/slice/adminData"
import { getselectedorgs } from "../../store/slice/selectedorg";
import { getViewAccess } from "../../store/slice/viewAccess";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { getbus } from "../../store/slice/bus";

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

const initialFormInputs: BusInput = {
    busNumber:"",
    portfolio:"",
    admin:""
  };
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
  const [loading, setLoading] = useState(false)
  const userData = useSelector((state: RootState) => state.userinfo);
  const [schoolclass, setSchoolClass] = useState<SchoolClassProps[]>();
  const [bus, setBus] = useState<BusProps[]>();
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
  const getTeammembers = useSelector(
    (state: RootState) => state.adminData.data[0]?.members.team_members.accept_members

  );
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
  console.log(livingLabMap_Portfolios)
  const portfolioNames = livingLabMap_Portfolios.map(item => item.portfolio_name);
  const class_portfolio :string[] | undefined = schoolclass?.map(item => item.portfolio);
  const bus_portfolio : string[] | undefined | any = bus?.map(item => item.portfolio);
  console.log(portfolioNames);
  console.log(class_portfolio);
  console.log(bus_portfolio); 

  const livingLabMapPortfolios = portfolioNames.filter(item => !class_portfolio?.includes(item) && !bus_portfolio?.includes(item));

console.log(livingLabMapPortfolios);  
  const handleSubmitBus = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const postBus = async () => {
      if (!formInputs.busNumber) {
        toast.error("Bus number is required.");
        return;
      }
      if (!formInputs.portfolio) {
        toast.error("Select Portfolio.");
        return; 
      }
      if (!formInputs.admin) {
        toast.error("Select Admin.");
        return; 
      }
  const client_admin_id = userData.userinfo.client_admin_id
      try {
        setLoading(true)
        const dataBus={
          "workspace_id":client_admin_id,
          "bus_num":formInputs.busNumber,
          "portfolio":formInputs.portfolio,
          "bus_admin":formInputs.admin
      }
      console.log(dataBus)

        await Axios93Base.post("/bus/", dataBus);

        dispatch(
          getbus({
            "workspace_id":client_admin_id,
            "bus_num":formInputs.busNumber,
            "portfolio":formInputs.portfolio,
            "bus_admin":formInputs.admin
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
    postBus();

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
              <p id="portfolioForm1Text1" className="text-center">Bus</p>
            </span>
        <form>

         {/* bus number  */}
         <div className="mb-4">
           <div className="flex items-center gap-3">
             <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
               <span id="busNumber">Bus Number</span>
               <span className="text-[#ff0000] text-base">*</span>
             </label>
           
           </div>
           <div className="w-full">
             <input
               type="text"
               placeholder="Bus Number"
               className="w-full outline-none border border-black mb-[10px] p-2 rounded-[4px]"
               id="busNumber"
               onChange={handleOnChange}
               value={formInputs.busNumber}
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
          {/* admin  */}
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
              <span id="admin">Select Admin </span>
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <select
              required
              onChange={handleSelectStatus}
              value={formInputs.admin}
              id="admin"
              name="admin"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              placeholder="Select Admin"
            >
              <option value="">...select...</option>
              {getTeammembers?.map((admin, index) => (
                <option key={index} value={admin.first_name + " "+ admin.last_name}>
                  {" "}
                  {admin.first_name+" "+admin.last_name}{" "}
                </option>
              ))}
            </select>
          </div>


         <button
          id="portfoliotext43"
          onClick={handleSubmitBus}
          className={`w-full ${
            color_scheme == "Red"
              ? "bg-[#DC4C64]"
              : color_scheme == "Green"
              ? "bg-[#14A44D]"
              : "bg-[#7A7A7A]"
          }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
        >
          {loading ? "Creating":"Create Bus"}
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
