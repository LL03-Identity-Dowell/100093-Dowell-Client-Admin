import { useEffect, useState } from "react";
import {  Axios93Base } from "../api/axios";
import Loader from "./whiteloader";
import { ToastContainer, toast } from "react-toastify";

interface userDetailProps {
  Email:string;
  Firstname:string; 
  Lastname: string;
  Phone:number;
  Profile_Image:string;
  Role:string;
  Team_Code:string;
  Username:string;
  company_id:string;
  document_id:string;
  phonecode:string;
  _id:string;
}

interface schoolClass {
  class_name : string;
  portfolio : string;
  workspace_id : string;
  _id : string
}

const UserDetails = () => {

  const [loading, setLoading] = useState(true);
  const [userDetail, setUserDetails] = useState<userDetailProps>();
  const [portfolio, setportfolio] = useState(false)
  const [portfolio_test, set_PortFolio_Test] = useState<schoolClass>()
  const [bus_portfolio, set_bus_portfolio] = useState();
  const [no_portfolio, set_no_portfolio] = useState(false)
console.log(loading)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
  const qrCodeId = urlParams.get("qrid");
  // get workspace id and portfolio from search param 
  const urlParamsworkspaceid = urlParams.get("workspace_id");
  const urlParamsportfolio = urlParams.get("portfolio");
  if(urlParamsportfolio){
    setportfolio(true)
  }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await Axios93Base.post("/getqrdetails", {
          qrid: qrCodeId, 
        });
        setUserDetails(response.data)

        const response_portfolio_test = await Axios93Base.post("/portfoliotest", {
          portfolio: urlParamsportfolio,
          owner_id: urlParamsworkspaceid
      });
      if (response_portfolio_test.data.hasOwnProperty('class')) {
        set_PortFolio_Test(response_portfolio_test.data.class)
        
      } else if(response_portfolio_test.data.hasOwnProperty('bus')) {
        set_bus_portfolio(response_portfolio_test.data.bus)
      }
      else {
        set_no_portfolio(true)
        toast.error("No Portfolio found in database")

      }
      } catch (error) {
        // console.error("Error generating link:", error);
        // Handle the error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div>
      <ToastContainer position="top-right" />

      {portfolio ? 
      <div> {bus_portfolio && userDetail ?
        <div>
        {/* class form  */}
        <div className="flex items-center justify-center h-screen">  
            <div className="relative flex flex-col text-gray-700 p-5 bg-white shadow-lg bg-clip-border rounded-xl lg:w-[30rem] md:w-[30rem] w-full mx-auto">
              <h1 className="text-center mb-3 font-dark">Bus Form</h1>
              <p className="block mb-5 font-sans text-sm antialiased mx-auto font-normal leading-normal text-gray-900 opacity-75">
              Do you want to mark attendance for {userDetail.Username}
              </p>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-75 bg-gray-900 text-gray-100 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button"
                    >
                    Yes
                  </button>
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-75 bg-gray-900 text-gray-100 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button">
                    No
                  </button>

                </div>
               
                 
              </div>
            
                
            </div>
          </div>
          
        {/* class form  */}
      </div>:portfolio_test && userDetail ? 
      // bus form 
      <div className="flex items-center justify-center h-screen">  
            <div className="relative flex flex-col text-gray-700 p-5 bg-white shadow-lg bg-clip-border rounded-xl lg:w-[30rem] md:w-[30rem] w-full mx-auto">
              <h1 className="text-center mb-3 font-dark">Class Form</h1>
              <p className="block mb-5 font-sans text-sm antialiased mx-auto font-normal leading-normal text-gray-900 opacity-75">
              Do you want to mark attendance for {userDetail.Username}
              </p>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-75 bg-gray-900 text-gray-100 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button"
                    >
                    Yes
                  </button>
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-75 bg-gray-900 text-gray-100 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button">
                    No
                  </button>

                </div>
               
                 
              </div>
            
                
            </div>
          </div>
      // bus form 
      :no_portfolio ? 
      <div className="flex items-center justify-center h-screen">  
            <div className="relative flex flex-col text-gray-700 p-5 bg-white shadow-lg bg-clip-border rounded-xl lg:w-[30rem] md:w-[30rem] w-full mx-auto">
              <h1 className="text-center mb-3 font-dark">No Portfolio</h1>
              <p className="block mb-5 font-sans text-sm antialiased mx-auto font-normal leading-normal text-gray-900 opacity-75">
              No Portfolio Found in database
              </p>
              <div className="p-6 text-center mx-auto">
                
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-75 bg-gray-900 text-gray-100 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button">
                    Cancel
                  </button>

               
                 
              </div>
            
                
            </div>
          </div>
          
      
      :<Loader/>}</div>: <div>
      {userDetail?<div className="py-[5rem] lg:px-[5rem] md:px-[4rem] sm:px[2rem] xs:px=[3rem]">
<div className="flex justify-center items-center">
  <div className="w-full sm:w-6/12 md:w-1/3 lg:w-2/4 rounded-lg shadow-md bg-white overflow-hidden">
    <img className="w-full h-48 rounded-full object-contain" src={userDetail.Profile_Image} alt="User Image"/>
    <div className="p-4">
      <h5 className="text-xl font-bold tracking-tight text-green-400 text-center">Personal Details & Information</h5>
    </div>
    <dl className="divide-y divide-gray-100">
    <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 lg:px-[5rem] md:px-[4rem] sm:px[2rem] xs:px=[3rem]">
        <dt className="text-sm font-medium leading-6 text-gray-900">Username</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetail.Username}</dd>
      </div>
      <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 lg:px-[5rem] md:px-[4rem] sm:px[2rem] xs:px=[3rem]">
        <dt className="text-sm font-medium leading-6 text-gray-900">First name</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetail.Firstname}</dd>
      </div>
      <div className=" py-6 sm:grid sm:grid-cols-3 sm:gap-4 lg:px-[5rem] md:px-[4rem] sm:px[2rem] xs:px=[3rem]">
        <dt className="text-sm font-medium leading-6 text-gray-900">Last name</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetail.Lastname}</dd>
      </div>
      <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 lg:px-[5rem] md:px-[4rem] sm:px[2rem] xs:px=[3rem]">
        <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetail.Email}</dd>
      </div>
     
    </dl>
  
  </div>
</div>



</div>:<Loader/>}
    </div>}
    </div>
   
  );
};

export default UserDetails;
