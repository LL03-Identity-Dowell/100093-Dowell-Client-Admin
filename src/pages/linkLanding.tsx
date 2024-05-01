import  { useEffect, useState,ChangeEvent } from 'react';
import {  Axios93Base } from "../api/axios";
import { toast } from "react-toastify";

type LinkLandingInput = {
    id: string,
    form: string,
    email: string,
  }

const initialPublicFormInputs: LinkLandingInput = {
    id: "",
    form: "",
    email :""
  };
  const PublicForm = () => {
    const [loading, setLoading] = useState(false);
    const [formInputs, setFormInputs] = useState(initialPublicFormInputs);
    console.log(formInputs)
    const urlParams = new URLSearchParams(window.location.search);
    const linkid = urlParams.get("id");
    const handleRequestButton = async () => {
      if (!formInputs.email || !validateEmail(formInputs.email)) { // Check if email is empty or invalid
        toast.error('Please enter a valid email address.');
        return;
      }
      try {
        setLoading(true);
        const response = await Axios93Base.post("activatelink/", {
          id: linkid,
          form:"request",
          email:formInputs.email
        });
        console.log( linkid,formInputs.email)
        console.log("Requestes link:", response.data);
        toast.success("Requested Successfully");
  
        // Handle the response data as needed
      } catch (error) {
        console.error("Error generating link:", error);
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
          <>
            <div className="flex items-center justify-center h-screen">  
              <div className="relative flex flex-col text-gray-700 p-5 bg-white shadow-lg bg-clip-border rounded-xl lg:w-[30rem] md:w-[30rem] w-full mx-auto">
                <p className="block mb-5 font-sans text-sm antialiased mx-auto font-normal leading-normal text-gray-900 opacity-75">
                  Do Yoy want to request collection?
                </p>
                <form>
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
                </form>
              </div>
            </div>
         </>
      )
  }


const TeamMemberForm = () => {
  const [loading, setLoading] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const linkid = urlParams.get("id");
  const handleYesButton = async () => {
    try {
      setLoading(true);
      const response = await Axios93Base.post("activatelink/", {
        id: linkid,
        form:"collect"
      });
      console.log("Requestes link:", response.data);
      toast.success("Data Collected Successfully!");

      // Handle the response data as needed
    } catch (error) {
      console.error("Error generating link:", error);
      // Handle the error
    } finally {
      setLoading(false);
    }
  };
    return(
      <>
      <div className="flex items-center justify-center h-screen bor">  
        <div className="rounded-lg relative flex flex-col text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl lg:w-[30rem] md:w-[30rem] w-full mx-auto">
          <p className="block mb-5 font-sans text-sm antialiased mx-auto font-normal leading-normal text-gray-900 opacity-75">
            Do Yoy want to mark it as collected?
          </p>
          <form>
              
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
          </form>
        </div>
      </div>
   </>
    )
}

const LinkLanding = () => {
//   const [loading, setLoading] = useState(true);
  const [type, setType] = useState("")
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
console.log(id)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const response = await Axios93Base.post("checktype/", {
          id: id, 
        });
        console.log("type:", response.data);
        setType(response.data.type)
        // Handle the response data as needed
      } catch (error) {
        console.error("Error generating link:", error);
        // Handle the error
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div>
      {type == "public" ? <PublicForm/> : <TeamMemberForm/>}
    </div>
  );
};

export default LinkLanding;


