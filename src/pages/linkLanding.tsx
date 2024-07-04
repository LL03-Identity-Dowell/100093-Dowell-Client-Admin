import { useEffect, useState ,ChangeEvent} from 'react';
import {  Axios93Base } from "../api/axios";
import { LinkLandingInput } from "./solutionTypes";
import { toast } from "react-toastify";
import admin_logo from "../assets/Living-Lab-Admin-1.png";
import {Helmet} from "react-helmet";
import Loader from './whiteloader';
import axios from 'axios';

const initialPublicFormInputs: LinkLandingInput = {
  id: "",
  form: "",
  email :"",
  username:"",
  // weight:0,
};
const PublicForm = () => {
  const [loading, setLoading] = useState(false);
  const [formInputs, setFormInputs] = useState(initialPublicFormInputs);
  const [submissionMessage, setSubmissionMessage] = useState(""); // State to hold submission message
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // New state to track submission success

  // console.log(formInputs)
  const urlParams = new URLSearchParams(window.location.search);
  const linkid = urlParams.get("id");
  const handleRequestButton = async () => {
    if (!formInputs.username) { 
      toast.error('Please enter username.');
      return;
    }
    // if (!formInputs.weight) { 
    //   toast.error('Please enter Weight.');
    //   return;
    // }
    if (!formInputs.email || !validateEmail(formInputs.email)) { // Check if email is empty or invalid
      toast.error('Please enter a valid email address.');
      return;
    }
   
    try {
      setLoading(true);
      const response = await Axios93Base.post("activatelink/", {
        id: linkid,
        form:"request",
        email:formInputs.email,
        name: formInputs.username,
        // weight:formInputs.weight
      });
      // console.log( linkid,formInputs.email)
      // console.log("Requestes link:", response.data);
      if(response.data.message.isSuccess){
        setSubmissionMessage("We have received your request")
        toast.success("We have recieved your request");
        setSubmissionSuccess(true); // Set submission success state
        setFormInputs(initialPublicFormInputs)
        // window.location.reload(); // Reload the page

      }
      else{
        setSubmissionMessage("Sorry, your request was not received");
        toast.error("Sorry Your request is not recieved");
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
      setLoading(false);
    }
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };
    // Function to validate email format
    const validateEmail = (email: string) => {
      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    return(
        <div>
           <Helmet>
                <meta charSet="utf-8" />
                <title>Submit a request for collection</title>
                <meta name="description" content="Submit a request for collection" />
                <meta property="og:title" content="Request Form" />
                <meta property="og:description" content="Submit a request for collection" />
                <meta property="og:image" content={admin_logo} />
            </Helmet>
          <div className="flex items-center justify-center h-screen">  
            <div className="relative flex flex-col text-gray-700 p-5 bg-white shadow-lg bg-clip-border rounded-xl lg:w-[30rem] md:w-[30rem] w-full mx-auto">
              <p className="block mb-5 font-sans text-sm antialiased mx-auto font-normal leading-normal text-gray-900 opacity-75">
                Do You want to request collection?
              </p>
              <form>
                {/* <input type='number' onChange={handleOnChange} id='weight' required value={formInputs.weight} placeholder='waight of waste' className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/> */}
                <input type="text" onChange={handleOnChange} id='username' required value={formInputs.username} placeholder='Enter name'  className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <input type="email" id='email' required onChange={handleOnChange} value={formInputs.email} placeholder='enter email'  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                {/* <input type="text" name="form" id='form' value="request" hidden/>
                <input type="text" name="id"   id="id" value={linkid} hidden/> */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-75 bg-gray-900 text-gray-100 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button"
                    onClick={handleRequestButton}
                    >
                    {loading ? "Requesting" : "Request"}
                  </button>
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-75 bg-gray-900 text-gray-100 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button">
                    Cancel
                  </button>

                </div>
               
                 
              </div>
              {submissionMessage &&     <div className={`${submissionSuccess ? "bg-green-100" : "bg-orange-100"} border-l-4 ${submissionSuccess ? "border-green-500" : "border-orange-500"}-500 ${submissionSuccess ? "text-green-700" : "text-orange-700"}-700 p-4`} role="alert">
                <p>{submissionMessage}</p>
              </div>
                } 
              </form>
            </div>
          </div>
       </div>
    )
}
const TeamMemberForm = () => {
  const [loading, setLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState(""); // State to hold submission message
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // New state to track submission success

  const urlParams = new URLSearchParams(window.location.search);
  const linkid = urlParams.get("id");
  const handleYesButton = async () => {
    try {
      setLoading(true);
      const response = await Axios93Base.post("activatelink/", {
        id: linkid,
        form:"collect"
      });
      // console.log("Requestes link:", response.data);
      if(response.data.message.isSuccess){
        toast.success("The Bin is Collected!");
        setSubmissionMessage("The Bin is Collected!")
        setSubmissionSuccess(true); // Set submission success state
        // setFormInputs(initialPublicFormInputs)

      }
      else{
        toast.error("Something went wrong, contact sys admin");
        setSubmissionMessage("Something went wrong, contact sys admin");
        setSubmissionSuccess(false); // Set submission success state
      }

      // Handle the response data as needed
    } catch (error) {
      // console.error("Error generating link:", error);
        setSubmissionMessage("Something went wrong, contact sys admin!");
        toast.error("Something went wrong, contact sys admin!");
        setSubmissionSuccess(false); // Set submission success state
      // Handle the error
    } finally {
      setLoading(false);
    }
  };
    return(
      <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Mark the bins as collected</title>
                <meta name="description" content="Mark the bins as collected" />
                <meta property="og:title" content="Collection Form" />
                <meta property="og:description" content="Mark the bins as" />
                <meta property="og:image" content={admin_logo} />
        </Helmet>
      <div className="flex items-center justify-center h-screen bor">  
        <div className="rounded-lg relative flex flex-col text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl lg:w-[30rem] md:w-[30rem] w-full mx-auto">
          <p className="block mb-5 font-sans text-sm antialiased mx-auto font-normal leading-normal text-gray-900 opacity-75">
            Do You want to mark it as collected?
          </p>
          <form>
                <input type="text" name="form" value="collect" hidden/>
                <input type="text" name="id"  value="iddynamic" hidden/>
             
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-75 bg-gray-900 text-gray-100 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                type="button"
                onClick={handleYesButton}
                >
                {loading ? "Collecting":  "Yes"}
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
          </form>
        </div>
      </div>
   </>
    )
}

const LinkLanding = () => {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("")
  const [location, setLocation] = useState()
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [userLocaition, setUserLocation] = useState({})
  
  // const urlParams = new URLSearchParams(window.location.search);
  // const id = urlParams.get("id");
  // function to get location 
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
getLocation();
  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const workspaceid = urlParams.get("workspace_id");
      const team_name = urlParams.get("team_name");
        if(team_name){
          // calling api if team name found 
          try {
            setLoading(true);
            const response = await Axios93Base.post("teamcheckq", {
              admin_id: workspaceid,
              team_name:team_name 
            });
            console.log("team:", response);
            // setType("guhgu")
            if(response.data.message=="sucess"){
              setType("team")
              generateRandomLocations(10, latitude,longitude)
              locationVerification()
            }
            else{
              setType("xyz")
            }
            // Handle the response data as needed
          } catch (error) {
            // console.error("Error generating link:", error);
            // Handle the error
          } finally {
            setLoading(false);
          }
        }
        else{
          setType("public")
        }
    };

    fetchData();
  }, [latitude, longitude,userLocaition]); // Empty dependency array to run the effect only once on component mount

  // function to get random locations 
  const generateRandomLocations = (numLocations:number, refLat:number, refLng:number) => {
    const randomLocations = [];
    for (let i = 0; i < numLocations; i++) {
      const randomLat = refLat + (Math.random() - 0.5) * 0.001; // Adjust the range as needed
      const randomLng = refLng + (Math.random() - 0.5) * 0.001; // Adjust the range as needed
      randomLat.toFixed(7)
      randomLng.toFixed(7)
      randomLocations.push([ randomLat,  randomLng ]);
    }
    setUserLocation(randomLocations)
  };

  const  locationVerification = async ()=>{
    const location_payload ={
      radius:2,
      reference_point:[latitude,longitude],
      locations: userLocaition,
      unit:"meters"
    }
    try {
      const response = await axios.post("https://100070.pythonanywhere.com/check-distance/", location_payload);
      // console.log("type:", response.data);
      setLocation(response.data)
      console.log("location rfesponse",response.data)
      // Handle the response data as needed
    } catch (error) {
      // console.error("Error generating link:", error);
      // Handle the error
    } finally {
    }
  }
  return (
    <div>
      {type ? <div>{type == "public" ? <PublicForm/> :type=="team"? <TeamMemberForm/>: <div className="flex items-center justify-center h-screen">  
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
          </div>} </div>: <Loader/> }
      {/* {type == "public" ? <PublicForm/> : <TeamMemberForm/>} */}
    </div>
  );
};

export default LinkLanding;


