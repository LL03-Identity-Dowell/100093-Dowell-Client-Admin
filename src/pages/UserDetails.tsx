import { useEffect, useState } from "react";
import {  Axios93Base } from "../api/axios";
import Loader from "./whiteloader";
import { ToastContainer, toast } from "react-toastify";
import user from "../components/images";
import axios from "axios";
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

interface schoolBus {
  bus_admin:string;
  bus_num:string;
  portfolio:string;
  workspace_id:string;
  _id:string;
}
const UserDetails = () => {

  const [loading, setLoading] = useState(true);
  const [userDetail, setUserDetails] = useState<userDetailProps>();
  const [portfolio, setportfolio] = useState(false)
  const [portfolio_test, set_PortFolio_Test] = useState<schoolClass>()
  const [bus_portfolio, set_bus_portfolio] = useState<schoolBus>();
  const [no_portfolio, set_no_portfolio] = useState(false)
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [submissionMessage, setSubmissionMessage] = useState(""); // State to hold submission message
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // New state to track submission success
  const [classYesLoader, setClassYesLoader] = useState(false)
  const [busYesLoader, setBusYesLoader] = useState(false)
  const [busSubmissionMessage, setBusSubmissionMessage] = useState(""); // State to hold submission message
  const [busSubmissionSuccess, setBusSubmissionSuccess] = useState(false); // New state to track submission success
  
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

// get user current time 
  function getCurrentTimeISO() {
    const currentDate = new Date();
    return currentDate.toISOString();
  }
  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position:any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("Latitude: " + latitude + " Longitude: " + longitude);
    setLatitude(latitude)
    setLongitude(longitude)
}

function showError(error:any) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}

// Call the function to get location
getLocation();
  // handle clas yes button 
  const handleClassYesButton = async () => {
    setSubmissionMessage("")
   const current_time = getCurrentTimeISO()
    try {
      setClassYesLoader(true);
      const response = await axios.post("https://100086.pythonanywhere.com/attendance/classes?api_key=0699dbbb-2786-4dfa-a1db-fc12f2210228", {
        class_name: portfolio_test?.class_name,
        lat: latitude,
        lon: longitude,
        datetime:  current_time,
        workspace_id: portfolio_test?.workspace_id,
        student_name: userDetail?.Username
      });
      // console.log( linkid,formInputs.email)
      // console.log("Requestes link:", response.data);
      console.log(response)
      if(response.data.success){
        setSubmissionMessage("Attendance Marked")
        toast.success("Attendance Marked");
        setSubmissionSuccess(true); // Set submission success state
        // window.location.reload(); // Reload the page

      }
      else{
        setSubmissionMessage(response.data.text);
        toast.error(response.data.text);
        setSubmissionSuccess(false); // Set submission success state

      }

      // Handle the response data as needed
    } catch (error) {
      console.error("Error generating link:", error);
      setSubmissionMessage("Something went wrong, contact sys admin!");
      toast.error("Something went wrong, contact sys admin!");
      setSubmissionSuccess(false); // Set submission success state
      // Handle the error
    } finally {
      setClassYesLoader(false);
    }
  }
  const handleBusYesButton = async () => {
    setBusSubmissionMessage("")
   const current_time = getCurrentTimeISO()
   console.log(current_time)
    try {
      setBusYesLoader(true);
      const response = await axios.post("https://100086.pythonanywhere.com/attendance/buses?api_key=0699dbbb-2786-4dfa-a1db-fc12f2210228", {
        bus_name: bus_portfolio?.bus_num,
        lat: latitude,
        lon: longitude,
        datetime:  current_time,
        workspace_id: bus_portfolio?.workspace_id,
        student_name: userDetail?.Username
      });
      // console.log( linkid,formInputs.email)
      // console.log("Requestes link:", response.data);
      console.log(response)
      if(response.data.success){
        setBusSubmissionMessage("Attendance Marked")
        toast.success("Attendance Marked");
        setBusSubmissionSuccess(true); // Set submission success state
        // window.location.reload(); // Reload the page

      }
      else{
        setBusSubmissionMessage(response.data.text);
        toast.error(response.data.text);
        setBusSubmissionSuccess(false); // Set submission success state

      }

      // Handle the response data as needed
    } catch (error) {
      console.error("Error generating link:", error);
      setBusSubmissionMessage("Something went wrong, contact sys admin!");
      toast.error("Something went wrong, contact sys admin!");
      setBusSubmissionSuccess(false); // Set submission success state
      // Handle the error
    } finally {
      setBusYesLoader(false);
    }
  }
  return (
    <div>
      <ToastContainer position="top-right" />

      {portfolio ? 
      <div> {bus_portfolio && userDetail ?
        <div>
        {/* bus form  */}
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
                    onClick={handleBusYesButton}
                    >
                    {busYesLoader?"Marking Attendance":"Yes"}
                  </button>
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-75 bg-gray-900 text-gray-100 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button">
                    No
                  </button>

                </div>
               
                 
              </div>
              {busSubmissionMessage &&     <div className={`${busSubmissionSuccess ? "bg-green-100" : "bg-orange-100"} border-l-4 ${busSubmissionSuccess ? "border-green-500" : "border-orange-500"}-500 ${busSubmissionSuccess ? "text-green-700" : "text-orange-700"}-700 p-4`} role="alert">
                <p>{busSubmissionMessage}</p>
              </div>
                } 
                
            </div>
          </div>
          
        {/* bus form  */}
      </div>:portfolio_test && userDetail ? 
      // class form 
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
                    onClick={handleClassYesButton}
                    >
                    {classYesLoader ? "Marking Attendance":"Yes"}
                  </button>
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-75 bg-gray-900 text-gray-100 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button">
                    No
                  </button>

                </div>
               
                 
              </div>
              {submissionMessage &&     <div className={`${submissionSuccess ? "bg-green-100" : "bg-orange-100"} border-l-4 ${submissionSuccess ? "border-green-500" : "border-orange-500"}-500 ${submissionSuccess ? "text-green-700" : "text-orange-700"}-700 p-4`} role="alert">
                <p>{submissionMessage}</p>
              </div>
                } 
                
            </div>
          </div>
      // class form 
      :no_portfolio ? 
      <div className="flex items-center justify-center h-screen">  
            <div className="relative flex flex-col text-gray-700 p-5 bg-white shadow-lg bg-clip-border rounded-xl lg:w-[30rem] md:w-[30rem] w-full mx-auto">
              <h1 className="text-center mb-3 font-dark">You are not authorized for this action</h1>
              {/* <p className="block mb-5 font-sans text-sm antialiased mx-auto font-normal leading-normal text-gray-900 opacity-75">
              No Portfolio Found in database
              </p> */}
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
  {userDetail.Profile_Image!==" "?
    <img className="w-full h-48 rounded-full object-contain" src={userDetail.Profile_Image} alt="User Image"/>
   : <img className="w-full h-48 rounded-full object-contain" src={user.user} alt="user Image" />
  }

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
