import { useEffect, useState } from "react";
import {  Axios93Base } from "../api/axios";
import Loader from "./whiteloader";

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

const UserDetails = () => {

  const [loading, setLoading] = useState(true);
  const [userDetail, setUserDetails] = useState<userDetailProps>();
  const urlParams = new URLSearchParams(window.location.search);
  const qrCodeId = urlParams.get("qrid");
console.log(loading)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await Axios93Base.post("/getqrdetails", {
          qrid: qrCodeId, 
        });
        console.log("type:", response.data);
        setUserDetails(response.data)
        // Handle the response data as needed
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
      {userDetail?   <div className="py-[5rem] lg:px-[5rem] md:px-[4rem] sm:px[2rem] xs:px=[3rem]">
<div className="flex justify-center items-center">
  <div className="w-full sm:w-6/12 md:w-1/3 lg:w-2/4 rounded-lg shadow-md bg-white overflow-hidden">
    <img className="w-full h-48 object-contain" src={userDetail.Profile_Image} alt="User Image"/>
    <div className="p-4">
      <h5 className="text-xl font-bold tracking-tight text-green-400 text-center">Personal Details & Information</h5>
    </div>
    <dl className="divide-y divide-gray-100">
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
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetail.Lastname}</dd>
      </div>
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 lg:px-[5rem] md:px-[4rem] sm:px[2rem] xs:px=[3rem]">

        <dt className="text-sm font-medium leading-6 text-gray-900">Phone</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetail.Phone}</dd>
      </div>
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 lg:px-[5rem] md:px-[4rem] sm:px[2rem] xs:px=[3rem]">

        <dt className="text-sm font-medium leading-6 text-gray-900">Role</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetail.Role}</dd>
      </div>
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 lg:px-[5rem] md:px-[4rem] sm:px[2rem] xs:px=[3rem]">

        <dt className="text-sm font-medium leading-6 text-gray-900">Team code</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetail.Team_Code}</dd>
      </div>
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 lg:px-[5rem] md:px-[4rem] sm:px[2rem] xs:px=[3rem]">

        <dt className="text-sm font-medium leading-6 text-gray-900">Username</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetail.Username}</dd>
      </div>
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 lg:px-[5rem] md:px-[4rem] sm:px[2rem] xs:px=[3rem]">

        <dt className="text-sm font-medium leading-6 text-gray-900">Company Id</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetail.company_id}</dd>
      </div>
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 lg:px-[5rem] md:px-[4rem] sm:px[2rem] xs:px=[3rem]">

        <dt className="text-sm font-medium leading-6 text-gray-900">Document Id</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetail.document_id}</dd>
      </div>
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 lg:px-[5rem] md:px-[4rem] sm:px[2rem] xs:px=[3rem]">

        <dt className="text-sm font-medium leading-6 text-gray-900">Phone Code</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetail.phonecode}</dd>
      </div>
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 lg:px-[5rem] md:px-[4rem] sm:px[2rem] xs:px=[3rem]">

        <dt className="text-sm font-medium leading-6 text-gray-900">Id</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetail._id}</dd>
      </div>
  
    </dl>
  
  </div>
</div>



</div>
     :<Loader/>}
    </div>
  );
};

export default UserDetails;
